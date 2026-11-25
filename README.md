# Cone & Co. — Ice Cream & Dessert Parlour HTML Template

A responsive, multipage HTML template for an American-style ice cream and dessert parlour brand.

## Pages

- `index.html` — signature dessert experience
- `index-2.html` — dark "Midnight Parlour" homepage (centred hero, flavour ticker, swipeable flavour rail, bento grid, process, reviews, social strip, newsletter). Styles: `assets/css/home-three.css`
- `menu.html` and `menu-details.html`
- `about.html`, `offers.html`, `party-orders.html`, `gallery.html`, `contact.html`
- `blog.html`, `blog-details.html`, `pricing.html`
- `login.html`, `register.html`, `404.html`, `coming-soon.html`

## Stack

HTML5, CSS3, JavaScript ES6+, Bootstrap 5.3 CDN, Lucide icons CDN, Google Fonts (Playfair Display and Inter).

## Run locally

Open `index.html`, or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Brand system

- Strawberry Pink `#E85D75`
- Dark Chocolate `#43251F`
- Vanilla Cream `#FFF3E2`
- Playfair Display + Inter

## Configuration

Update `assets/js/config.js` for your business name, phone, email, and WhatsApp destination. Edit products in `assets/js/menu-data.js`. Business details, prices, sample testimonials and story content are editable in the HTML pages.

## Important integration notes

Forms validate in the browser but do not submit to a server. Login and registration require an authentication provider. Connect an email/form backend before collecting enquiries. Replace the sample Unsplash URLs with properly licensed local images before commercial marketplace distribution. External CDNs and Google Fonts require an internet connection.

See `documentation/documentation.html` for customisation details.

## Shared layout and motion system

The project uses the alignment and responsive architecture from the supplied Home-Cleaning-Housekeeping-Service reference, translated to the Cone & Co. visual identity. The reference's cleaning brand colours, typefaces, page content, and dashboard modules are not imported.

### Stylesheets (loaded in this order)

1. `assets/css/style.css` — Cone & Co. core palette, typography, page layouts, and brand components.
2. `assets/css/components.css` — shared alignment rules, button/icon baselines, equal-height card mechanics, image frames, form rows, and table alignment.
3. `assets/css/dark-mode.css` — dark theme palette mapping.
4. `assets/css/rtl.css` — mirrored layout positioning, without translating page copy.
5. `assets/css/responsive.css` — 30px desktop/tablet gutters, 16px mobile gutters, responsive grids, and overflow guards.
6. `assets/css/motion.css` — scroll reveals, header motion, subtle hover lifts, image zoom, and reduced-motion handling.

### JavaScript controllers

- `assets/js/theme.js` — light/dark theme preference and operating-system fallback.
- `assets/js/rtl.js` — RTL/LTR layout preference.
- `assets/js/main.js` — navigation, shared controls, testimonials, countdown, and back-to-top.
- `assets/js/motion.js` — scroll progress, smart header, hero entrance, and staggered reveals.
- `assets/js/menu.js`, `gallery.js`, and `forms.js` — page-specific interactions.

There is no dashboard in this customer-facing dessert template, so the reference's `dashboard.css` and admin/customer dashboard scripts are intentionally not included.


## Typography and dark-mode audit update

The final stylesheet `assets/css/typography-contrast.css` is loaded after the theme, responsive and motion styles on all public pages. It normalizes paragraph and navigation text to a readable scale and applies explicit dark-mode contrast rules to promotional panels, labels, buttons and form controls. See `TYPOGRAPHY-DARKMODE-AUDIT.md` for the findings and validation scope.

## Mobile and tablet alignment update

The responsive layout was reworked against the supplied reference stylesheet and checked on all 16 pages at 320px, 390px, 640px, 768px, and 1024px viewports. The responsive rules use a 30px page gutter from 640px upward and 16px below 640px. At tablet widths, the desktop navigation changes to the mobile drawer, editorial two-column sections and both homepage heroes stack to one column, and multi-card grids use two columns. On phones, editorial/product/package/blog/form layouts stack cleanly; compact category, menu, and gallery collections remain two columns where their content remains legible. Category filter controls wrap into multiple rows rather than being clipped or requiring horizontal scrolling.

The update also addresses the utility-page body layout, mobile footer link stacking, narrow-screen form fields, touch target sizing, pricing table rows, and page-level horizontal overflow. A static layout check covered 80 page/viewport combinations across the 16 HTML pages. CSS parsing, JavaScript syntax, and local asset-reference checks passed.

## Premium layer (premium.css / premium.js)

- **Banner background paths:** edit the `--banner-image` values at the top of `assets/css/premium.css`. Defaults point to `assets/images/banners/banner-home.svg`, `banner-dark.svg` and `banner-pink.svg`. Drop in your own photo and change the `url()`.
- **Motion:** page curtain, drifting/parallax banners, floating sprinkles, button shine, magnetic buttons, image curtain reveals, animated counters and staggered section reveals. All disabled under `prefers-reduced-motion`.
- **Extra section:** every page has one added `section.xs` (stats, steps, timeline, feature cards or FAQ) built on one shared grid with equal-height cards.
