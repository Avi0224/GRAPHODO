GRAPHODO PRDPart 1 — Product Foundation1. Executive SummaryProduct Name
GRAPHODOProduct Type
Web-based Productivity & Personal Management PlatformVersion
1.0 (MVP)Product Vision
GRAPHODO is a next-generation productivity platform designed to transform task management into a visually engaging and motivating experience. Unlike traditional to-do applications that rely solely on lists and checkboxes, GRAPHODO introduces real-time animated analytics that allow users to see their productivity grow as they complete tasks and habits.The product aims to combine the best aspects of task management, habit tracking, calendar planning, and productivity analytics into one cohesive application.The primary goal is not just to help users remember tasks, but to encourage long-term consistency through meaningful visual feedback.Vision Statement
Help people build consistent productivity habits by making progress visible, measurable, and rewarding.Mission Statement
Create an elegant productivity platform that balances simplicity with powerful analytics while remaining enjoyable to use every day.2. Problem StatementMost productivity applications fall into one of two categories:Traditional Todo Apps
Examples: Google Tasks, Microsoft To Do
Problems:
Minimal analytics
Little motivation
Static interface
Progress feels unrewarding
Complex Productivity Systems
Examples: Notion, ClickUp, Jira
Problems:
Steep learning curve
Too many features
Slow workflows
Overwhelming UI
GRAPHODO bridges these two extremes by providing:
Simple task management
Habit building
Calendar planning
Beautiful productivity visualization
Fast interactions
Clean interface
3. Product GoalsBusiness Goals
Develop a portfolio-quality SaaS application that demonstrates:
Modern frontend architecture
Scalable backend architecture
Secure authentication
Production-grade API design
Responsive UI
Advanced state management
Interactive data visualization
User Goals
Users should be able to:
Organize tasks
Build habits
Schedule work
Understand productivity trends
Stay motivated
Improve consistency
Technical Goals
Build an application that demonstrates:
React, Next.js
Node.js, Express
MongoDB
Authentication
Charts and animations
API integration
Responsive Design
Modern UI practices
4. Success MetricsProduct success will be measured through:User Metrics
Daily Active Users
Weekly Active Users
Monthly Active Users
Productivity Metrics
Tasks Created
Tasks Completed
Habits Completed
Average Productivity Score
Average Daily Completion %
Longest Streak
Engagement Metrics
Average Session Duration
Calendar Usage
Analytics Page Visits
Search Usage
Task Completion Time
5. Product PhilosophyGRAPHODO should always feel:
Fast: Every interaction should be instant.
Simple: No unnecessary complexity.
Visual: Progress should always be visible.
Rewarding: Every completed task should feel satisfying.
Modern: Minimal interface, soft animations, large whitespace, rounded corners, beautiful typography.
6. Product PrinciplesEvery feature added must satisfy at least one of the following principles:
Reduce friction.
Increase motivation.
Improve visibility of progress.
Encourage consistency.
Require minimal clicks.
7. Target AudiencePrimary Audience
College Students
Needs: Assignment tracking, exam preparation, habit building, daily planning
Secondary Audience
Developers
Needs: Coding schedule, DSA roadmap, learning tracker, sprint planning
Professionals
Needs: Meetings, time blocking, productivity analytics, daily planning
Freelancers
Needs: Client work, deadlines, time scheduling, goal tracking
8. User PersonasPersona 1: Student
Age: 18–24
Goals: Study consistently, prepare for placements, maintain habits
Pain Points: Forget deadlines, no consistency, no motivation
Persona 2: Software Engineer
Goals: Track projects, daily coding, learning roadmap
Needs: Analytics, calendar, quick task creation
Persona 3: Productivity Enthusiast
Uses: Habit trackers, calendars, Pomodoro
Needs: Beautiful graphs, statistics, streaks
9. Unique Selling PropositionGRAPHODO is not simply a task manager. It combines:
Task Management
Habit Tracking
Calendar Planning
Interactive Graphs
Productivity Analytics
into one seamless experience. Instead of checking off tasks and forgetting about them, users see immediate visual growth through animated charts that reinforce positive behavior.10. Competitor Analysis







































ProductStrengthsWeaknessesTodoistExcellent tasksWeak analyticsTickTickGreat habitsUI becoming clutteredNotionFlexibleComplex for daily planningGoogle TasksVery simpleExtremely limitedHabiticaGamificationOutdated interfaceSunsamaDaily planningPaidGRAPHODO Advantages
Animated productivity graphs
Modern UI
Built-in analytics
Calendar integration
Habit tracking
Clean UX
Fast interactions
11. Product ScopeIncluded in MVP
Authentication
Dashboard
Tasks
Habits
Calendar
Analytics
Profile
Settings
Responsive Design
Dark Mode
Phase 2
Notifications
Pomodoro
Recurring reminders
Weekly reports
Heatmap improvements
Phase 3
AI Planner
Voice Commands
Collaboration
Offline Support
PWA
12. Information ArchitectureGRAPHODO├── Landing│├── Authentication│   ├── Login│   ├── Register│   ├── Forgot Password│   └── Reset Password│└── Dashboard    │    ├── Dashboard    ├── Tasks    ├── Habits    ├── Calendar    ├── Analytics    ├── Profile    └── Settings13. Navigation StructureSidebar
Dashboard
Tasks
Habits
Calendar
Analytics
Profile
Settings
Top Navbar
Global Search
Notifications
Theme Toggle
User Avatar
14. Technology StackFrontend
React
Next.js
TypeScript
TailwindCSS
Framer Motion
TanStack Query
React Hook Form
Zod
Recharts
Backend
Node.js
Express.js
TypeScript
Database
MongoDB Atlas
Authentication
Google OAuth
Email & Password
JWT Access Token
Refresh Token
Deployment
Frontend: Vercel
Backend: Railway / Render
Database: MongoDB Atlas
15. High-Level System ArchitectureUser → Next.js Frontend → Express REST API → Authentication Layer → Business Logic → MongoDB Database → Analytics Engine → Recharts Dashboard16. Design PrinciplesThe UI should follow these principles:
Minimalism over decoration
Content first
Motion with purpose
Consistency in spacing
Accessibility first
Responsive by default
Fast perceived performance
Clear visual hierarchy
Immediate feedback
Delight through subtle animation
17. Design InspirationsThe overall experience should draw inspiration from:
Linear (clean navigation)
Vercel Dashboard (minimal analytics)
Notion (content spacing)
TickTick (task management)
Arc Browser (modern interactions)
Apple Human Interface Guidelines (motion and polish)
18. Risks & AssumptionsRisks
Scope creep due to feature-rich roadmap
Complex graph synchronization across tasks and habits
Calendar drag-and-drop can increase implementation complexity
Assumptions
Users primarily access the app on desktop, with full mobile support
Authentication is required for all productivity features
Analytics are generated from user-owned data only
Performance should remain smooth with thousands of tasks
19. Definition of MVPThe MVP is considered complete when a user can:
Create an account
Log in securely
Create, edit, delete, and complete tasks
Create and track habits
Schedule tasks on the calendar
View real-time animated productivity analytics
Use the application seamlessly on desktop and mobile
# GRAPHODO PRD
# Part 2 — Product Feature Specifications

---

# 20. Feature Overview

GRAPHODO is divided into the following functional modules:

1. Authentication
2. Dashboard
3. Task Management
4. Habit Management
5. Calendar
6. Analytics
7. Search
8. Profile
9. Settings
10. Notifications (Future)

Each module below defines:

- Purpose
- User Stories
- Functional Requirements
- Business Rules
- UI Components
- Edge Cases
- Acceptance Criteria
- Future Enhancements

---

# 21. Authentication Module

## Purpose

Provide secure user authentication while keeping onboarding friction low.

---

## Supported Authentication

### Email Authentication

- Register
- Login
- Forgot Password
- Reset Password
- Logout

---

### Google Authentication

- Sign Up using Google
- Login using Google

---

## User Stories

As a new user,

I want to create an account quickly.

As a returning user,

I want to securely log in.

As a user,

I want to recover my password.

---

## Functional Requirements

### Registration

Fields

- Name
- Email
- Password
- Confirm Password

Validation

- Email unique
- Password ≥ 8 characters
- Strong password

---

### Login

Fields

- Email
- Password

Remember previous session.

---

### Forgot Password

User enters email.

Receive secure reset link.

---

### Logout

Destroy session.

Invalidate refresh token.

---

## Business Rules

- Email must be unique.
- Passwords are hashed.
- JWT Access Token
- Refresh Token Cookie
- Google account auto-verifies email.

---

## UI Components

- Login Form
- Register Form
- Google Button
- Forgot Password Form
- Reset Password Form

---

## Acceptance Criteria

✓ User can register.

✓ User can login.

✓ Invalid credentials display error.

✓ Google authentication works.

✓ Session persists.

---

# 22. Dashboard Module

## Purpose

The Dashboard serves as the productivity hub.

It should immediately answer

"What should I do today?"

---

## Dashboard Layout

Top Navbar

↓

Progress Section

↓

Today's Tasks

↓

Today's Habits

↓

Calendar Preview

↓

Recent Activity

↓

Weekly Summary

---

## Widgets

### Productivity Graph

Animated graph.

Updates in real time.

---

### Today's Tasks

Shows

- Pending
- Completed
- Overdue

---

### Today's Habits

Shows

- Pending
- Completed

---

### Productivity Score

Displays

87 / 100

---

### Current Streak

🔥 15 Days

---

### Calendar Preview

Today's schedule.

---

### Recent Activity

Task completed

Habit completed

Task created

---

## User Stories

As a user,

I want to instantly know my daily workload.

As a user,

I want to track progress visually.

---

## Business Rules

Dashboard refreshes automatically.

Graph animations should never stutter.

Widgets remain responsive.

---

## Acceptance Criteria

Dashboard loads within 2 seconds.

Graph updates instantly.

Today's tasks update automatically.

---

# 23. Task Management Module

## Purpose

Complete task management system.

---

## Task Object

Task contains

- Title
- Description
- Priority
- Category
- Tags
- Due Date
- Due Time
- Notes
- Subtasks
- Repeat
- Reminder
- Status
- Created At
- Updated At

---

## Priority Levels

- Low
- Medium
- High
- Urgent

---

## Categories

Default

- Study
- Work
- Personal
- Health
- Coding

Users may create custom categories.

---

## Tags

Unlimited tags.

Example

#React

#Placement

#Gym

---

## Repeat Options

- None
- Daily
- Weekly
- Monthly
- Every X Days

---

## Subtasks

Unlimited.

Parent progress updates automatically.

---

## CRUD Operations

User can

Create

Edit

Delete

Duplicate

Archive

Restore

Complete

Undo

---

## Filters

- Due Today
- Upcoming
- Completed
- Pending
- High Priority
- Category
- Tag
- Date Range

---

## Sorting

Sort by

Priority

Due Date

Created Date

Alphabetical

Completion

---

## Search

Real-time.

Debounced.

---

## User Stories

As a student,

I want recurring study tasks.

As a developer,

I want coding tasks grouped.

As a professional,

I want priorities.

---

## Business Rules

Completed task

↓

Updates dashboard

↓

Updates analytics

↓

Updates graphs

↓

Updates productivity score

---

## Edge Cases

Deleting completed task.

Changing recurring schedule.

Past due dates.

Empty title.

Duplicate task names.

---

## Acceptance Criteria

Task creation < 2 clicks.

Search <300ms.

Graph updates immediately.

---

# 24. Habit Module

## Purpose

Develop consistency.

---

## Habit Object

Title

Description

Frequency

Current Streak

Longest Streak

Completion %

Reminder

Category

Color

---

## Frequency

Daily

Weekdays

Weekends

Weekly

Monthly

Custom

---

## Habit Statistics

Current Streak

Longest Streak

Completion %

Weekly %

Monthly %

---

## User Stories

As a user,

I want to build habits.

As a user,

I want streaks.

---

## Functional Requirements

Create Habit

Edit Habit

Delete Habit

Complete Habit

Skip Habit

Pause Habit

Resume Habit

---

## Business Rules

Habit completion

↓

Updates streak

↓

Updates dashboard

↓

Updates graph

↓

Updates productivity score

---

## Acceptance Criteria

One click completion.

Statistics update instantly.

---

# 25. Calendar Module

## Purpose

Time planning.

---

## Views

Day

Week

Month

Agenda

---

## Features

Time Blocking

Drag & Drop

Color Coding

Quick Add

Recurring Events

Reminder

---

## Event Object

Task

Time

Duration

Reminder

Repeat

Color

Status

---

## User Stories

I want to schedule my day.

I want drag-and-drop.

---

## Business Rules

Changing calendar time

↓

Updates task automatically.

Deleting event

↓

Deletes scheduled instance.

---

## Acceptance Criteria

Drag latency <100ms.

Mobile friendly.

---

# 26. Analytics Module

## Purpose

Visualize productivity.

This is GRAPHODO's flagship feature.

---

## Graphs

### Animated Progress Graph

Main dashboard graph.

---

### Pie Chart

Completed

Remaining

---

### Area Graph

Daily productivity.

---

### Bar Graph

Weekly completion.

---

### Heatmap

GitHub style.

---

### Habit Graph

Streak visualization.

---

### Productivity Timeline

Daily history.

---

## Productivity Score

Calculated using

Completed Tasks

Completed Habits

Missed Tasks

Current Streak

Consistency

---

## Metrics

Tasks Created

Tasks Completed

Completion %

Longest Streak

Current Streak

Average Daily Score

Weekly Score

Monthly Score

---

## User Stories

I want to know if I improved.

---

## Business Rules

Graphs animate.

Never instantly update.

---

## Acceptance Criteria

Animations remain above 60 FPS.

All charts responsive.

---

# 27. Global Search Module

## Purpose

Search entire application.

---

## Search Sources

Tasks

Habits

Categories

Tags

Calendar Events

---

## Keyboard Shortcut

Ctrl + K

---

## Features

Recent Searches

Quick Navigation

Instant Results

Debounced Input

---

## Acceptance Criteria

Results <300ms.

Keyboard accessible.

---

# 28. Profile Module

Displays

Avatar

Name

Email

Join Date

Current Streak

Longest Streak

Tasks Completed

Habits Completed

Productivity Score

Achievements (Future)

---

User can

Edit Name

Upload Avatar

Change Password

Delete Account

Export Data

---

# 29. Settings Module

Contains

Appearance

Notifications

Privacy

Security

Connected Accounts

Language (Future)

Accessibility

---

## Theme

Light

Dark

System

---

## Notification Preferences

Browser

Email

Habit Reminder

Task Reminder

Weekly Summary

---

## Security

Google Connected

Password

Active Sessions

Logout All Devices

---

# 30. Notifications Module (Phase 2)

Support

Browser Notifications

Email Notifications

Daily Digest

Upcoming Tasks

Habit Reminder

Achievement Unlocks

Weekly Summary

---

# 31. Gamification (Phase 2)

Achievements

Levels

Badges

Daily Goals

Weekly Goals

Monthly Challenges

---

Examples

🔥 30 Day Streak

🏆 100 Tasks Completed

⭐ Perfect Week
# GRAPHODO PRD
# Part 3 — UI / UX Specifications

---

# 32. Design Philosophy

GRAPHODO should feel like a premium productivity platform rather than a traditional to-do application.

The interface should be:

- Minimal
- Fast
- Spacious
- Elegant
- Interactive
- Calm
- Modern

Every interaction should reinforce the feeling of progress.

---

# Design Keywords

- Clean
- Focused
- Productive
- Smooth
- Intelligent
- Lightweight

---

# Inspirations

Primary

- Linear
- Vercel Dashboard
- Arc Browser

Secondary

- TickTick
- Notion
- Apple Human Interface Guidelines

Avoid

- Cluttered dashboards
- Skeuomorphic elements
- Dense information layouts
- Excessive gradients

---

# 33. Visual Identity

## Personality

GRAPHODO should feel

Professional

Calm

Premium

Confident

Rewarding

---

## Brand Values

Growth

Consistency

Discipline

Focus

Progress

---

# 34. Color System

## Primary

Brand Green

Used for

- Completed Tasks
- Positive Trends
- Progress
- Success

---

## Secondary

Blue

Used for

- Analytics
- Graphs
- Links
- Active Navigation

---

## Warning

Orange

Used for

- Medium Priority
- Upcoming Deadlines

---

## Error

Red

Used for

- Urgent Tasks
- Failed Actions
- Errors

---

## Neutral

Gray Scale

50

100

200

300

400

500

600

700

800

900

---

# Dark Theme

Dark Gray backgrounds

Soft white text

Muted borders

Avoid pure black.

---

# Light Theme

Soft whites

Light grays

Subtle shadows

Minimal borders

---

# 35. Typography

Font Family

Inter

Fallback

System UI

---

## Heading Scale

H1

36px

H2

30px

H3

24px

H4

20px

H5

18px

Body

16px

Caption

14px

Small

12px

---

## Font Weights

Regular

Medium

Semibold

Bold

---

# 36. Spacing System

8-point grid

Spacing values

4

8

12

16

20

24

32

40

48

64

80

96

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Cards

20px

Buttons

12px

Modals

20px

---

# Shadows

Subtle

Avoid heavy shadows.

Elevation should come primarily from spacing.

---

# 37. Iconography

Library

Lucide React

Style

Outlined

Rounded

Minimal

Icons should always accompany sidebar navigation.

---

# 38. Layout System

Desktop

Sidebar

Top Navigation

Main Content

---

Sidebar Width

280px

Collapsed

80px

---

Top Navbar Height

72px

---

Content Width

Centered

Maximum

1600px

---

Page Padding

32px

---

# 39. Navigation

## Sidebar

Dashboard

Tasks

Habits

Calendar

Analytics

Profile

Settings

---

Behavior

Current page highlighted

Smooth transitions

Collapsible

---

Top Navigation

Global Search

Notifications

Theme Toggle

Profile Avatar

---

# 40. Dashboard Layout

Top Navigation

↓

Hero Section

↓

Progress Graph

↓

Statistics Cards

↓

Today's Tasks

↓

Today's Habits

↓

Calendar Preview

↓

Recent Activity

↓

Weekly Summary

---

Dashboard Grid

Desktop

12-column layout

Tablet

8-column layout

Mobile

Single-column layout

---

# 41. Tasks Page Layout

Top

Search Bar

↓

Filters

↓

Sort Options

↓

Task List

↓

Floating Add Button

---

Task Card

Contains

Checkbox

Priority Indicator

Title

Category

Tags

Due Date

Subtask Progress

Actions

---

Hover State

Card lifts slightly

Shadow increases

Action buttons appear

---

Completed State

Checkbox animated

Title struck through

Opacity reduced

Progress graph updates

---

# 42. Habit Page Layout

Header

↓

Current Streak

↓

Today's Habits

↓

Habit Statistics

↓

Monthly Progress

---

Habit Card

Contains

Checkbox

Title

Current Streak

Longest Streak

Completion %

Frequency

Actions

---

Completion Animation

Checkbox fills

Fire animation

Counter increases

Graph updates

---

# 43. Calendar Layout

Desktop

Month View

Week View

Day View

Agenda View

---

Sidebar

Mini Calendar

Upcoming Tasks

---

Calendar Event

Title

Color

Time

Priority

---

Drag Interaction

Smooth

Snap to grid

Auto-save

---

# 44. Analytics Layout

Top

Time Range Selector

↓

Productivity Score

↓

Area Graph

↓

Bar Graph

↓

Pie Chart

↓

Heatmap

↓

Statistics Cards

---

Charts should resize responsively.

---

# 45. Profile Layout

Avatar

↓

Statistics

↓

Achievements

↓

Settings Shortcut

↓

Export Data

---

# 46. Settings Layout

Sections

Appearance

Notifications

Privacy

Security

Connected Accounts

About

---

Settings should be grouped into cards.

---

# 47. Component Library

Buttons

Primary

Secondary

Ghost

Danger

Icon

Loading

Disabled

---

Inputs

Text

Email

Password

Search

Textarea

Date Picker

Time Picker

Select

Multi-select

Checkbox

Switch

---

Cards

Task Card

Habit Card

Analytics Card

Calendar Card

Statistic Card

---

Dialogs

Confirmation

Delete

Edit

Create

Settings

---

Feedback

Toast

Snackbar

Tooltip

Empty State

Skeleton Loader

Progress Indicator

---

# 48. Motion Design

Library

Framer Motion

---

Animation Principles

Fast

Natural

Purposeful

Consistent

---

Durations

Micro

150ms

Standard

300ms

Complex

500ms

---

Easing

Ease In Out

Spring

---

# 49. Microinteractions

Task Completion

Checkbox fills

↓

Card animates

↓

Counter increases

↓

Graph grows

↓

Toast appears

---

Habit Completion

Checkbox

↓

Flame grows

↓

Streak increments

↓

Statistics update

↓

Graph animates

---

Hover

Cards lift

Buttons scale

Icons rotate slightly

---

Page Transition

Fade

Slide

No abrupt loading

---

# 50. Empty States

Tasks

"No tasks for today."

CTA

Create your first task

---

Habits

"No habits yet."

CTA

Start building a habit

---

Analytics

"Complete tasks to unlock analytics."

---

Calendar

"No scheduled events."

---

# 51. Loading States

Use skeleton loaders.

Avoid spinners whenever possible.

Loading placeholders

Dashboard

Tasks

Calendar

Analytics

Profile

---

# 52. Error States

Network Error

Retry Button

---

Authentication Error

Clear explanation

---

404

Illustration

Home Button

---

500

Retry

Report Error

---

# 53. Notifications

Toast Position

Top Right

---

Duration

3–4 seconds

---

Types

Success

Error

Warning

Info

---

# 54. Responsive Behaviour

Desktop

1440px+

---

Laptop

1024px+

---

Tablet

768px+

---

Mobile

360px+

---

Sidebar

Desktop

Expanded

Tablet

Collapsible

Mobile

Drawer

---

Dashboard

Desktop

Multi-column

Mobile

Single-column

---

Calendar

Desktop

Full Calendar

Mobile

Agenda First

---

Analytics

Charts stack vertically

---

# 55. Accessibility

Keyboard Navigation

Visible Focus States

Screen Reader Labels

ARIA Attributes

Color Contrast WCAG AA

Reduced Motion Support

Logical Tab Order

---

# 56. User Flows

## New User

Landing

↓

Register

↓

Email Verification (optional)

↓

Onboarding

↓

Dashboard

↓

Create First Task

↓

Create First Habit

↓

View Graph Animation

---

## Daily Workflow

Login

↓

Dashboard

↓

Complete Tasks

↓

Graph Updates

↓

Check Analytics

↓

Logout

---

## Calendar Workflow

Open Calendar

↓

Select Time

↓

Create Task

↓

Save

↓

Dashboard Updates

---

## Analytics Workflow

Open Analytics

↓

Choose Time Range

↓

View Trends

↓

Adjust Productivity

---

# 57. Onboarding

Step 1

Welcome

---

Step 2

Choose Theme

---

Step 3

Create First Task

---

Step 4

Create First Habit

---

Step 5

Finish

---

# 58. Design Deliverables

Before development begins, the following design assets should be completed:

- Information Architecture
- User Flows
- Low-Fidelity Wireframes
- Mid-Fidelity Wireframes
- High-Fidelity Mockups
- Responsive Layouts
- Design System
- Component Library
- Prototype
- Interaction Specifications
- Developer Handoff Documentation

---

# 59. UX Success Criteria

A first-time user should be able to:

- Register in under 2 minutes.
- Create a task in under 30 seconds.
- Complete a habit in one click.
- Understand the dashboard without onboarding.
- Locate any major feature within three interactions.
- View productivity trends without needing external documentation.

---

# 60. UI Quality Standards

The final interface should meet the following quality goals:

- Responsive across desktop, tablet, and mobile.
- Consistent spacing using the 8-point grid.
- Smooth animations at 60 FPS where practical.
- Accessible according to WCAG AA guidelines.
- Clear visual hierarchy with minimal cognitive load.
- Consistent components throughout the application.
- Fast perceived performance through skeleton loading and progressive rendering.
# GRAPHODO PRD
# Part 4 — Technical Specifications & System Architecture

---

# 61. Technical Overview

GRAPHODO follows a modern three-tier architecture.

```
Client (Next.js)
        │
        ▼
 REST API (Express.js)
        │
        ▼
 MongoDB Atlas
```

The frontend is responsible for rendering the user interface and interacting with backend APIs.

The backend manages business logic, authentication, authorization, validation, analytics generation, and database communication.

MongoDB stores all application data.

---

# 62. Technology Stack

## Frontend

Framework
- Next.js

Language
- TypeScript

UI
- TailwindCSS

Animations
- Framer Motion

Forms
- React Hook Form

Validation
- Zod

Charts
- Recharts

Icons
- Lucide React

State
- Zustand

Server State
- TanStack Query

---

## Backend

Runtime

Node.js

Framework

Express.js

Language

TypeScript

Authentication

JWT

Google OAuth

Validation

Zod

Password Hashing

bcrypt

Environment

dotenv

Logging

Morgan

CORS

cors

---

## Database

MongoDB Atlas

ODM

Mongoose

---

# 63. Folder Structure

## Frontend

```
src/

app/

components/

features/

hooks/

lib/

services/

store/

types/

utils/

styles/

constants/

middleware/
```

---

### Components

```
components/

Button

Card

Modal

Toast

Input

Calendar

Sidebar

Navbar

Chart

Graph

TaskCard

HabitCard

Skeleton

Loader

EmptyState
```

---

### Features

```
features/

authentication/

dashboard/

tasks/

habits/

calendar/

analytics/

profile/

settings/
```

---

## Backend

```
src/

config/

controllers/

middleware/

models/

routes/

services/

repositories/

validators/

utils/

types/

database/

jobs/
```

---

# 64. Functional Requirements

## Authentication

Users shall

Register

Login

Logout

Reset Password

Login with Google

---

## Dashboard

System shall

Display today's tasks

Display habits

Calculate productivity

Render analytics

---

## Tasks

System shall allow

CRUD

Search

Filter

Sort

Subtasks

Recurring Tasks

Categories

Tags

Priority

Due Dates

---

## Habits

System shall

Track streaks

Track completion

Calculate statistics

Generate trends

---

## Calendar

System shall

Display Month View

Display Week View

Display Day View

Display Agenda

Support drag-and-drop

Time blocking

---

## Analytics

System shall

Generate graphs

Update automatically

Calculate productivity

Generate heatmaps

---

# 65. Non Functional Requirements

Availability

99.9%

---

Initial Load

<2 seconds

---

Graph Updates

<500ms

---

Search

<300ms

---

API Response

Average

<250ms

---

Accessibility

WCAG AA

---

Security

OWASP Best Practices

---

# 66. Authentication Flow

```
User

↓

Login

↓

Credentials Valid?

↓

YES

↓

Generate Access Token

↓

Generate Refresh Token

↓

Return User Session

↓

Dashboard

```

---

### Access Token

Lifetime

15 minutes

---

### Refresh Token

Lifetime

7 Days

Stored

HTTP Only Cookie

---

# 67. Authorization

Every protected endpoint requires JWT.

Public Routes

Landing

Login

Register

Forgot Password

Privacy

About

Contact

Protected Routes

Dashboard

Tasks

Habits

Calendar

Analytics

Profile

Settings

---

# 68. State Management

Global State

User

Theme

Notifications

Sidebar

Selected Date

---

Feature State

Tasks

Habits

Calendar

Analytics

---

Server State

TanStack Query

Caching

Automatic

Refetch

On Focus

---

# 69. API Design Principles

REST Architecture

JSON Responses

Versioned APIs

```
/api/v1/
```

HTTP Methods

GET

POST

PUT

PATCH

DELETE

---

# 70. Error Handling

Every response should follow

```
{
 success

 message

 data

 error

}
```

---

HTTP Status Codes

200

201

204

400

401

403

404

409

422

500

---

# 71. Validation

Frontend

Immediate Validation

Backend

Server Validation

Database

Schema Validation

---

Validation Examples

Email

Valid format

Password

Minimum 8 chars

Task Title

Required

Habit Name

Required

---

# 72. Caching Strategy

Server State

TanStack Query Cache

---

User

Cached

---

Tasks

Cached

---

Habits

Cached

---

Analytics

Revalidated

---

# 73. Performance Strategy

Lazy Loading

Dynamic Imports

Image Optimization

Code Splitting

Memoization

Debounced Search

Pagination

Virtualization

---

# 74. Logging

Development

Console

---

Production

Request Logs

Error Logs

Performance Logs

---

# 75. Error Monitoring

Production should integrate

Sentry

Future

LogRocket

---

# 76. Security Requirements

Passwords

bcrypt

JWT

Refresh Tokens

HTTPS

Rate Limiting

Helmet

CORS

Mongo Sanitization

XSS Protection

CSRF Protection

Input Validation

Secure Cookies

Environment Variables

---

# 77. Database Requirements

Collections

Users

Tasks

Habits

Categories

Tags

Sessions

Notifications

Analytics

---

Indexes

Email

User ID

Due Date

Created Date

Habit Frequency

---

# 78. Search Architecture

Search should support

Tasks

Habits

Categories

Tags

Calendar Events

Search must be

Debounced

Case Insensitive

Fast

---

# 79. Notification Architecture

Phase 2

Email

Browser Push

Daily Digest

Reminder Jobs

Weekly Reports

---

# 80. Deployment Architecture

Frontend

Vercel

↓

Backend

Railway / Render

↓

MongoDB Atlas

↓

Cloudinary (Future)

↓

Resend / Nodemailer

---

CI/CD

GitHub

↓

GitHub Actions

↓

Deploy

↓

Tests

↓

Production

---

# 81. Testing Strategy

Unit Tests

Integration Tests

API Tests

Component Tests

E2E Tests

Accessibility Tests

Performance Tests

---

Recommended Tools

Vitest

React Testing Library

Playwright

Supertest

---

# 82. Browser Support

Chrome

Edge

Firefox

Safari

Latest Two Versions

---

# 83. Mobile Support

Responsive

Desktop First

Tablet

Mobile

PWA Ready (Future)

---

# 84. Backup Strategy

MongoDB Atlas Backups

Daily

Weekly

Monthly

---

# 85. Scalability Considerations

Design services to remain modular.

Separate feature domains.

Avoid tight coupling.

Prepare backend for future migration to microservices if required.

Support thousands of tasks per user without noticeable UI degradation.

---

# 86. Engineering Standards

Use TypeScript throughout.

Follow ESLint and Prettier.

Conventional Commits.

Repository Pattern (Backend).

Feature-Based Architecture (Frontend).

Meaningful logging.

Comprehensive validation.

Reusable UI components.

Document public APIs.
# GRAPHODO PRD
# Part 5 — Backend & Database Specifications

---

# 87. Backend Overview

## Purpose

The backend is responsible for

- Authentication
- Authorization
- Business Logic
- Database Operations
- Analytics Generation
- Calendar Scheduling
- Habit Tracking
- Notification Scheduling
- Data Validation

The backend should expose a RESTful API consumed by the Next.js frontend.

---

# 88. Backend Architecture

```
                Next.js Client
                      │
               HTTPS REST API
                      │
                Express Server
                      │
        ┌─────────────┼─────────────┐
        │             │             │
 Authentication   Business Logic   Analytics
        │             │             │
        └─────────────┼─────────────┘
                      │
                 MongoDB Atlas
```

---

# 89. Architecture Pattern

Backend follows

- Layered Architecture
- Repository Pattern
- Service Layer
- Controller Layer

```
Routes

↓

Controllers

↓

Services

↓

Repositories

↓

MongoDB
```

Business logic should NEVER exist inside controllers.

---

# 90. Database Collections

GRAPHODO contains the following collections.

```
Users

Tasks

Habits

Categories

Tags

CalendarEvents

Notifications

Analytics

RefreshTokens
```

---

# 91. User Schema

## Collection

users

### Fields

_id

name

email

passwordHash

avatar

provider

emailVerified

theme

timezone

createdAt

updatedAt

---

### Example

```
{
 name: "John",

 email: "john@gmail.com",

 provider: "google",

 theme: "dark"
}
```

---

### Relationships

One User

↓

Many Tasks

Many Habits

Many Calendar Events

Many Notifications

One Analytics Document

---

# 92. Task Schema

Collection

tasks

---

Fields

_id

userId

title

description

priority

categoryId

tags

status

dueDate

dueTime

repeat

subtasks

notes

completedAt

createdAt

updatedAt

---

Status

Pending

Completed

Archived

Deleted

---

Priority

Low

Medium

High

Urgent

---

Repeat

None

Daily

Weekly

Monthly

Custom

---

Relationship

One User

↓

Many Tasks

---

# 93. Subtask Schema

Stored inside Task

```
{

title

completed

createdAt

}
```

---

Completion %

Automatically calculated.

---

# 94. Habit Schema

Collection

habits

---

Fields

_id

userId

title

description

frequency

currentStreak

longestStreak

completionRate

completedDates

color

paused

createdAt

updatedAt

---

Frequency

Daily

Weekdays

Weekends

Weekly

Monthly

Custom

---

# 95. Category Schema

Collection

categories

---

Fields

_id

userId

name

color

icon

createdAt

---

Default Categories

Study

Coding

Health

Work

Personal

---

# 96. Tag Schema

Collection

tags

---

Fields

_id

userId

name

color

---

Tags are reusable.

---

# 97. Calendar Event Schema

Collection

calendarEvents

---

Fields

_id

taskId

userId

title

startTime

endTime

repeat

color

reminder

createdAt

---

# 98. Notification Schema

Collection

notifications

---

Fields

_id

userId

title

message

type

read

scheduledFor

createdAt

---

Types

Task

Habit

Reminder

Achievement

Weekly Summary

---

# 99. Analytics Schema

Collection

analytics

---

Stores

Daily Productivity

Weekly Productivity

Monthly Productivity

Current Streak

Longest Streak

Productivity Score

Completion %

Task Counts

Habit Counts

Heatmap Data

---

# 100. Relationships

```
User

├── Tasks

├── Habits

├── Categories

├── Tags

├── CalendarEvents

├── Notifications

└── Analytics
```

---

# 101. REST API Structure

Base URL

```
/api/v1/
```

Resources

```
auth/

users/

tasks/

habits/

calendar/

analytics/

notifications/

settings/
```

---

# 102. Authentication API

POST

```
/auth/register
```

POST

```
/auth/login
```

POST

```
/auth/google
```

POST

```
/auth/logout
```

POST

```
/auth/refresh
```

POST

```
/auth/forgot-password
```

POST

```
/auth/reset-password
```

---

# 103. Task API

GET

```
/tasks
```

GET

```
/tasks/:id
```

POST

```
/tasks
```

PUT

```
/tasks/:id
```

PATCH

```
/tasks/:id/complete
```

PATCH

```
/tasks/:id/archive
```

DELETE

```
/tasks/:id
```

---

# 104. Habit API

GET

```
/habits
```

POST

```
/habits
```

PUT

```
/habits/:id
```

PATCH

```
/habits/:id/complete
```

PATCH

```
/habits/:id/pause
```

DELETE

```
/habits/:id
```

---

# 105. Calendar API

GET

```
/calendar
```

POST

```
/calendar
```

PUT

```
/calendar/:id
```

DELETE

```
/calendar/:id
```

---

# 106. Analytics API

GET

```
/analytics/dashboard
```

GET

```
/analytics/daily
```

GET

```
/analytics/weekly
```

GET

```
/analytics/monthly
```

GET

```
/analytics/heatmap
```

---

# 107. Business Logic

Task Completion

↓

Update Task Status

↓

Update Analytics

↓

Update Productivity Score

↓

Update Dashboard

↓

Return Updated Data

---

Habit Completion

↓

Increment Streak

↓

Update Completion Rate

↓

Update Analytics

↓

Return Updated Habit

---

Calendar Update

↓

Update Task

↓

Update Reminder

↓

Refresh Dashboard

---

# 108. Background Jobs

Daily Midnight Job

- Reset daily habits
- Generate productivity summary
- Update streaks
- Archive expired reminders

Reminder Job

- Send browser notifications
- Send email reminders

Weekly Job

- Weekly report generation
- Weekly analytics snapshot

---

# 109. Validation Rules

User

- Unique email
- Password ≥ 8 characters

Task

- Title required
- Due date optional
- Priority enum validation

Habit

- Frequency enum validation
- Title required

Calendar Event

- End time must be after start time

---

# 110. Error Response Format

```json
{
  "success": false,
  "message": "Task not found",
  "error": {
    "code": "TASK_NOT_FOUND"
  }
}
```

---

# 111. API Success Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "...": "..."
  }
}
```

---

# 112. Permissions

Every authenticated user can access **only their own data**.

Authorization checks are required on every protected route.

Users cannot:

- View another user's tasks
- Modify another user's habits
- Access another user's analytics
- Read another user's notifications
# GRAPHODO PRD
# Part 6 — Development Blueprint & Launch Plan

---

# 113. Development Philosophy

GRAPHODO should be developed using an iterative, feature-based approach.

Every feature must:

- Be independently testable
- Follow consistent coding standards
- Include frontend and backend integration
- Be documented
- Be responsive
- Be accessible
- Be production-ready before merge

Development should prioritize quality over speed.

---

# 114. Development Roadmap

## Phase 1 — Foundation

Goal:
Build the core infrastructure.

Deliverables

- Project setup
- Repository
- Next.js
- Express
- MongoDB
- Authentication
- UI Framework
- Theme System
- Component Library
- Routing

Completion Criteria

Users can register and log in successfully.

---

## Phase 2 — Core Productivity

Goal

Task Management

Deliverables

- CRUD Tasks
- Categories
- Tags
- Priorities
- Search
- Filters
- Recurring Tasks
- Subtasks

Completion Criteria

Tasks can be fully managed.

---

## Phase 3 — Habits

Deliverables

- Habit CRUD
- Streaks
- Statistics
- Completion Tracking

Completion Criteria

Daily habits function correctly.

---

## Phase 4 — Calendar

Deliverables

- Calendar
- Drag & Drop
- Time Blocking
- Agenda View
- Scheduling

Completion Criteria

Users can organize their day.

---

## Phase 5 — Analytics

Deliverables

- Dashboard
- Charts
- Heatmap
- Productivity Score
- Weekly Trends

Completion Criteria

Analytics update automatically.

---

## Phase 6 — Polish

Deliverables

- Animations
- Accessibility
- Responsive Design
- Performance
- Testing

Completion Criteria

Application is production ready.

---

# 115. Sprint Planning

## Sprint 1

Project Setup

Authentication

UI Foundation

---

## Sprint 2

Task Module

---

## Sprint 3

Habit Module

---

## Sprint 4

Calendar

---

## Sprint 5

Analytics

---

## Sprint 6

Settings

Profile

Search

---

## Sprint 7

Testing

Optimization

Deployment

---

# 116. Git Repository Structure

```
graphodo/

frontend/

backend/

docs/

design/

assets/

scripts/

.github/

README.md

LICENSE
```

---

# 117. Git Branch Strategy

Main Branches

main

develop

---

Feature Branches

feature/auth

feature/dashboard

feature/tasks

feature/habits

feature/calendar

feature/analytics

feature/settings

---

Bug Branches

bugfix/...

---

Release Branches

release/v1.0

---

# 118. Commit Convention

Use Conventional Commits.

Examples

```
feat(tasks): add recurring tasks

fix(calendar): resolve drag issue

refactor(auth): improve token handling

docs(prd): update analytics requirements

style(button): improve hover animation

test(api): add task endpoint tests
```

---

# 119. Coding Standards

## Frontend

- Functional Components
- Hooks
- TypeScript Strict Mode
- Feature-Based Architecture
- Reusable Components
- No duplicated UI

---

## Backend

- Layered Architecture
- Repository Pattern
- Service Layer
- Typed Responses
- Consistent Error Handling

---

# 120. Environment Variables

Frontend

```
NEXT_PUBLIC_API_URL

NEXT_PUBLIC_GOOGLE_CLIENT_ID
```

Backend

```
PORT

NODE_ENV

MONGO_URI

JWT_SECRET

JWT_REFRESH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

EMAIL_SERVICE_KEY

FRONTEND_URL
```

---

# 121. Testing Strategy

## Unit Tests

Controllers

Services

Utilities

Validation

---

## Integration Tests

Authentication

Tasks

Habits

Calendar

Analytics

---

## Frontend Tests

Components

Forms

State

Hooks

---

## End-to-End Tests

Register

Login

Create Task

Complete Task

Create Habit

Calendar Scheduling

Analytics Update

Logout

---

# 122. Performance Checklist

Before Release

- Lighthouse ≥ 90
- Lazy Loading
- Dynamic Imports
- Optimized Images
- API Caching
- Memoized Components
- Virtualized Lists
- Debounced Search
- Code Splitting
- Tree Shaking

---

# 123. Security Checklist

- HTTPS Only
- JWT Authentication
- Refresh Tokens
- HTTP-only Cookies
- Password Hashing
- Rate Limiting
- Input Validation
- Output Sanitization
- MongoDB Injection Protection
- XSS Protection
- CSRF Protection
- Secure Headers
- Environment Variables
- Audit Dependencies

---

# 124. Accessibility Checklist

- WCAG AA Compliance
- Keyboard Navigation
- Focus Indicators
- Screen Reader Support
- Semantic HTML
- ARIA Labels
- Reduced Motion Support
- Color Contrast Validation

---

# 125. Deployment Plan

Frontend

Vercel

↓

Backend

Railway / Render

↓

Database

MongoDB Atlas

↓

Monitoring

Sentry

↓

Analytics

Google Analytics / PostHog (Optional)

---

# 126. CI/CD Pipeline

Developer Push

↓

GitHub

↓

GitHub Actions

↓

Lint

↓

Type Check

↓

Unit Tests

↓

Build

↓

Deploy Preview

↓

Production Approval

↓

Deploy

---

# 127. Monitoring

Track

- API Errors
- Client Errors
- Slow Requests
- Failed Logins
- Database Errors
- Performance Metrics
- Uptime

Recommended

- Sentry
- Better Stack
- UptimeRobot

---

# 128. Backup Strategy

Database

- Daily Backup
- Weekly Snapshot
- Monthly Archive

Application

- GitHub Repository
- Release Tags

---

# 129. Documentation

Maintain

- README
- API Documentation
- Setup Guide
- Architecture Guide
- Contribution Guide
- Deployment Guide
- Changelog

---

# 130. Launch Checklist

Before Production

### Product

- All MVP features complete
- Responsive on all devices
- Dark mode verified
- Analytics functioning
- Calendar working
- Authentication verified

### Quality

- No critical bugs
- Accessibility tested
- Performance targets met
- Error handling verified

### Security

- Secrets removed from repository
- HTTPS enabled
- Rate limiting active
- JWT verified
- OAuth verified

### Deployment

- Production environment configured
- DNS configured
- Database connected
- Monitoring enabled

---

# 131. Post-Launch Metrics

Monitor

- Daily Active Users
- Weekly Active Users
- Monthly Active Users
- Average Session Duration
- Task Completion Rate
- Habit Completion Rate
- Calendar Usage
- Search Usage
- Retention Rate
- Crash-Free Sessions

---

# 132. Future Roadmap

## Version 1.1

- Better Filters
- Export Tasks
- Import Tasks
- Improved Analytics
- Additional Themes

---

## Version 1.5

- Browser Notifications
- Email Reminders
- Pomodoro Timer
- Daily Digest
- Weekly Reports

---

## Version 2.0

- AI Task Prioritization
- AI Daily Planner
- Smart Scheduling
- AI Productivity Insights
- Natural Language Task Creation

---

## Version 2.5

- Team Workspaces
- Shared Task Lists
- Shared Calendars
- Comments
- Mentions

---

## Version 3.0

- Mobile Application (React Native)
- Desktop Application (Tauri/Electron)
- Offline Support (PWA)
- Wearable Integration
- Third-Party Calendar Sync
- Public API
- Plugin Ecosystem

---

# 133. Definition of Done (DoD)

A feature is considered complete only when:

- Functional requirements are fully implemented.
- UI matches approved design.
- Backend endpoints are complete.
- Validation is implemented.
- Error handling is complete.
- Unit and integration tests pass.
- Responsive behavior is verified.
- Accessibility requirements are satisfied.
- Code review is approved.
- Documentation is updated.

---

# 134. Project Completion Criteria

GRAPHODO Version 1.0 is complete when:

- Secure authentication is available.
- Users can manage tasks and habits.
- Calendar planning works reliably.
- Analytics update in real time.
- Dashboard presents actionable insights.
- The application performs smoothly across supported devices.
- Documentation is complete.
- The application is successfully deployed to production.

---

# 135. Appendix

## Recommended Libraries

### Frontend

- Next.js
- React
- Tailwind CSS
- Framer Motion
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts
- Lucide React
- React Big Calendar (or FullCalendar)

### Backend

- Express.js
- Mongoose
- JWT
- bcrypt
- Passport.js (Google OAuth)
- Zod
- Morgan
- Helmet
- CORS
- node-cron

### Dev Tools

- ESLint
- Prettier
- Husky
- lint-staged
- Vitest
- React Testing Library
- Playwright
- Supertest

---

# End of PRD