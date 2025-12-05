# Design Guidelines: Code Mentor AI Chrome Extension

## Design Approach
**Selected Approach**: Design System (Minimal Dark Theme)  
**Rationale**: Chrome extension popups require efficient, functional design prioritizing usability within constrained space. The utility-focused nature and information density requirements favor a systematic approach.

## Core Design Principles
- **Compact Efficiency**: Every pixel serves a purpose within the 400px width constraint
- **Dark-First Design**: Professional coding environment aesthetic
- **Clarity Over Decoration**: Information hierarchy through typography and spacing, not visual embellishment
- **Instant Recognition**: Problem context must be immediately scannable

---

## Typography

**Font Stack**: `system-ui, -apple-system, 'Segoe UI', sans-serif` (system fonts only)

**Hierarchy**:
- Extension Title: 18px, weight 600, letter-spacing -0.02em
- Problem Title: 16px, weight 600, line-height 1.4
- Section Headers: 14px, weight 600, uppercase, letter-spacing 0.05em
- Body Text: 13px, weight 400, line-height 1.5
- Labels/Metadata: 12px, weight 500
- Difficulty Badges: 11px, weight 600, uppercase, letter-spacing 0.03em

---

## Layout System

**Spacing Primitives**: Use units of 4, 8, 12, 16, 24 (px)
- Component padding: 16px
- Section gaps: 24px
- Element spacing: 8px between related items, 12px between groups
- Input/button height: 36px
- Header height: 56px

**Grid Structure**:
- Fixed width: 400px
- Max popup height: 600px (scrollable)
- Content padding: 16px horizontal

---

## Component Library

### Header
- Full-width dark bar with subtle bottom border
- Extension name left-aligned with small icon (16×16)
- Height: 56px, padding: 16px
- Fixed at top during scroll

### Tab Navigation
- Horizontal pill-style tabs below header
- Active tab: slightly lighter background, no underline
- Inactive tabs: transparent with hover state
- Tab padding: 8px 16px
- Border-radius: 6px

### Problem Context Card
- Compact card displaying current problem
- Site badge (small pill) + Problem Title (truncate if needed)
- Difficulty badge (color-coded: green/yellow/red)
- Layout: Vertical stack with 8px gaps
- Background: slightly lighter than popup base
- Border-radius: 8px
- Padding: 12px

### Textarea (User Notes)
- Full-width with subtle border
- Min-height: 80px
- Padding: 12px
- Border-radius: 6px
- Monospace font: `'SF Mono', 'Monaco', 'Consolas', monospace` at 13px
- Resize: vertical only

### Buttons
- Primary button: Full-width, 36px height
- Border-radius: 6px
- Font: 13px, weight 600
- Padding: 0 16px
- Disabled state: reduced opacity (0.5), cursor not-allowed

### Chat-Style Hint Display
- AI response container with distinct background
- Border-left accent (3px solid)
- Padding: 12px
- Border-radius: 6px
- Font: 13px, line-height 1.6
- Max-height: 300px, scrollable

### Loading Indicator
- Simple text "Thinking..." with animated ellipsis
- Positioned inline where hint appears
- Font-size: 13px, subtle text treatment

### Error Messages
- Small banner with light error background
- Icon + message inline
- Padding: 8px 12px
- Border-radius: 4px
- Font-size: 12px

### Analytics Table
- Simple rows with label + value
- Alternating subtle background for rows
- Padding: 8px 12px per row
- Border-radius: 4px for table container
- Recent problems: Compact list with site icon + problemId + difficulty badge

### Empty State
- Centered within tab content area
- Icon (48×48) above message
- Message: 14px, center-aligned
- Muted text treatment
- Vertical padding: 48px

---

## Visual Treatment

**Dark Theme Specifications**:
- Base popup background: Very dark gray (#1a1a1a or similar)
- Card/elevated backgrounds: Slightly lighter (#252525)
- Borders: Subtle gray (#333333)
- Text primary: Near-white (#e0e0e0)
- Text secondary: Medium gray (#999999)
- Accent for focus/active states: Use subtle blue or purple hint
- Difficulty badges: Green (#22c55e), Yellow (#eab308), Red (#ef4444)

**Interactive States**:
- Buttons: Subtle brightness increase on hover, slight scale down on active (0.98)
- Tabs: Background lightens on hover, more prominent on active
- Inputs: Border color change on focus

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for all text
- Focus indicators: 2px outline on all interactive elements
- Tab navigation fully keyboard accessible
- Error messages include icon for non-color distinction
- All buttons maintain 36px minimum touch target

---

## Content Strategy

**Hints Tab**:
1. Problem context card (always visible if available)
2. User notes textarea with label
3. "Ask for hint" button
4. AI response area (appears below button after request)

**Analytics Tab**:
1. Total hints summary (large number with label)
2. Difficulty breakdown table (3-4 rows)
3. Recent problems section (last 5, scrollable list)

**Navigation**:
- Tab switching preserves scroll position
- Empty states provide clear next action

---

## Animations

**Minimal Motion**:
- Tab transitions: Fade content (150ms ease-out)
- Button press: Scale transform (100ms)
- Loading state: Pulsing opacity on "Thinking..." text
- Avoid complex animations for performance within extension context

---

This compact design prioritizes scanning speed, functional clarity, and professional aesthetics suitable for developers in their coding workflow.