# Reference Alignment Report — Cone & Co.

## Reference and target
- Reference: `Home-Cleaning-Housekeeping-Service.zip` (inspected from the user’s Library archive).
- Target: `stackly-ice-cream-full.zip` (16 customer-facing HTML pages plus the template documentation page).

## Structural updates applied

1. **CSS architecture:** split shared alignment, RTL layout, and motion behaviour into `components.css`, `rtl.css`, and `motion.css`, retaining `style.css`, `responsive.css`, and `dark-mode.css`.
2. **Global layout:** applied 30px horizontal gutters from 640px upward and 16px below 640px; enforced full-width section bounds, shrink-safe grid/flex children, text wrapping, and horizontal overflow clipping.
3. **Spacing and alignment:** standardized a 4px/8px spacing token scale, section-header rhythm, button dimensions, and icon/text centering.
4. **Cards and imagery:** equal-stretch grids, flex-column card bodies, baseline-aligned card CTAs, 4:5 dessert product frames, 16:10 blog thumbnails, and object-fit cropping.
5. **Tables and forms:** vertically centered table cells, horizontally scrollable table wrappers, and shrink-safe form/footer rows.
6. **Motion:** separate controller for page entrance, scroll progress, smart header, staggered scroll reveals, heading word reveals, hero movement, and card spotlight/tilt. Reduced-motion settings disable the motion effects.
7. **Theme and RTL:** separated theme and direction controllers into `theme.js` and `rtl.js`; both preserve the existing `stackly-theme` and `stackly-dir` localStorage keys.

## Branding preserved

- Strawberry Pink: `#E85D75`
- Dark Chocolate: `#43251F`
- Vanilla Cream: `#FFF3E2`
- Fonts: Playfair Display and Inter
- Dessert copy, imagery references, page architecture, and ordering flows remain target-specific.

## Reference modules intentionally not imported

`dashboard.css`, admin/customer dashboard pages, cleaning-service copy, cleaning-specific cards, Cleanora theme colours, and Manrope typography were not imported. The target brief explicitly excludes a dashboard and requires the dessert brand system to remain intact.

## Validation performed

- JavaScript syntax validation with Node.js across all `.js` files.
- CSS parse validation across all six stylesheets (no parser errors).
- Local `href` / `src` path scan across all HTML pages (no missing local references).
- Updated CSS and script references across all 16 public pages and `documentation/documentation.html`.
- A complete real-browser visual regression pass was not available in this runtime; final review on the intended local browser/Live Server is still recommended.
