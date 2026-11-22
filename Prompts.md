# TaskMatrix — AI Prompt Engineering Log

**Project:** TaskMatrix — Agile Project Management Platform  
**Sprint:** Sprint 13 — Capstone Planning and Architecture  
**Designated Track:** Fullstack Developer  
**Repository:** `prodesk-capstone-taskmatrix`  
**Document Purpose:** Record the AI-assisted planning, UI/UX design, database modeling, and system architecture workflow.

---

## 1. Purpose of This Document

This document records the prompts and AI-assisted workflows used during Sprint 13 to plan TaskMatrix before functional application development begins.

AI tools were used to support requirements documentation, editable Figma wireframes, design system preparation, prototype navigation, database relationship modeling, and system architecture visualization.

The generated outputs were reviewed and refined rather than treated as automatically correct.

**Important distinction:** Sprint 13 is the planning and architecture phase. The planned application functionality is not considered implemented merely because its requirements, designs, or diagrams have been created.

---

## 2. Prompt 1 — Product Requirements Document (PRD)

**Tool:** Google AI Studio  
**Objective:** Prepare the project requirements and repository documentation.

### Prompt summary

> Act as a planning assistant for a Fullstack Developer capstone project named TaskMatrix. Inspect the current repository and create a comprehensive README.md that serves as the Product Requirements Document.
>
> Document the project overview, problem statement, target users, designated track, proposed technology stack, user roles, prioritized functional requirements, non-functional requirements, core user flows, database collections, success criteria, delivery roadmap, deployment plan, and project risks.
>
> Separate P0 MVP requirements from P1 enhancements and P2 optional features. Clearly distinguish planned functionality from implemented functionality.
>
> Update Prompts.md to record this planning prompt. Do not generate application source code or claim that functionality has already been implemented.

### Expected result

- `README.md` containing the TaskMatrix PRD.
- `Prompts.md` recording the planning workflow.
- A prioritized and implementation-oriented scope for the capstone.

### Review criteria

- The Fullstack Developer track is explicitly identified.
- Core features are prioritized.
- Scope and non-goals are clear.
- Planned technologies and features are not misrepresented as implemented.

---

## 3. Prompt 2 — Desktop UI/UX Wireframes

**Tool:** Figma AI Agent  
**Objective:** Create editable desktop designs for the primary TaskMatrix screens.

### Prompt summary

> Act as a senior product designer and UX architect. Create genuine, editable Figma Design frames for TaskMatrix, a professional Agile project management SaaS application.
>
> Use a consistent visual system with a light background, blue primary actions, readable typography, reusable components, and clear information hierarchy.
>
> Create three separate desktop frames, each approximately 1440 × 900 pixels:
>
> 1. **Authentication:** Branding, Login and Sign Up modes, email and password fields, primary action, and validation-state placeholders.
> 2. **Workspace Dashboard:** Navigation, task summary cards, project overview cards, upcoming deadlines, and recent activity.
> 3. **Project Board and Task Details:** Search and filters, Kanban columns, priority badges, task assignments, deadlines, and a task-details panel.
>
> Place the frames independently on the Desktop Wireframes page. Use meaningful layer names and maintain visual consistency. Do not generate an HTML presentation, slide deck, or application source code.

### Expected result

Three independently editable desktop application frames in the Figma Design file.

### Review criteria

- Each frame is separate and appropriately named.
- Dashboard content is scannable.
- The Kanban board shows its task statuses clearly.
- Shared interface patterns are visually consistent.

---

## 4. Prompt 3 — Responsive Mobile Wireframes

**Tool:** Figma AI Agent  
**Objective:** Adapt the desktop screens for narrow mobile viewports.

### Prompt summary

> Inspect the existing TaskMatrix desktop designs and create three editable mobile adaptations on the Mobile Wireframes page.
>
> Use frames approximately 390 × 844 pixels and preserve the existing typography, colors, card patterns, and button styles.
>
> Create mobile versions of Authentication, Workspace Dashboard, and Project Board. Use a compact header or mobile navigation instead of squeezing the desktop sidebar into a narrow viewport.
>
> Stack dashboard content appropriately and make the Kanban board usable through horizontal scrolling or another suitable mobile pattern.
>
> Check text readability, spacing, touch targets, clipping, and overflow. Do not recreate completed desktop frames or introduce unrelated features.

### Expected result

Three mobile wireframe frames that reflect the desktop design system.

### Review criteria

- Important content remains legible.
- Primary actions are visible.
- Mobile navigation is appropriate to the viewport.
- Kanban tasks and task details remain accessible.

---

## 5. Prompt 4 — Mobile Task Details Refinement

**Tool:** Figma AI Agent  
**Objective:** Improve task details at mobile size.

### Prompt summary

> Inspect the existing TaskMatrix mobile wireframes. Keep Authentication Mobile and Workspace Dashboard Mobile unchanged.
>
> Refine the Project Board Mobile frame so the Kanban board remains the main focus and is usable on a narrow screen.
>
> Create a separate editable frame named `04 — Task Details — Mobile (Open)`, approximately 390 × 844 pixels.
>
> Include a back action, task title, status, priority, assignee, due date, description, and a compact activity section. Reuse the current design system.
>
> Preserve the existing desktop designs and avoid adding unrelated functionality.

### Expected result

A mobile task-board layout with a dedicated task-details view.

### Review criteria

- The mobile board is not overcrowded.
- Task details are available in a clear mobile presentation.
- Returning to the board is an obvious action.
- Existing mobile screens are not unnecessarily changed.

---

## 6. Prompt 5 — Reusable Design System

**Tool:** Figma AI Agent  
**Objective:** Document the UI foundations and reusable component patterns.

### Prompt summary

> Inspect the existing TaskMatrix desktop and mobile wireframes. Create a well-organized Design System page that matches the existing application.
>
> Document color styles, typography, spacing, and sizing conventions. Create reusable component patterns for primary, secondary, destructive, and disabled buttons; inputs; form validation states; checkboxes; navigation items; status and priority badges; avatars; project cards; task cards; Kanban headers; progress bars; dashboard statistic cards; and activity rows.
>
> Where supported, create actual Figma components, component variants, and styles rather than drawing examples only.
>
> Keep component names clear, use Auto Layout where practical, and do not introduce an unrelated visual theme or generate application code.

### Expected result

A Design System page containing foundations, controls, and task-management patterns.

### Review criteria

- Components match the wireframes.
- Color and typography choices are consistent.
- Component names are understandable.
- Any claimed reusable components or styles have actually been created.

---

## 7. Prompt 6 — Prototype Navigation

**Tool:** Figma AI Agent, with manual Figma refinement  
**Objective:** Demonstrate the primary user journey through clickable prototype connections.

### Prompt summary

> Inspect the existing TaskMatrix frames and connect the actual design controls using Figma prototype interactions.
>
> Configure the Login button to navigate to Workspace Dashboard. Configure the Website Redesign project's Open Project action to navigate to Project Board and Task Details. Where relevant frames exist, connect task cards to task details and provide a return action.
>
> Use appropriate click triggers, navigation destinations, and simple transitions. Do not recreate completed screens or imply that authentication, saving, or backend operations work.
>
> Report which connections were actually created and identify any that require manual completion.

### Manual refinement

The generated connections were reviewed in Figma's Prototype panel. Connections were refined by selecting the appropriate child layers rather than relying on a parent group containing several controls.

The intended desktop path is:

`Authentication → Workspace Dashboard → Project Board and Task Details`

### Review criteria

- Connections originate from the intended controls.
- Trigger and destination settings are correct.
- The primary navigation path can be tested in Present mode.
- Design interactions are not misrepresented as implemented application functionality.

---

## 8. Prompt 7 — MongoDB Entity Relationship Diagram

**Tool:** dbdiagram.io  
**Objective:** Model the planned database collections and their logical relationships.

### Modeling instructions

> Create a logical MongoDB ERD for TaskMatrix with the following collections:
>
> - `Users`
> - `Projects`
> - `ProjectMemberships`
> - `Tasks`
> - `ActivityLogs`
>
> Represent project ownership, membership, task assignment, task creation, and activity attribution. Use MongoDB ObjectId references to describe the expected relationships.
>
> Include relevant attributes, identifiers, and appropriate constraints in the logical model. Represent many-to-many project membership through ProjectMemberships.
>
> Treat the diagram as a preliminary architecture artifact, not as implemented Mongoose schemas. Do not imply that MongoDB automatically enforces SQL foreign-key constraints.

### Expected result

- Editable database diagram.
- Exported ERD image: `docs/taskmatrix-erd.png`.

### Review criteria

- All five collections are represented.
- Relationship lines connect the intended entities.
- The model supports the TaskMatrix P0 requirements.
- The diagram is readable and saved in the repository.

---

## 9. Prompt 8 — System Architecture Diagram

**Tool:** Draw.io / diagrams.net using Mermaid  
**Objective:** Visualize the proposed fullstack architecture.

### Prompt summary

> Create a system architecture diagram for TaskMatrix showing the planned React + Vite frontend, Express backend, authentication and authorization, project and task services, Mongoose data access, MongoDB Atlas, and Socket.IO communication.
>
> Group the architecture into frontend, backend, and database layers. Show HTTPS REST requests separately from real-time Socket.IO events.
>
> Include the planned deployment arrangement: Vercel for the frontend, Render for the backend, and MongoDB Atlas for the database.
>
> Show scheduled deadline checking only as a planned feature. Represent the architecture clearly and preserve editability where supported. Do not claim that planned services or application functionality have been implemented or deployed.

### Expected result

- Editable architecture source: `docs/TaskMatrix-System-Architecture.drawio`.
- Exported image: `docs/system-architecture.png`.

### Review criteria

- Frontend, backend, and database responsibilities are separated.
- API and real-time communication paths are clear.
- Both diagram files are readable and saved.
- The architecture matches the proposed technology stack.

---

## 10. Prompt 9 — Final Documentation Audit

**Tool:** Google AI Studio  
**Objective:** Check documentation consistency and prepare the repository for review.

### Prompt summary

> Inspect the actual TaskMatrix repository, including README.md, Prompts.md, docs/, the ERD image, the system architecture image, and editable diagram sources.
>
> Finalize README.md as the PRD. Preserve the requirements, priorities, user roles, database design, design deliverables, roadmap, and risks.
>
> Add the actual Figma Design URL and embed both diagram images using relative paths that match real files in the repository. Never fabricate links or create Markdown references to files that do not exist.
>
> Preserve the existing prompt history in Prompts.md and add an accurate final-audit entry. Distinguish planned functionality from implemented functionality and report any manual tasks still outstanding.
>
> Do not generate functional application code, install dependencies, or claim that the application has been deployed.

### Expected result

- A consistent and reviewable PRD.
- Working relative image links.
- The actual Figma share link, once provided.
- A documented prompt-engineering workflow.
- A clear list of remaining manual tasks.

### Review criteria

- Image paths match actual filenames.
- The Figma link opens the correct design file.
- PRD and diagrams describe the same planned architecture.
- No unimplemented feature is presented as complete.

---

## 11. Prompt Engineering Strategy

The Sprint 13 workflow followed these principles:

### Incremental prompting

Large tasks were divided into separate steps for desktop design, mobile adaptation, component foundations, prototype connections, database modeling, and system architecture. This made each deliverable easier to inspect and correct.

### Explicit constraints

Prompts specified what should be created, what should remain unchanged, and which formats were required. Examples included editable Figma frames, independent screens, readable mobile layouts, named collections, and separate architecture layers.

### Reuse of existing artifacts

Follow-up prompts were directed to inspect and improve existing work rather than repeatedly regenerating completed files or screens.

### Verification of actual output

The results were reviewed visually in Figma, in the diagram tools, and in the repository. Screenshots were used to identify prototype connection issues and refine the interactions.

### Truthful documentation

The PRD and architecture diagrams describe planned functionality. Completion claims should be based on files and interactions that actually exist and have been checked.

---

## 12. Final Sprint 13 Deliverables

The planned final repository structure is:

```text
prodesk-capstone-taskmatrix/
├── README.md
├── Prompts.md
└── docs/
    ├── taskmatrix-erd.png
    ├── system-architecture.png
    └── TaskMatrix-System-Architecture.drawio
```

The TaskMatrix Figma Design file is maintained separately and linked from the README.

### Final verification checklist

- [ ] README.md contains the complete PRD.
- [ ] Prompts.md records the AI-assisted planning workflow.
- [ ] The Figma share URL is real and accessible to reviewers.
- [ ] Desktop and mobile wireframes are available in the Figma file.
- [ ] The Design System page matches the wireframes.
- [ ] The primary prototype interactions have been checked.
- [ ] The ERD image exists and is embedded in README.md.
- [ ] The architecture image exists and is embedded in README.md.
- [ ] Editable diagram sources are retained where available.
- [ ] All deliverables are committed to the public GitHub repository.
- [ ] No credentials or private environment files are committed.

---

## 13. Current Status

Sprint 13 focuses on planning, requirements, UI/UX, and architecture. The functional TaskMatrix application is planned for the subsequent sprints.

This document records the intended planning workflow; the final checklist must be updated when each artifact, link, and repository change has actually been verified.

**Next phase:** Sprint 14 — Build the Minimum Viable Product (MVP) according to the approved PRD and architecture.

## Sprint 14 — Track B — Phase 1A: Backend Foundation and Secure User Schema

### Prompt
# Sprint 14 — Track B — Phase 1A
# Backend Foundation and Secure User Schema
(Phase 1A backend foundation, MongoDB connection module, and Mongoose User model with bcryptjs password hashing and comparison method, without JWT/auth routes, dashboard/CRUD APIs, or frontend.)

### Files Created / Modified
- Created `backend/package.json` with `mongoose`, `bcryptjs`, and `dotenv`.
- Created `backend/.env.example` with `MONGODB_URI=your_mongodb_connection_string`.
- Created `backend/.gitignore` to ignore `.env` and `node_modules`.
- Created `backend/src/config/db.js` to connect to MongoDB via Mongoose using `process.env.MONGODB_URI` with missing-variable guard and safe error handling.
- Created `backend/src/models/User.js` defining `name`, `email`, `password` (`select: false`), `timestamps: true`, `bcryptjs` pre-save password hashing (salt rounds: 10, skipped when unmodified), and `comparePassword`.
- Created `backend/src/scripts/verifyUserModel.js` for schema, hashing, comparison, and missing-URI checks.
- Modified `PROMPTS.md` to record Phase 1A details while keeping Sprint 13 history intact.

## Sprint 14 — Track B — Phase 1B: User Model and Password Security Verification

### Prompt
# Sprint 14 — Track B — Phase 1B
# User Model and Password Security Verification
(Audit and verify the existing User schema, bcryptjs pre-save hashing, comparePassword behavior including empty/invalid inputs, default password field exclusion, and environment/secret hygiene without implementing auth routes, JWT, or frontend/dashboard/CRUD features.)

### Tests / Checks Performed
- Audited `backend/src/models/User.js`, `backend/src/config/db.js`, `backend/.env.example`, and `backend/.gitignore`.
- Updated `backend/src/scripts/verifyUserModel.js` to include checks for `password` `select: false` schema configuration and `comparePassword` behavior on empty/null/undefined inputs alongside valid, invalid, and unchanged-password checks.
- Live MongoDB Atlas persistence tests were not executed in this environment due to lack of local shell execution and configured database credentials.

## Sprint 14 — Track B — Phase 2A: Registration, Login APIs and JWT Generation

### Prompt
# Sprint 14 — Track B — Phase 2A
# Registration, Login APIs and JWT Generation
(Implement POST /api/auth/register and POST /api/auth/login using Express, Mongoose, bcryptjs, and jsonwebtoken, reusing the existing User model and pre-save password hashing, returning JWT and safe user info without exposing password hashes or secrets, and without JWT middleware, frontend, or dashboard/CRUD features.)

### Factual Summary of Implementation and Testing
- Added `jsonwebtoken` to `backend/package.json` and added `JWT_SECRET` and `JWT_EXPIRES_IN` placeholders to `backend/.env.example`.
- Created `backend/src/controllers/authController.js` implementing `register` (`201` on new user, `409` on duplicate email, `400` on invalid/missing input) and `login` (`200` on valid credentials, `401` with generic message on invalid credentials, `400` on missing fields), explicitly selecting `+password` for `comparePassword` and signing JWTs via `jsonwebtoken`.
- Created `backend/src/routes/authRoutes.js` and `backend/src/server.js` with `dotenv` loading, `express.json()`, and `/api/auth` mounting.
- Live HTTP and MongoDB endpoint tests were not executed in this environment because shell and database execution are unavailable here.

## Sprint 14 — Track B — Phase 2B: React Authentication Forms and JWT Client Integration

### Prompt
# Sprint 14 — Track B — Phase 2B
# React Authentication Forms and JWT Client Integration
(Connect a React + Vite frontend to POST /api/auth/register and POST /api/auth/login using VITE_API_URL, persist JWT under "token" in localStorage with safe user session state, support /register, /login, and /dashboard routes with logout navigation, enable CORS for http://localhost:5173 on the Express backend, and stay strictly within Phase 2B scope without JWT middleware, full dashboard, or CRUD features.)

### Factual Description of Frontend and Backend Changes
- Created `frontend/` React + Vite project with `.env.example`, `.gitignore`, `index.html`, `vite.config.js`, `package.json`, `src/services/api.js`, `src/context/AuthContext.jsx`, `src/pages/RegisterPage.jsx`, `src/pages/LoginPage.jsx`, `src/pages/DashboardPage.jsx`, `src/App.jsx`, `src/main.jsx`, and `src/index.css`.
- Added `cors` to `backend/package.json` and configured `cors` in `backend/src/server.js` to allow `http://localhost:5173` (or `process.env.CLIENT_ORIGIN`).
- Browser, network, and `localStorage` verification steps were not executed in this environment due to lack of local shell/browser access here.