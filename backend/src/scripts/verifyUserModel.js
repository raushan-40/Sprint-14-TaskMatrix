const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const path = require('node:path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = require('../config/db');
const User = require('../models/User');

async function testMissingMongoUri() {
  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;

  let failedAsExpected = false;
  try {
    await connectDB();
  } catch (err) {
    failedAsExpected = err.message.includes('MONGODB_URI');
  } finally {
    if (originalUri !== undefined) {
      process.env.MONGODB_URI = originalUri;
    }
  }

  assert.equal(failedAsExpected, true, 'Expected connectDB to fail when MONGODB_URI is missing');
  console.log('[PASS] Missing MONGODB_URI is handled safely');
}

function getDedicatedTestUri() {
  const testUri = process.env.TEST_MONGODB_URI;
  if (!testUri || typeof testUri !== 'string' || testUri.trim() === '') {
    return null;
  }

  const trimmed = testUri.trim();
  if (trimmed.includes('<db_password>') || trimmed.includes('your_db_password')) {
    return null;
  }

  if (/production|prod/i.test(trimmed) && process.env.ALLOW_TEST_DB_OVERRIDE !== 'true') {
    throw new Error('Refusing to run destructive test against a URI that appears to be production');
  }

  return trimmed;
}

async function runPersistenceVerification(testUri) {
  const previousMongoUri = process.env.MONGODB_URI;
  process.env.MONGODB_URI = testUri;

  const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const testEmail = `verify.user.${uniqueSuffix}@example.test`;
  const candidatePlaintext = `VerifyPass#${crypto.randomBytes(6).toString('hex')}`;
  let createdUserId = null;

  try {
    await connectDB();

    const created = await User.create({
      name: 'Initial Test User',
      email: testEmail,
      password: candidatePlaintext,
    });
    createdUserId = created._id;

    const ordinaryUser = await User.findById(createdUserId);
    assert.ok(ordinaryUser, 'Expected saved user to be retrievable');
    assert.equal(ordinaryUser.password, undefined, 'Ordinary query must not expose password');

    const userWithHash = await User.findById(createdUserId).select('+password');
    assert.ok(userWithHash && userWithHash.password, 'Expected password hash when explicitly selected');
    assert.notEqual(userWithHash.password, candidatePlaintext, 'Stored password must not equal plaintext');
    assert.match(
      userWithHash.password,
      /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
      'Stored password must match standard bcrypt hash format'
    );

    assert.equal(await userWithHash.comparePassword(candidatePlaintext), true, 'Correct password must return true');
    assert.equal(await userWithHash.comparePassword('DefinitelyWrongPass!123'), false, 'Wrong password must return false');
    assert.equal(await userWithHash.comparePassword(''), false, 'Empty input must return false');

    const originalStoredHash = userWithHash.password;

    ordinaryUser.name = 'Updated Test User';
    await ordinaryUser.save();

    const afterNameUpdate = await User.findById(createdUserId).select('+password');
    assert.equal(afterNameUpdate.name, 'Updated Test User');
    assert.equal(
      afterNameUpdate.password,
      originalStoredHash,
      'Password hash must remain unchanged after updating name only'
    );

    console.log('[PASS] Persistence, hashing, comparison, hidden password field, and re-hash preservation verified');
  } finally {
    if (createdUserId && mongoose.connection.readyState === 1) {
      await User.deleteOne({ _id: createdUserId });
    }
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (previousMongoUri !== undefined) {
      process.env.MONGODB_URI = previousMongoUri;
    } else {
      delete process.env.MONGODB_URI;
    }
  }
}

async function run() {
  await testMissingMongoUri();

  const testUri = getDedicatedTestUri();
  if (!testUri) {
    console.log('[NOT RUN] Persistence tests skipped: set a valid TEST_MONGODB_URI in backend/.env to run them');
    return;
  }

  await runPersistenceVerification(testUri);
}

run().catch((err) => {
  console.error('[FAIL]', err.message);
  process.exit(1);
});