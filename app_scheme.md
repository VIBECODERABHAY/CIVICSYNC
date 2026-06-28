# CivicSync Mobile App Design Scheme

This document serves as the master UI/UX scheme for the CivicSync mobile application. It defines the exact colors, typography, spacing, and component guidelines needed to build out the full app with a consistent, premium "Public Service / Corporate Modern" aesthetic.

## 1. Brand & Aesthetic Philosophy
The design system is engineered to project absolute authority, reliability, and institutional trust. 
- **Style:** Corporate / Modern with structured information density.
- **Emotion:** Stability, civic duty, permanent, secure.
- **Avoid:** Glassmorphism, neomorphism, heavy transparency, trendy gradients.

---

## 2. Color Palette
The palette is rooted in 'Government Blue' for professional credibility, with subtle Saffron and Green accents for status indicators.

### Surface & Background
- **Background / Surface:** `#f9f9f9` (App canvas)
- **Surface Container Lowest (Cards):** `#ffffff` (Main card backgrounds)
- **Surface Container Low:** `#f3f3f3` (Hover states / Subtle backgrounds)
- **Outline (Borders):** `#767683`
- **Outline Variant (Subtle Borders):** `#c6c5d4`

### Text & Icons
- **On-Surface (Primary Text):** `#1a1c1c` (Headers, main body)
- **On-Surface-Variant (Secondary Text/Icons):** `#454652` (Subtitles, labels, inactive icons)

### Primary (Brand)
- **Primary:** `#000666` (Main buttons, active tabs, strong emphasis)
- **On-Primary:** `#ffffff` (Text on primary buttons)
- **Primary Container:** `#1a237e` (Secondary interactive elements)
- **On-Primary-Container:** `#8690ee` (Text inside primary containers)

### Secondary & Status Colors
- **Secondary (Warning/Pending):** `#8f4e00`
- **Secondary Container (Saffron Accent):** `#fe9832`
- **Error (Destructive/Failed):** `#ba1a1a`
- **Error Container (Light Red):** `#ffdad6`
- **Success/Resolved (Green):** `#2e7d32`
- **Success Container (Light Green):** `#e8f5e9`

---

## 3. Typography
All text utilizes the **Inter** font family for high legibility across screens.

| Role | Font Weight | Font Size | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Headline Large** | 700 (Bold) | 32px | 40px | -0.02em | Main Page Titles |
| **Headline Medium**| 600 (SemiBold)| 20px | 28px | Normal | Card Titles, Section Headers |
| **Body Large** | 400 (Regular) | 16px | 24px | Normal | Standard Paragraphs |
| **Body Medium** | 400 (Regular) | 14px | 20px | Normal | Secondary Text, Descriptions |
| **Label Large** | 600 (SemiBold)| 14px | 20px | 0.01em | Buttons, Form Labels, Tabs |
| **Label Small** | 500 (Medium) | 12px | 16px | 0.04em | Metadata, Timestamps, Overlays |

---

## 4. Spacing, Layout & Shapes

### Grid & Spacing
The layout follows a strict **8px grid system**.
- **Base (Icons/Elements):** 8px
- **Gutter/Stack Medium (Spacing between related items):** 16px
- **Screen Margins (Left/Right edge padding):** 24px (Mobile) 
- **Stack Large (Section separation):** 32px

### Border Radius (Shapes)
The shape language is **Soft** to balance formal structure with modern accessibility.
- **Small (Inputs, Buttons, Tags):** 8px (`borderRadius: 8`)
- **Medium (Cards, Modals, Dialogs):** 12px - 16px (`borderRadius: 12`)
- **Full (Avatars, FABs):** 9999px (`borderRadius: 9999` or width/2)

### Elevation & Shadows
- **Level 0:** Background canvas, flat.
- **Level 1 (Cards):** 1px border (`#c6c5d4`), no shadow OR very subtle shadow (`opacity: 0.05`, `radius: 4`, `offset: 0, 2`).
- **Level 2 (Floating Action Buttons, Modals):** Stronger drop shadow (`opacity: 0.15`, `radius: 8`, `offset: 0, 4`).

---

## 5. Component Specifications

### 1. Buttons
- **Primary Button:** Solid background (`#000666`), white text. Height: 48px min. Border radius: 8px.
- **Secondary Button:** Transparent background, 1px border (`#000666`), text (`#000666`).
- **Danger Button:** Solid background (`#ffdad6`), text (`#ba1a1a`). 1px border (`#ffb4ab`).

### 2. Input Fields & Forms
- **Style:** Outlined.
- **Background:** `#f9f9f9` (Surface Bright).
- **Border:** 1px solid `#767683` (Outline). 
- **Focus State:** Border thickens to 2px and changes to `#000666` (Primary).
- **Label:** Placed *above* the input field using Label Large (`#1a1c1c`).
- **Padding:** 16px horizontal, 12px vertical.
- **Error State:** Border becomes 2px `#ba1a1a`, with red helper text below.

### 3. Cards (Reports, Dashboards)
- **Container:** `#ffffff` background, 12px border radius.
- **Border:** 1px solid `#c6c5d4`.
- **Padding:** 16px to 24px internal padding.
- **Structure:** 
  - Top Left: Status Chip. Top Right: Date.
  - Middle: Headline Medium Title + Body Medium Description (Line-clamp: 2).
  - Bottom: Action row or Chevron right icon (`#767683`).

### 4. Status Chips (Badges)
Used to indicate the state of a report.
- **Pending:** Background `#ffdad6` (or Saffron `#fe9832`), Text `#8f4e00`.
- **In Progress:** Background `#e0e0ff`, Text `#000666`.
- **Resolved:** Background `#e8f5e9`, Text `#2e7d32`.
- **Padding:** 4px vertical, 12px horizontal. Border radius: 16px. Font: Label Small, bold.

### 5. Bottom Navigation
- **Height:** 64px.
- **Background:** `#ffffff`, top border 1px `#c6c5d4`.
- **Active State:** Icon and text use Primary (`#000666`). Icon may sit inside a pill-shaped indicator (`#e0e0ff`).
- **Inactive State:** Icon and text use On-Surface-Variant (`#454652`).

### 6. Map UI Elements
- **Floating Action Button (FAB):** Bottom right (above nav), 56x56px or pill shaped with text. Primary background (`#000666`).
- **Map Pins (Markers):** Color coded to status. Red (Warning), Blue (Info), Green (Resolved). Pin has a 2px white border for contrast against the map.
