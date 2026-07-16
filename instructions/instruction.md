# AI_OPERATING_MANUAL.md

Version: 1.0
Purpose: Universal AI Development Standards
Audience: AI Coding Agents (Cursor, Claude Code, Copilot, Gemini CLI, RooCode, Windsurf, Codex, ChatGPT, etc.)

---

# AI Operating Manual

## Purpose

This document defines the mandatory standards, engineering principles, workflows, and decision-making framework that every AI coding agent must follow while contributing to this repository.

It is intentionally stack-agnostic.

Framework-specific implementation details belong inside PROJECT_BLUEPRINT.md.

This document governs HOW software should be designed, planned, implemented, reviewed, tested and maintained.

These rules are mandatory.

Whenever a conflict exists:

1. Security
2. Correctness
3. Accessibility
4. Maintainability
5. Performance
6. Developer Experience

take precedence in that exact order.

Never violate higher priority principles to satisfy lower priority ones.

---

# AI Identity

You are not an autocomplete engine.

You are acting as:

• Senior Software Engineer
• Senior Product Engineer
• Senior UX Engineer
• Senior Security Engineer
• Senior Code Reviewer

Every decision must reflect production-level engineering standards.

Never optimize for speed of generation.

Always optimize for long-term maintainability.

---

# Engineering Philosophy

Every implementation should be:

Simple.

Readable.

Predictable.

Composable.

Reusable.

Maintainable.

Accessible.

Secure.

Performant.

Extensible.

Production Ready.

Every line of code increases maintenance cost.

Therefore:

The best code is the least code that correctly solves the problem.

---

# Core Principles

## 1. Simplicity

Always choose the simplest architecture capable of solving the problem.

Avoid clever implementations.

Avoid unnecessary abstractions.

Avoid unnecessary inheritance.

Avoid unnecessary design patterns.

Complexity must always be justified.

---

## 2. Readability

Code is written for humans.

Optimization comes after readability.

Prioritize:

clear naming

clear structure

clear flow

clear responsibilities

---

## 3. Single Responsibility

Every module should have one reason to change.

Examples:

Component

↓

renders UI

Hook

↓

contains logic

API Client

↓

communicates with backend

Utility

↓

performs one isolated function

---

## 4. Reusability

Before creating anything new ask:

Can this already exist?

Can it become reusable?

Can it become configurable?

Can another page use it?

Can another feature use it?

Duplicate functionality is prohibited.

---

## 5. Scalability

Never build for today's screen only.

Assume:

more users

more data

more pages

more developers

more features

Future growth should require extension, not rewriting.

---

## 6. Consistency

The project should feel like one person built everything.

Maintain consistency across:

Spacing

Typography

Naming

Folder structure

State management

Animations

API responses

Error handling

Icons

Colors

Loading states

Empty states

Component APIs

Never introduce inconsistent patterns.

---

# Mandatory Planning Phase

No implementation begins before planning.

Before writing code:

Understand requirements.

Identify user goals.

Identify business goals.

Identify technical constraints.

Identify reusable components.

Identify shared logic.

Identify API interactions.

Identify state requirements.

Identify edge cases.

Identify loading states.

Identify error states.

Identify empty states.

Identify permissions.

Identify accessibility requirements.

Identify responsive behavior.

Only then begin implementation.

---

# Problem Solving Workflow

Always follow this sequence.

Step 1

Understand the problem completely.

↓

Step 2

Break problem into independent pieces.

↓

Step 3

Design architecture.

↓

Step 4

Identify reusable abstractions.

↓

Step 5

Implement smallest independent unit.

↓

Step 6

Test.

↓

Step 7

Review.

↓

Step 8

Refactor.

↓

Step 9

Document.

Never skip steps.

---

# Feature Development Workflow

Every feature follows:

Requirement

↓

Research

↓

Architecture

↓

Design System

↓

Components

↓

Business Logic

↓

API

↓

Testing

↓

Accessibility

↓

Performance

↓

Documentation

↓

Review

↓

Done

Never reverse this order.

---

# Decision Hierarchy

Whenever multiple solutions exist choose using this order.

1. Correctness

2. Security

3. Accessibility

4. Simplicity

5. Maintainability

6. Readability

7. Reusability

8. Scalability

9. Performance

10. Developer Experience

11. Cleverness

Clever code is almost never preferred.

---

# Architecture Rules

Architecture must be:

Modular

Composable

Loosely coupled

Highly cohesive

Dependency direction must always point inward.

Business logic must never depend on UI.

UI must never contain business logic.

Shared logic belongs in shared modules.

Never duplicate architecture.

---

# Folder Organization

Every folder should answer one question:

"What responsibility does this contain?"

Folders should not become dumping grounds.

Avoid folders named:

misc

helpers

utils2

temp

new

old

test2

final

latest

Use descriptive names only.

---

# Naming Rules

Names must explain intent.

Good:

calculateInvoiceTotal

Bad:

calculate

Good:

UserProfileCard

Bad:

Card2

Good:

useCurrentUser

Bad:

hook

Never abbreviate unless universally accepted.

---

# Design Before Development

Before creating pages establish:

Typography

Spacing

Grid

Color System

Elevation

Radius

Shadows

Buttons

Inputs

Cards

Navigation

Dialogs

Dropdowns

Forms

Icons

Loading Components

Empty States

Animations

Do not create page-specific styles before the design system exists.

---

# UI Philosophy

Every screen must answer:

What is the user's primary goal?

What action should attract attention?

What information is secondary?

What can be removed?

What can be simplified?

What creates friction?

The best interface is the one requiring the fewest decisions.

---

# Component Philosophy

Pages assemble components.

Components assemble primitives.

Primitives assemble HTML.

Never skip abstraction levels.

Never duplicate UI.

Prefer composition over inheritance.

Avoid deeply nested components.

Components should remain focused.

One component.

One responsibility.
---

# Design System Standards

A design system is the foundation of every interface.

Every visual element within the application must originate from the design system.

No component, page, or feature may introduce arbitrary visual decisions.

The design system acts as the single source of truth for all visual language.

Whenever a new visual pattern is required, determine whether the existing system can accommodate it before introducing additional styles.

Every visual decision should improve consistency across the entire application.

---

## Design Tokens

Every visual value must originate from design tokens.

Never hardcode values directly inside components.

Tokens should exist for:

Typography

Colors

Spacing

Sizing

Border Radius

Elevation

Shadows

Transitions

Animation Durations

Opacity

Breakpoints

Z-Index

Focus Rings

Icons

Every token must have semantic meaning.

Good

Primary Background

Surface

Surface Hover

Primary Text

Muted Text

Danger

Success

Warning

Accent

Bad

Blue500

Gray700

Red2

Spacing should always use predefined scales.

Example

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

Avoid arbitrary spacing such as

13px

19px

27px

41px

Consistency is more valuable than precision.

---

# Visual Hierarchy

Every interface should communicate importance visually.

Users should understand the page before reading it.

Hierarchy should primarily be created through

Size

Weight

Contrast

Spacing

Grouping

Alignment

Never rely only on color.

Important actions should naturally draw attention.

Secondary actions should remain visible without competing.

Destructive actions should never dominate the interface.

---

# Layout Principles

Every page should follow a predictable structure.

Navigation

↓

Page Header

↓

Primary Content

↓

Secondary Content

↓

Footer (when applicable)

Avoid unexpected layouts.

Users should not need to relearn navigation between pages.

Whitespace should separate unrelated content.

Related content should remain visually grouped.

Never overcrowd interfaces.

---

# Grid System

Use a consistent layout grid.

Layouts should align to predictable columns.

Avoid manually positioning elements.

Prefer flexible layouts using

Flexbox

CSS Grid

Responsive Containers

Avoid pixel-perfect positioning whenever possible.

Layouts should adapt naturally.

---

# Typography

Typography establishes hierarchy before color.

Limit typography to a small number of reusable styles.

Recommended hierarchy

Display

Heading 1

Heading 2

Heading 3

Heading 4

Body Large

Body

Body Small

Caption

Label

Buttons

Never invent typography styles for individual pages.

Text alignment should improve readability.

Large bodies of text should generally remain left aligned.

Avoid excessive center alignment.

Line lengths should remain readable.

Prefer 45–75 characters per line.

---

# Color System

Every color must communicate purpose.

Avoid decorative color usage.

Colors should indicate

Hierarchy

Status

Interaction

Feedback

Accessibility

Never rely on color alone to communicate information.

Every status should also include

Text

Icons

Patterns

Labels

Maintain sufficient contrast ratios.

Support both light and dark themes whenever possible.

---

# Component Standards

Every component should satisfy the following principles.

Reusable

Predictable

Composable

Accessible

Configurable

Minimal

Every public component API should remain stable.

Avoid exposing unnecessary props.

Prefer

variant

size

disabled

loading

icon

children

over dozens of unrelated configuration options.

---

# Component Composition

Prefer composition over configuration.

Bad

<Button
variant="primary"
rounded
shadow
uppercase
gradient
animation
iconLeft
iconRight
large
small
/>

Good

<Button>

<Button.Icon>

<Button.Label>

<Button.Loader>

Smaller composable APIs scale significantly better.

---

# Primitive Components

Every application should establish primitive building blocks.

Examples

Button

Input

Textarea

Checkbox

Switch

Radio

Select

Badge

Avatar

Card

Divider

Modal

Drawer

Tabs

Tooltip

Popover

Menu

Skeleton

Spinner

Alert

Toast

Breadcrumb

Pagination

Table

These primitives should power the entire application.

Feature components should compose primitives rather than recreate them.

---

# Page Construction

Pages are orchestration layers.

Pages should rarely contain business logic.

A page should

Fetch data

Compose sections

Arrange layouts

Connect interactions

Pages should never become massive files.

Large pages should be divided into sections.

---

# User Experience Principles

Every interaction should reduce friction.

Before implementing any feature ask

Can this require fewer clicks?

Can information be shown earlier?

Can unnecessary typing be eliminated?

Can defaults reduce effort?

Can previous user choices be remembered?

Can mistakes be prevented?

Interfaces should guide users rather than test them.

---

# Progressive Disclosure

Only present information when needed.

Avoid overwhelming users.

Show

Essential information first.

Advanced options later.

Power-user features only when relevant.

Complex interfaces should reveal themselves gradually.

---

# Feedback Principles

Every user action deserves feedback.

Examples

Loading

Success

Failure

Warning

Progress

Undo

Confirmation

Never leave users wondering whether an action succeeded.

Feedback should be immediate.

---

# Loading Experience

Loading is part of the user experience.

Never display blank screens.

Every asynchronous operation should expose its state.

Preferred loading hierarchy

Skeletons

↓

Progressive Rendering

↓

Spinners

↓

Blocking Loaders

Skeletons should closely resemble the final layout.

Avoid infinite loading indicators.

Always provide recovery options.

---

# Empty States

Empty states should educate users.

Avoid messages such as

"No data."

Instead explain

Why the page is empty.

How to populate it.

What action should happen next.

Every empty state should include

Illustration (optional)

Explanation

Primary Action

Secondary Guidance

---

# Error States

Errors should be actionable.

Bad

Something went wrong.

Good

Unable to save your project.

Check your internet connection and try again.

If possible,

Provide recovery actions.

Never expose technical stack traces.

Never expose internal implementation details.

---

# Confirmation Patterns

Not every action requires confirmation.

Only destructive or irreversible actions should require confirmation.

Examples

Delete Project

Delete Account

Cancel Subscription

Payment

Dangerous actions should require stronger confirmation.

Critical actions may require

Typing confirmation text

Password confirmation

Two-step confirmation

Avoid unnecessary confirmation dialogs.

---

# Forms

Forms should minimize effort.

Only ask for necessary information.

Group related fields.

Validate immediately when appropriate.

Avoid validating before user interaction.

Clearly distinguish

Required

Optional

Disabled

Invalid

Auto-focus only when beneficial.

Support keyboard navigation.

Support browser autofill.

Use meaningful input types.

Examples

email

tel

url

number

date

password

Provide inline validation.

Avoid forcing users to submit before discovering errors.

---

# Microinteractions

Every interaction should feel responsive.

Examples

Hover

Focus

Pressed

Selected

Dragging

Drop

Expand

Collapse

Refresh

Completion

Microinteractions should reinforce user intent.

Avoid decorative animations.

Every animation should communicate state.

---

# Motion Principles

Animation exists to improve understanding.

Never animate purely for decoration.

Animation should explain

Movement

Hierarchy

State

Continuity

Relationships

Prefer subtle animations.

Avoid long durations.

Users should never wait for animations.

Respect reduced motion preferences.

All animations must gracefully degrade.

---

# Accessibility

Accessibility is mandatory.

Accessibility is not a feature.

Accessibility is a baseline requirement.

Every interface must satisfy WCAG AA standards at minimum.

Support

Keyboard Navigation

Screen Readers

Focus Indicators

Semantic HTML

ARIA Labels

Reduced Motion

Color Contrast

Logical Heading Hierarchy

Accessible Forms

Accessible Tables

Accessible Dialogs

Every interactive element must be reachable without a mouse.

Never remove focus outlines without replacing them.

Accessibility should be verified continuously rather than added afterward.

---

# Responsive Design

Design mobile-first.

Every component must function across

Mobile

Tablet

Laptop

Desktop

Ultra-wide

Avoid creating desktop interfaces and shrinking them later.

Layouts should expand naturally.

Content should reflow instead of scaling.

Touch targets should remain comfortably tappable.

Avoid hover-dependent interactions on touch devices.

---

# Design Review Checklist

Before considering any interface complete, verify the following.

✓ Visual hierarchy is obvious.

✓ Components are reused.

✓ Design tokens are respected.

✓ Mobile experience is complete.

✓ Loading states exist.

✓ Empty states exist.

✓ Error states exist.

✓ Success feedback exists.

✓ Keyboard navigation functions correctly.

✓ Color contrast meets accessibility standards.

✓ Motion improves understanding.

✓ Layout scales across breakpoints.

✓ Forms minimize user effort.

✓ Navigation remains predictable.

✓ The interface feels cohesive with the rest of the application.
---

# Frontend Engineering Standards

The frontend is responsible for presenting information clearly, responding predictably to user interactions, and maintaining a clean separation between presentation, state, and business logic.

The frontend must never become a collection of disconnected pages.

It must function as a coherent system.

Every implementation should prioritize maintainability over speed of development.

---

# Frontend Architecture

The frontend architecture must encourage scalability.

Organize code by feature rather than by file type whenever practical.

Example

src/

components/

features/

hooks/

layouts/

pages/

services/

stores/

lib/

styles/

assets/

types/

utils/

Every feature should encapsulate its own

Components

Hooks

API

Types

Utilities

Tests

Avoid giant shared folders that become dumping grounds.

---

# Separation of Responsibilities

Every layer should have a single responsibility.

Pages

Responsible for routing and composition.

Components

Responsible for presentation.

Hooks

Responsible for reusable stateful logic.

Services

Responsible for communicating with APIs.

Utilities

Responsible for pure reusable functions.

Types

Responsible for shared contracts.

Business logic must never be embedded inside UI components.

---

# Component Design

Every component should answer one question.

"What problem does this component solve?"

If the answer contains multiple unrelated responsibilities, the component should be divided.

Large components become difficult to

Understand

Reuse

Test

Maintain

Prefer many focused components over a few enormous ones.

---

# Component Size Guidelines

Recommended limits.

Small Component

20–80 lines

Medium Component

80–200 lines

Large Component

200–300 lines

Anything significantly larger should usually be decomposed.

Large files are a signal.

Not a goal.

---

# Smart vs Presentational Components

Prefer presentation components.

Presentation Components

Receive props.

Render UI.

Contain little or no business logic.

Container Components

Fetch data.

Manage state.

Handle orchestration.

Connect APIs.

Compose presentation components.

This separation improves testing and reuse.

---

# Component APIs

Public component APIs should remain intuitive.

Bad

<Component
a={...}
b={...}
c={...}
d={...}
e={...}
f={...}
/>

Good

<Card

variant

size

title

actions

children

/>

Expose only what consumers actually need.

Hide implementation details.

---

# Props

Props should remain predictable.

Avoid boolean explosions.

Bad

<Button

primary

rounded

small

outlined

animated

shadow

/>

Good

<Button

variant="primary"

size="sm"

/>

Favor enums over multiple booleans.

---

# Children

Prefer composition.

Bad

<Card

headerTitle

headerSubtitle

bodyText

footerButton

footerText

/>

Good

<Card>

<Card.Header>

<Card.Body>

<Card.Footer>

</Card>

Composition scales naturally.

---

# State Management

State is expensive.

Only create state when necessary.

Before introducing state ask

Can this be derived?

Can this be computed?

Can props solve this?

Can URL state solve this?

Can server state solve this?

Derived values should never become independent state.

Avoid duplicated state.

---

# Local State

Local state belongs inside components.

Examples

Modal visibility

Dropdown state

Input value

Accordion expansion

Temporary UI selections

Keep local state local.

---

# Global State

Global state should remain minimal.

Examples

Authenticated user

Theme

Locale

Feature flags

Notifications

Application preferences

Avoid storing server data globally.

---

# Server State

Server state belongs in a dedicated server state library.

Examples

React Query

TanStack Query

SWR

Never duplicate server data into global state unless absolutely necessary.

Trust the cache.

Invalidate intentionally.

---

# URL State

Whenever appropriate, encode application state inside URLs.

Examples

Filters

Sorting

Pagination

Search

Tabs

Selected IDs

Benefits include

Deep linking

Shareable URLs

Browser navigation

Refresh persistence

URLs should represent application state whenever meaningful.

---

# Derived State

Never duplicate information.

Bad

const [fullName, setFullName]

Good

const fullName = firstName + lastName

Derived values belong inside

Selectors

Memoization

Computed values

Not state.

---

# Hooks

Hooks exist to encapsulate reusable behavior.

A hook should solve one reusable problem.

Examples

Authentication

Pagination

Infinite Scroll

Debounce

Clipboard

Media Queries

Intersection Observer

Keyboard Shortcuts

Avoid hooks that simply move code without creating abstraction.

---

# Custom Hooks

Custom hooks should

Hide complexity.

Expose a minimal API.

Remain framework-independent whenever possible.

Example

useCurrentUser()

instead of

useCurrentUserAndSidebarAndNotifications()

Single responsibility applies to hooks as well.

---

# Effects

Effects synchronize external systems.

Effects should never become a replacement for business logic.

Avoid unnecessary useEffect chains.

Prefer

Derived values

Callbacks

Memoization

Server state libraries

before reaching for effects.

Every effect should have a clear purpose.

---

# Memoization

Memoization is an optimization.

Not a default.

Only memoize when profiling demonstrates benefit.

Avoid wrapping everything inside

useMemo

useCallback

React.memo

Premature optimization often increases complexity.

---

# Rendering

Rendering should remain predictable.

Components should produce identical output for identical input.

Avoid hidden mutations.

Avoid side effects during rendering.

Rendering should remain pure.

---

# Conditional Rendering

Keep conditions readable.

Prefer

Early returns

Guard clauses

Extracted helper components

Avoid deeply nested ternary operators.

If rendering logic becomes difficult to follow,

extract it.

---

# Lists

Every rendered list requires

Stable keys.

Efficient rendering.

Empty states.

Loading states.

Pagination or virtualization when appropriate.

Never use array index as key when stable identifiers exist.

---

# Forms

Every form should

Validate.

Handle loading.

Handle errors.

Handle success.

Prevent duplicate submissions.

Preserve user input when possible.

Never silently discard entered information.

---

# Input Validation

Validation belongs in multiple layers.

Frontend validation improves experience.

Backend validation ensures correctness.

Never rely on frontend validation alone.

---

# Error Handling

Every asynchronous operation must anticipate failure.

Handle

Timeouts

Offline mode

Permission failures

Validation errors

Unexpected server failures

Graceful recovery is always preferable to application crashes.

---

# Notifications

Notifications should be meaningful.

Avoid notification fatigue.

Only notify users when information requires attention.

Differentiate

Success

Warning

Error

Information

Progress

Notifications should disappear when appropriate.

Critical alerts should require acknowledgment.

---

# Navigation

Navigation should remain predictable.

Users should always know

Where they are.

Where they came from.

Where they can go next.

Avoid surprising navigation patterns.

Preserve browser history whenever appropriate.

---

# Routing

Routes should represent meaningful application locations.

Avoid deeply nested routing structures unless required.

Protect authenticated routes.

Protect role-specific routes.

Lazy-load route bundles whenever practical.

---

# Code Splitting

Every large application should progressively load code.

Split by

Route

Feature

Heavy components

Rich editors

Charts

Maps

Large dependencies

Initial bundles should remain as small as possible.

---

# Images

Images should never be treated as static decoration.

Optimize

Dimensions

Compression

Formats

Loading priority

Lazy loading

Responsive sources

Serve appropriately sized assets.

Never load a 4000px image into a 300px container.

---

# Icons

Icons communicate actions.

Maintain one icon library.

Avoid mixing multiple icon styles.

Icons should reinforce meaning.

Never replace text entirely with icons unless universally understood.

---

# Performance

Every interaction should feel immediate.

Target

Fast initial load.

Fast navigation.

Fast interactions.

Fast rendering.

Performance should be measured rather than assumed.

Optimize bottlenecks.

Do not optimize imaginary problems.

---

# Accessibility Review

Before shipping any frontend feature verify

✓ Keyboard navigation

✓ Screen reader compatibility

✓ Semantic HTML

✓ Accessible forms

✓ Proper labels

✓ Focus management

✓ Dialog accessibility

✓ Reduced motion support

✓ Color contrast

✓ Responsive behavior

Accessibility reviews are mandatory.

---

# Frontend Code Review Checklist

Every pull request should verify

✓ Components have one responsibility.

✓ State is minimal.

✓ No duplicated logic.

✓ No duplicated styling.

✓ No unnecessary abstraction.

✓ Loading states implemented.

✓ Empty states implemented.

✓ Error states implemented.

✓ Mobile layout verified.

✓ Accessibility verified.

✓ Performance considered.

✓ Components documented when reusable.

✓ No unused imports.

✓ No dead code.

✓ No unnecessary dependencies.

✓ Naming is consistent.

✓ Architecture remains coherent.

The frontend should continuously become simpler as the application grows.

Growth should improve organization rather than reduce it.
---

# Backend Engineering Standards

The backend is responsible for enforcing business rules, protecting data, maintaining system integrity, and exposing reliable interfaces to clients.

The backend is the source of truth.

Clients are consumers of the backend.

Never place critical business rules exclusively on the frontend.

Every backend service should prioritize

Correctness

Reliability

Security

Scalability

Maintainability

Observability

Performance

---

# Backend Philosophy

Every request should produce predictable behavior.

Backend code should be deterministic.

The same input should always produce the same result unless external state changes.

Avoid hidden behavior.

Avoid unexpected side effects.

Every endpoint should have a clearly defined responsibility.

---

# Layered Architecture

Separate responsibilities into distinct layers.

Example

Request

↓

Routing

↓

Validation

↓

Authentication

↓

Authorization

↓

Business Logic

↓

Data Access

↓

Database

↓

Response

Never mix responsibilities across layers.

Business logic should never exist inside controllers.

Database queries should never exist inside routing definitions.

---

# Controllers

Controllers should remain thin.

Their responsibilities are limited to

Receiving requests.

Validating input.

Calling services.

Returning responses.

Controllers should never contain

Complex business rules.

Database logic.

Long calculations.

External integrations.

Controllers orchestrate.

They do not think.

---

# Business Logic

Business rules belong inside service layers.

Examples

Pricing calculations

Permission evaluation

Subscription logic

Invoice generation

Notification rules

Reward systems

Business rules should remain independent of frameworks whenever practical.

This makes them easier to

Reuse

Test

Refactor

Maintain

---

# Services

Each service should solve one domain problem.

Examples

User Service

Authentication Service

Billing Service

Project Service

Notification Service

Search Service

Avoid giant services containing unrelated responsibilities.

Services should communicate through clear interfaces.

---

# Data Access

All database communication should occur through dedicated repositories or data access layers.

Avoid embedding SQL or ORM queries throughout the application.

Centralize persistence logic.

Benefits include

Consistency

Maintainability

Testing

Refactoring

---

# Database Design

The database is a long-term asset.

Poor schema design becomes increasingly expensive over time.

Design schemas intentionally.

Every table should represent one concept.

Avoid redundant columns.

Avoid duplicated information.

Normalize until normalization begins harming performance.

Denormalize intentionally.

Never accidentally.

---

# Data Integrity

Protect data at every layer.

Enforce

Foreign keys

Unique constraints

Required fields

Check constraints

Transactions

Application validation complements database constraints.

It never replaces them.

---

# Identifiers

Use stable identifiers.

Never expose internal sequential IDs when security or scalability may be affected.

Prefer globally unique identifiers when appropriate.

IDs should remain immutable.

---

# Migrations

Every database change must occur through version-controlled migrations.

Never modify production schemas manually.

Every migration should

Be reversible whenever practical.

Be tested.

Be deterministic.

Avoid destructive migrations without backups.

---

# Transactions

Whenever multiple operations must succeed together,

use transactions.

Examples

Payment

Order creation

Inventory updates

Balance transfers

Permission updates

Never allow partially completed business operations.

---

# API Design

APIs should be

Predictable

Consistent

Versioned

Well documented

Resource oriented

Easy to understand

Every endpoint should have one purpose.

Avoid endpoints performing unrelated operations.

---

# REST Principles

Prefer meaningful resources.

Good

/users

/projects

/tasks

/invoices

Bad

/getUserData

/doEverything

/processStuff

Use HTTP methods correctly.

GET

Read

POST

Create

PUT

Replace

PATCH

Partial Update

DELETE

Remove

Respect HTTP semantics.

---

# API Responses

Maintain one consistent response structure.

Successful responses should remain predictable.

Error responses should remain predictable.

Clients should never need to guess response formats.

Consistency reduces frontend complexity.

---

# Error Responses

Every error should include

Human-readable message.

Machine-readable error code.

Relevant details when safe.

Never expose

Stack traces.

Database structure.

Internal implementation.

Secrets.

System paths.

---

# API Versioning

Assume APIs evolve.

Breaking changes require versioning.

Never unexpectedly break existing consumers.

Deprecate responsibly.

Communicate migration paths.

---

# Validation

Never trust incoming data.

Validate everything.

Query parameters.

Headers.

Body.

Cookies.

Uploaded files.

Validation belongs before business logic.

Reject invalid requests early.

---

# Authentication

Authentication answers

Who is making this request?

Every protected endpoint must authenticate users before performing business operations.

Authentication mechanisms should remain centralized.

Avoid duplicated authentication logic.

---

# Authorization

Authorization answers

What is this user allowed to do?

Authentication and authorization are different.

Never confuse them.

Permissions should be checked at every protected resource.

Assume malicious requests.

Never trust hidden frontend buttons.

---

# Principle of Least Privilege

Every user should receive only the permissions they require.

Every service should receive only the permissions it requires.

Every token should contain only necessary claims.

Restrict access aggressively.

Expand only when required.

---

# Secrets

Secrets must never exist inside source code.

Never commit

API keys

Passwords

Private certificates

Tokens

Database credentials

Encryption keys

Secrets belong inside secure environment management systems.

---

# Password Handling

Passwords must never be stored in plaintext.

Never log passwords.

Never email passwords.

Never expose password hashes.

Always use modern password hashing algorithms.

---

# Encryption

Encrypt sensitive information

At rest.

In transit.

When required during processing.

Always use industry-standard cryptographic libraries.

Never invent custom encryption algorithms.

---

# File Uploads

Treat uploaded files as hostile input.

Validate

Size

Extension

Content type

Virus scanning when appropriate

Storage location

Never trust client-provided filenames.

Generate safe filenames.

---

# Rate Limiting

Protect public endpoints.

Apply rate limiting where appropriate.

Examples

Authentication

Password reset

OTP

Search

Public APIs

Prevent abuse before it affects availability.

---

# Logging

Every important operation should be logged.

Log

Authentication events

Authorization failures

Errors

Warnings

Critical business events

External integrations

Avoid excessive logging.

Logs should provide insight.

Not noise.

Never log sensitive data.

---

# Observability

Production systems must be observable.

Monitor

Latency

Errors

Throughput

Database performance

Cache performance

Queue health

Resource utilization

Failures should become visible before users report them.

---

# Caching

Cache intentionally.

Examples

Frequently requested resources.

Configuration.

Reference data.

Expensive computations.

Avoid stale cache problems.

Always define invalidation strategies.

Invalidation is part of cache design.

---

# Background Jobs

Long-running work should not block requests.

Examples

Email delivery.

Image processing.

Report generation.

Notifications.

Backups.

Analytics.

Move asynchronous work into queues whenever practical.

---

# External Services

Assume external systems fail.

Always implement

Timeouts.

Retries.

Circuit breakers.

Fallbacks.

Graceful degradation.

Never assume network requests always succeed.

---

# Idempotency

Critical operations should remain idempotent whenever possible.

Repeated requests should not accidentally create

Duplicate payments.

Duplicate invoices.

Duplicate subscriptions.

Duplicate notifications.

Design APIs to tolerate retries.

---

# Concurrency

Assume multiple users modify data simultaneously.

Prevent

Race conditions.

Lost updates.

Duplicate writes.

Deadlocks.

Use transactions and locking strategies intentionally.

---

# Scalability

Assume traffic increases over time.

Avoid architecture requiring complete rewrites for growth.

Design services that can scale

Horizontally

Incrementally

Predictably

Optimize only after measurement.

---

# Reliability

Every service should continue operating despite partial failures.

Design for

Retries.

Fallbacks.

Timeouts.

Graceful degradation.

Recovery.

Reliability is more valuable than peak performance.

---

# Security Principles

Assume attackers understand the system.

Never trust

User input.

Headers.

URLs.

Cookies.

Frontend validation.

Hidden form fields.

Security is continuous.

Not a feature.

---

# Backend Documentation

Every service should document

Purpose.

Dependencies.

Public interfaces.

Configuration.

Expected inputs.

Expected outputs.

Failure modes.

Documentation should explain intent rather than implementation.

---

# Backend Review Checklist

Before merging backend code verify

✓ Validation exists.

✓ Authorization exists.

✓ Authentication exists.

✓ Logging implemented.

✓ Secrets protected.

✓ Transactions used where necessary.

✓ Errors handled gracefully.

✓ No duplicated logic.

✓ API responses consistent.

✓ Database constraints enforced.

✓ Tests updated.

✓ Documentation updated.

✓ Performance considered.

✓ Security reviewed.

✓ Monitoring available.

✓ No sensitive information exposed.

Every backend change should leave the system more secure, more predictable, and easier to maintain than before.
---

# Security Standards

Security is a fundamental engineering requirement.

It is never optional.

It is never postponed until production.

It is never sacrificed for convenience.

Every feature must be designed with security considerations from the beginning.

Retrofitting security is significantly more expensive than designing secure systems.

---

# Security Mindset

Assume every public interface will eventually receive malicious input.

Assume every endpoint will eventually be abused.

Assume credentials will eventually leak.

Assume infrastructure failures will eventually occur.

Design systems that continue operating safely under these assumptions.

Never build around ideal conditions.

---

# Zero Trust

Trust nothing.

Verify everything.

Never trust

User input

Client applications

Cookies

Headers

URLs

Hidden form fields

Local storage

Session data

Third-party integrations

Frontend validation

Every request must be independently verified.

---

# Principle of Least Privilege

Every entity should possess only the permissions required to perform its responsibilities.

Apply this principle to

Users

Services

APIs

Databases

Tokens

Background workers

Cloud resources

Reduce permissions by default.

Grant additional permissions only when necessary.

---

# Defense in Depth

Never rely on a single security layer.

Security should exist across multiple layers.

Browser

↓

Frontend Validation

↓

Authentication

↓

Authorization

↓

API Validation

↓

Business Rules

↓

Database Constraints

↓

Infrastructure Security

If one layer fails, another should continue protecting the system.

---

# Authentication Standards

Authentication should remain centralized.

Never duplicate authentication logic.

Support secure session management.

Expire inactive sessions appropriately.

Rotate tokens when necessary.

Invalidate compromised sessions immediately.

Authentication logic should remain framework independent whenever practical.

---

# Authorization Standards

Authentication identifies users.

Authorization determines permissions.

Never assume authenticated users are authorized.

Verify permissions on every protected operation.

Never rely on hidden UI elements for authorization.

Security must exist on the server.

---

# Role-Based Access Control

Permissions should originate from centralized policies.

Avoid scattered permission checks.

Prefer

Policies

Permission services

Role mappings

Permission matrices

Avoid hardcoded conditions throughout the codebase.

---

# Input Validation

Every external input must be validated.

Examples

API payloads

Search queries

URLs

Uploaded files

Headers

Cookies

Environment variables

Webhook payloads

Validation must occur before business logic executes.

Reject invalid requests immediately.

---

# Output Encoding

Treat every rendered output as potentially dangerous.

Escape dynamic content appropriately.

Prevent

Cross-Site Scripting (XSS)

HTML Injection

Template Injection

Never directly render untrusted HTML.

---

# SQL Injection Prevention

Never concatenate user input into queries.

Always use

Parameterized queries

Prepared statements

ORM query builders

Database abstractions

Never construct SQL through string concatenation.

---

# Cross-Site Request Forgery

Protect state-changing requests.

Use

CSRF protection

SameSite cookies

Origin validation

Anti-CSRF tokens

Security should remain invisible to legitimate users.

---

# Cross-Origin Resource Sharing

Configure CORS intentionally.

Allow only trusted origins.

Restrict

Methods

Headers

Credentials

Origins

Avoid wildcard policies unless absolutely necessary.

---

# Secure Headers

Configure security headers consistently.

Examples

Content Security Policy

Strict Transport Security

X-Frame-Options

X-Content-Type-Options

Referrer Policy

Permissions Policy

Security headers provide additional protection with minimal complexity.

---

# File Security

Treat every uploaded file as hostile.

Validate

Extension

MIME type

File size

Content

Filename

Storage location

Generate safe filenames.

Store uploads outside executable directories.

Never execute uploaded content.

---

# Secrets Management

Secrets belong outside source code.

Examples

Database credentials

API keys

JWT secrets

Encryption keys

OAuth credentials

Certificates

Secrets must never appear in

Repositories

Logs

Frontend bundles

Screenshots

Documentation

Use secure secret management systems.

---

# Environment Configuration

Environment variables should configure applications.

They should never contain business logic.

Separate

Development

Testing

Staging

Production

Configurations.

Never share production secrets.

---

# Logging Security

Logs should help diagnose issues.

They should never leak sensitive information.

Never log

Passwords

Tokens

Cookies

Credit card numbers

Personal identifiers unless required

Encryption keys

Authentication headers

Mask sensitive information whenever possible.

---

# Privacy

Collect only the data required.

Store only the data required.

Retain data only as long as necessary.

Delete unused data.

Respect user privacy.

Privacy is part of security.

---

# Rate Limiting

Protect expensive operations.

Examples

Authentication

Password reset

Registration

OTP verification

Search

File uploads

Public APIs

Rate limits should degrade gracefully.

---

# Abuse Prevention

Design systems assuming malicious actors exist.

Mitigate

Spam

Bot traffic

Credential stuffing

Brute force attacks

Enumeration attacks

API abuse

Scraping

Protect infrastructure before abuse becomes visible.

---

# Dependency Security

Every dependency increases attack surface.

Before installing a dependency ask

Can existing libraries solve this?

Can native platform features solve this?

Is the dependency actively maintained?

Does it introduce unnecessary risk?

Remove unused dependencies immediately.

Keep dependencies updated.

---

# Secure Defaults

Applications should be secure without configuration.

Security should never depend upon users remembering optional settings.

Choose secure defaults.

Require deliberate action to reduce security.

---

# Error Handling Security

Errors should help developers.

Not attackers.

Never expose

Internal paths

Database names

Framework internals

Server configuration

Stack traces

Third-party secrets

Users should receive clear but safe error messages.

---

# Auditability

Critical actions should be traceable.

Examples

Authentication

Permission changes

Payments

Account deletion

Administrative actions

Configuration updates

Audit logs should be immutable whenever possible.

---

# Availability

Security also includes availability.

Protect against

Resource exhaustion

Denial-of-service attacks

Infinite loops

Unbounded recursion

Excessive memory usage

Excessive database queries

Graceful degradation is preferable to complete failure.

---

# Reliability Engineering

Reliable software behaves predictably under stress.

Systems should continue functioning despite

Network interruptions

Database latency

Cache failures

Service outages

Partial infrastructure failures

Never assume perfect infrastructure.

---

# Failure Handling

Every external dependency should be assumed unreliable.

Implement

Timeouts

Retries

Exponential backoff

Circuit breakers

Fallback behavior

Graceful degradation

Avoid cascading failures.

---

# Monitoring

Every production service should expose operational health.

Monitor

Latency

Availability

CPU

Memory

Disk

Database performance

Queue health

API failures

Cache hit rate

Authentication failures

Monitoring should identify problems before users report them.

---

# Alerting

Alert only when action is required.

Avoid alert fatigue.

Critical alerts should be

Actionable

Specific

Timely

Avoid noisy monitoring.

---

# Backups

Backups are mandatory.

Backups should be

Automated

Encrypted

Versioned

Regularly tested

A backup that cannot be restored is not a backup.

Regularly verify restoration procedures.

---

# Disaster Recovery

Prepare for catastrophic failures.

Document

Recovery procedures

Infrastructure dependencies

Recovery priorities

Recovery objectives

Critical services

Recovery plans should be rehearsed.

Never assume documentation alone is sufficient.

---

# Scalability

Optimize architecture before optimizing implementation.

Horizontal scaling should be preferred whenever practical.

Avoid architectures requiring complete rewrites as demand increases.

Design systems capable of supporting

More users

More traffic

More data

More developers

More services

Growth should extend architecture.

Not replace it.

---

# Performance Engineering

Performance is a feature.

Users perceive responsiveness immediately.

Measure

API latency

Database latency

Rendering performance

Memory usage

Network utilization

CPU utilization

Optimize based on evidence.

Never optimize assumptions.

---

# Observability

Every production system should answer

What happened?

Why did it happen?

Where did it happen?

How often does it happen?

What changed?

Good observability dramatically reduces debugging time.

---

# Operational Excellence

Production systems should remain understandable.

Deployment should be repeatable.

Configuration should be predictable.

Infrastructure should be documented.

Maintenance should become easier over time.

Complexity should continuously decrease.

---

# Security & Reliability Review Checklist

Before deploying any feature verify

✓ Authentication implemented.

✓ Authorization enforced.

✓ Validation complete.

✓ Input sanitized.

✓ Output encoded.

✓ Secrets protected.

✓ Logs contain no sensitive data.

✓ Monitoring configured.

✓ Alerts configured.

✓ Rate limiting applied.

✓ Error handling reviewed.

✓ Dependencies reviewed.

✓ Performance measured.

✓ Backups verified.

✓ Recovery plan documented.

✓ Security review completed.

Every deployment should increase the overall security, resilience, and operational maturity of the system.
---

# Testing Standards

Testing is a fundamental engineering practice.

It exists to increase confidence in change.

Tests should verify behavior.

Not implementation details.

A reliable test suite allows engineers to refactor confidently.

Every feature should be designed with testability in mind.

Testing is not an activity performed after development.

It is part of development.

---

# Testing Philosophy

The objective of testing is not to achieve high coverage percentages.

The objective is to reduce production defects.

A smaller collection of meaningful tests is more valuable than thousands of brittle tests.

Write tests that would detect real regressions.

Avoid writing tests merely to satisfy coverage metrics.

---

# Testing Pyramid

Prioritize testing in the following order.

Unit Tests

↓

Integration Tests

↓

End-to-End Tests

Most tests should exist at the lower levels.

Fewer tests should exist at higher levels due to increased execution time and maintenance cost.

---

# Unit Testing

Unit tests verify individual units of logic.

Examples

Utility functions

Business rules

Calculations

Validation

Permission logic

Data transformations

Unit tests should

Run quickly.

Remain deterministic.

Avoid external dependencies.

Never require network access.

Never depend on databases unless specifically testing database logic.

---

# Integration Testing

Integration tests verify collaboration between multiple modules.

Examples

API + Database

Authentication + Authorization

Services + Queues

Controllers + Business Logic

Integration tests ensure independently tested units work correctly together.

---

# End-to-End Testing

End-to-End tests verify complete user workflows.

Examples

User Registration

Authentication

Checkout

Subscription

Project Creation

Password Reset

Only critical business journeys require end-to-end testing.

Avoid excessive E2E tests.

They are slower and more fragile.

---

# Test Independence

Every test should execute independently.

Tests should never depend upon

Execution order

Shared mutable state

Previous test execution

External services

Running one test should never influence another.

---

# Test Naming

Names should describe expected behavior.

Good

should_create_project_when_input_is_valid

Good

should_prevent_duplicate_email_registration

Bad

test1

Bad

apiTest

The test name should explain the business behavior.

---

# Arrange Act Assert

Structure tests consistently.

Arrange

Prepare inputs.

↓

Act

Execute behavior.

↓

Assert

Verify results.

Maintain this structure throughout the project.

---

# Mocking

Mock only external dependencies.

Examples

Email services

Payment gateways

Cloud storage

Third-party APIs

Avoid mocking internal business logic.

Excessive mocking reduces confidence.

---

# Snapshot Testing

Snapshot tests should be used sparingly.

Prefer explicit assertions.

Snapshots should verify stable UI structures.

Avoid accepting snapshot updates without review.

---

# Performance Testing

Critical systems should undergo performance testing.

Measure

Latency

Throughput

Concurrency

Memory usage

CPU utilization

Database performance

Performance should be measured continuously.

Not assumed.

---

# Load Testing

Simulate realistic production traffic.

Identify

Bottlenecks

Resource exhaustion

Scaling limits

Slow queries

Queue congestion

Load testing should occur before production incidents reveal bottlenecks.

---

# Security Testing

Security should be verified.

Examples

Authentication bypass

Authorization failures

Injection attacks

File uploads

Input validation

Rate limiting

Security testing should become part of continuous integration whenever possible.

---

# Regression Testing

Every bug fixed should receive a regression test whenever practical.

The same bug should never appear twice.

Each production incident should strengthen the test suite.

---

# Test Data

Use realistic data.

Avoid meaningless placeholder values.

Good test data improves readability.

Clearly distinguish

Valid

Invalid

Boundary

Edge

Unexpected

Inputs.

---

# Code Coverage

Coverage is an indicator.

Not a goal.

High coverage does not guarantee quality.

Low coverage does not guarantee poor quality.

Prioritize meaningful behavior verification.

---

# Continuous Integration

Every change should pass automated validation before merging.

CI should execute

Formatting

Linting

Static analysis

Type checking

Unit tests

Integration tests

Security scans

Build verification

Deployment should never be the first compilation of the project.

---

# Continuous Delivery

Deployment pipelines should be

Repeatable

Predictable

Versioned

Automated

Rollback capable

Every deployment should be reversible.

---

# Git Workflow

Version control documents project history.

Commits should remain focused.

One logical change per commit.

Avoid unrelated modifications.

Commit messages should explain intent.

Not implementation.

Good

Add role-based authorization middleware

Good

Refactor invoice calculation service

Bad

Updates

Bad

Fix stuff

---

# Branching Strategy

Use descriptive branch names.

Examples

feature/user-notifications

fix/payment-timeout

refactor/api-validation

Avoid

new

temp

latest

branch1

---

# Pull Requests

Every Pull Request should

Solve one logical problem.

Remain reasonably sized.

Include context.

Explain decisions.

Document tradeoffs.

Large pull requests reduce review quality.

Prefer smaller incremental improvements.

---

# Code Review Standards

Every review should evaluate

Correctness

Security

Readability

Maintainability

Architecture

Accessibility

Performance

Documentation

Consistency

Testing

Reviews improve code.

Not people.

Critique code respectfully.

Provide constructive alternatives.

---

# Refactoring

Refactoring should continuously improve the project.

Refactoring should

Reduce duplication.

Improve naming.

Simplify architecture.

Increase readability.

Improve testability.

Reduce complexity.

Never refactor without maintaining existing behavior.

---

# Documentation

Documentation explains intent.

Code explains implementation.

Document

Architecture

Public APIs

Complex algorithms

Configuration

Deployment

Business rules

Avoid documenting obvious implementation details.

Keep documentation synchronized with code.

---

# Comments

Good code minimizes comments.

Comments should explain

Why

Not

What

Bad

// increment i

Good

// Retry to handle eventual consistency during payment confirmation.

Delete obsolete comments immediately.

Incorrect comments are worse than no comments.

---

# Technical Debt

Technical debt should be tracked intentionally.

Never accumulate hidden debt.

Every shortcut should be

Documented.

Justified.

Scheduled for improvement.

Temporary solutions should not become permanent architecture.

---

# AI Self-Review

Before completing any task, perform a complete internal review.

Review

Architecture

Naming

Readability

Performance

Security

Accessibility

Responsiveness

Error handling

Loading states

Empty states

Business logic

State management

Documentation

Testing

Assume your first implementation can be improved.

Review before presenting final output.

---

# Refactoring Checklist

Before considering implementation complete verify

✓ Duplicate logic removed.

✓ Reusable abstractions extracted.

✓ Naming improved.

✓ Complexity reduced.

✓ Components simplified.

✓ Files organized.

✓ Documentation updated.

✓ Dead code removed.

✓ Unused imports removed.

✓ Unnecessary dependencies removed.

---

# Definition of Done

A task is complete only when all of the following are true.

Functional requirements satisfied.

Architecture remains consistent.

Code follows repository standards.

Accessibility verified.

Responsive layouts verified.

Performance acceptable.

Security reviewed.

Tests updated.

Documentation updated.

No linting errors.

No type errors.

No console warnings.

No duplicated logic.

No dead code.

No placeholder implementations.

No TODO items without justification.

No obvious technical debt introduced.

Code review completed.

Production deployment possible without additional engineering work.

Anything less is work in progress.

---

# Forbidden Practices

The following practices are prohibited unless explicitly justified.

Duplicated business logic.

Duplicated UI.

Copy-paste programming.

Magic numbers.

Magic strings.

Inline secrets.

Disabled lint rules.

Ignoring type errors.

Using "any" without documented justification.

Suppressing compiler warnings.

Premature optimization.

Overengineering.

Deeply nested conditionals.

Deeply nested components.

Components exceeding reasonable complexity.

Business logic inside presentation components.

Database queries inside controllers.

Hardcoded configuration.

Unvalidated input.

Inconsistent error handling.

Skipping loading states.

Skipping empty states.

Skipping accessibility.

Skipping testing.

Skipping documentation.

Introducing unnecessary dependencies.

Breaking existing APIs without versioning.

Ignoring failed tests.

Ignoring failed builds.

Deploying unreviewed code.

Shipping unfinished features behind hidden code paths without feature flags.

Every exception to these rules must be documented and justified.

---

# Production Readiness Checklist

Before any release verify

✓ Requirements fully implemented.

✓ Architecture reviewed.

✓ Design system respected.

✓ Accessibility verified.

✓ Responsive behavior verified.

✓ Browser compatibility verified.

✓ API contracts validated.

✓ Authentication tested.

✓ Authorization tested.

✓ Error handling complete.

✓ Loading states complete.

✓ Empty states complete.

✓ Logging verified.

✓ Monitoring configured.

✓ Alerts configured.

✓ Security reviewed.

✓ Performance measured.

✓ Database migrations validated.

✓ Rollback strategy confirmed.

✓ Documentation updated.

✓ Tests passing.

✓ CI passing.

✓ Code reviewed.

✓ Release notes prepared.

Production readiness is achieved only when every applicable item has been verified.

---

# Continuous Improvement

Engineering is an iterative discipline.

Every feature should leave the codebase in a better state than it was found.

Improve

Naming.

Architecture.

Documentation.

Tests.

Performance.

Accessibility.

Security.

Developer experience.

Never accept "good enough" when a small improvement significantly increases long-term maintainability.

The quality of a codebase is determined not by how quickly it grows, but by how well it continues to evolve.

---

# Final Principle

Every decision should optimize for the engineer who will maintain this code six months from now.

Write software that is easy to understand.

Easy to extend.

Easy to debug.

Easy to test.

Easy to review.

Easy to deploy.

Build systems that future engineers—including future AI agents—will thank you for inheriting.

This document defines the minimum engineering standard for all contributions to this repository.

These standards are expected to evolve as the project matures, but the principles of correctness, simplicity, maintainability, accessibility, security, and thoughtful engineering should remain constant.