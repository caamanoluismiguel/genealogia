# Genealogy App UX Research

**Date:** 2026-04-03
**Scope:** UX patterns, visualization, mobile, sharing, design, and deployment research for Genealogia Caamano

---

## 1. Best Genealogy App UX Patterns

### Ancestry.com

**Navigation:** Ancestry uses a centered-on-selected-person model. The "Family View" shows 3 generations of ancestors and 2 of descendants at once. Clicking any person re-centers the tree on them. Zoom is scroll-wheel with +/- buttons. Pan is click-drag.

**Strengths:**

- "Hint" leaves (green shaking leaf icon) on person cards indicate when the system found matching records -- creates a dopamine loop of discovery
- Record attachment is inline: click a hint, review the source, accept/reject without leaving the tree
- Search bar at top always accessible -- type a name, jump directly to that person
- Breadcrumb trail shows your navigation path through the tree

**Weaknesses:**

- Cannot view entire tree at once -- the interactive web viewer constrains to a viewport window
- Requires account + subscription for most features
- Mobile app is a companion, not a standalone experience
- No "how am I related?" quick answer for non-direct-line relatives

**Actionable for Genealogia Caamano:**

- The "re-center on click" pattern is essential. Your tree already supports this via selection + zoom-to-position. Keep it.
- Ancestry's breadcrumb trail (showing "You > Father > Grandfather > Great-grandfather") would help orientation in a 20-generation tree. Consider a compact breadcrumb in the top bar showing the path from "yo" to the currently selected person.

### MyHeritage

**Navigation:** Offers 5 tree views: Family, Pedigree, Fan, List, and new (March 2026) Country Coding overlay. The Fan chart shows up to 7 generations in a half-circle. Pedigree is the classic horizontal left-to-right. Family view is the default interactive tree.

**Strengths:**

- **Country Coding (March 2026):** Color-codes person cards by country of birth using national flags. In Fan view, this creates a striking visualization of ancestral geographic diversity. This is directly relevant to your 5-country family.
- **PedigreeMap:** Plots all life events (births, marriages, deaths) on an interactive map with a year-range slider and heatmap overlay. Best-in-class migration visualization.
- **Color Coding (2023):** Users assign custom colors to branches (e.g., paternal blue, maternal pink). Works across all tree views.
- **Photo tools:** AI-powered colorization, enhancement, animation of old photos
- **Instant Discoveries:** Automated record matching suggests new ancestors from billions of records + other users' trees

**Weaknesses:**

- Subscription-gated features ($13-30/mo)
- Can feel cluttered with all features visible
- Fan chart becomes unreadable past 7 generations

**Actionable for Genealogia Caamano:**

- **Country coding is the single highest-impact visual feature to adopt.** Your family spans Spain, Colombia, DR, Ecuador, Argentina. Color-code person nodes by birth country (or migration destination). Use small flag icons or colored borders. In a tree of 200+ people, the geographic story becomes instantly visible.
- **Year-range slider on the map** (from PedigreeMap) would let family members scrub through centuries and watch the migration unfold. Your Leaflet map already has the routes -- add temporal filtering.

### FamilySearch

**Navigation:** Offers Landscape (horizontal scroll), Portrait (vertical, 4 generations), Fan Chart (7 generations), and Descendancy views. Landscape is the power-user view: click an arrow at the end of any line to expand 2 more generations. Reset View returns to starting person without collapsing expanded branches.

**Strengths:**

- **Multiple view types** for different use cases (fan for overview, landscape for research, portrait for quick look)
- **Descendancy view** -- shows one ancestor's descendants downward, which is perfect for "show me everyone descended from the Colombian patriarch"
- **Free, no paywall**
- **Virtual Pedigree:** Dynamic expansion algorithm -- tree loads on-demand as you navigate, never loads the whole thing at once

**Weaknesses:**

- Single shared world tree -- anyone can edit your ancestors (vandalism is a real complaint)
- Research-grade UI, not family-friendly
- No personal "identity" or "I am this person" concept

**Actionable for Genealogia Caamano:**

- **Descendancy view is critical.** Your tree has a clear patriarch (Jose Tomas Caamano, p001). Family members visiting via WhatsApp link will want to see "all of Jose Tomas's descendants" as their primary view -- not a pedigree going backward. Consider making descendancy the default view, with pedigree/fan as secondary options.
- **On-demand expansion** (FamilySearch's Virtual Pedigree pattern) is the key to handling 20+ generations. Never render all 200+ nodes at once. Show 3-4 generations from the selected person, with expand/collapse controls on leaf nodes.

### Geni.com

**Navigation:** Collaborative tree with a unique "World Family Tree" concept. Trees from different users automatically merge when overlapping persons are detected. Navigation is click-to-expand, with a profile panel on the right.

**Strengths:**

- **Invitation flow:** When adding a person's profile, you can add their email address directly. They receive a personalized invite: "Luis Miguel has added you to the Caamano family tree." This is the gold standard for family onboarding.
- **Conflict resolution tools:** When two trees merge, Geni provides side-by-side comparison of conflicting data (e.g., two different birth dates) and lets collaborators vote/resolve.
- **Discussion forums per tree** -- family members can discuss, post stories, ask questions.

**Weaknesses:**

- Pro subscription ($13/mo) required for trees over 250 people
- Can feel overwhelming for non-tech users
- Auto-merge sometimes creates wrong connections

**Actionable for Genealogia Caamano:**

- **The invitation pattern is valuable.** Your "yo soy" system is already better for a WhatsApp-first family. But consider a "Send this link to [person's name]" button on each person's card that pre-fills a WhatsApp message: "Hola [Name], mira el arbol genealogico de los Caamano! Tu eres [kinship label]. [URL with ?yo=slug]"
- **Per-person discussions** could be valuable but are overkill for v1. Notes field is sufficient.

### WikiTree

**Strengths:**

- Free, community-maintained, sourced data
- Clean, no-nonsense UI
- Strong focus on data quality (sources required for each fact)

**Weaknesses:**

- Visually plain -- looks like a wiki, not an app
- No mobile optimization
- No personal identity concept

**Actionable:** WikiTree confirms that visual polish matters. A genealogy app that looks beautiful will get shared; one that looks like a wiki will not. Your warm parchment theme is the right call.

---

## 2. Tree Visualization Best Practices

### The "Too Many Nodes" Problem

Your tree has 201 persons across ~20 generations. At full render, this creates performance and readability problems. Here is how the best apps solve this:

### Strategy 1: On-Demand Expansion (Recommended Primary)

**Pattern:** Show 3-4 generations from a focal person. Leaf nodes have a "+" button or arrow to expand further. Collapsing a branch hides all descendants.

**Used by:** FamilySearch (Virtual Pedigree), Ancestry (Family View), Geni

**Implementation notes:**

- Default to showing the "yo soy" person + 2 generations up (parents, grandparents) + 2 generations down (children, grandchildren)
- Each person card at the boundary shows a badge: "+12 descendants" or "+3 ancestors"
- Clicking expands inline with a smooth animation
- "Expand all" option for power users, with a warning if >100 nodes would render

**Why this works for your tree:** A cousin in Barranquilla opens the link, sees themselves, their parents, siblings, and children. They can then expand upward to find the patriarch, or sideways to find other branches. The tree feels navigable, not overwhelming.

### Strategy 2: Semantic Zoom / Level of Detail

**Pattern:** At zoom level 1 (fully zoomed out), show only names. At zoom level 2, add dates. At zoom level 3 (close-up), show full cards with photos, places, and kinship labels.

**Used by:** Google Maps (the canonical example), some Gramps visualization plugins

**Implementation notes:**

- With d3-zoom, check the current zoom scale in the render loop
- Scale < 0.3: render only colored dots (by country or gender) with family name on hover
- Scale 0.3-0.7: render compact cards (name + birth year only)
- Scale > 0.7: render full cards (name, dates, place, photo thumbnail, kinship label)
- Use CSS `will-change: transform` on the SVG group for GPU acceleration

**Why this works for your tree:** Allows the "zoom out to see the whole family" moment that family members love for screenshots, while keeping the tree readable when zoomed in for research.

### Strategy 3: Multiple View Types

| View                                  | Best For                           | Generations Shown           | Layout                              |
| ------------------------------------- | ---------------------------------- | --------------------------- | ----------------------------------- |
| **Descendancy** (recommended default) | "Show me everyone from Jose Tomas" | 4-6 at a time, expandable   | Top-to-bottom or left-to-right      |
| **Pedigree**                          | "Show me my direct ancestors"      | 4-5 up from selected person | Left-to-right classic               |
| **Fan Chart**                         | "Overview of ancestral diversity"  | 5-7 in a half-circle        | Radial, centered on selected person |
| **Timeline**                          | "When did everyone live?"          | All, filtered by date range | Horizontal timeline                 |

**Recommendation:** Implement Descendancy (default) + Pedigree (toggle) for v2. Fan chart is visually impressive but complex to implement with foreignObject in SVG. Timeline view is a future nice-to-have.

### Strategy 4: Branch Collapsing with Visual Hints

**Pattern:** Collapsed branches show a "summary node" -- a single card that says "Familia Martinez-Caamano: 15 personas, 3 generaciones" with a colored bar representing the country distribution.

**Why this works:** When a family member is exploring their own branch, they don't need to see 50 nodes from another branch. But they should know the other branch exists and how big it is.

### Performance Considerations (SVG + d3)

- **SVG DOM limit:** Performance degrades noticeably above ~500 DOM nodes with complex foreignObject cards. At 200 persons, you are safe but should not render all simultaneously.
- **Geometric zoom is faster than semantic zoom:** Apply a single `transform` to the SVG `<g>` container rather than updating each node's position individually. Your current d3-zoom setup likely already does this.
- **Virtual rendering:** Only render nodes whose bounding box intersects the current viewport. At 200 nodes this is optional but becomes necessary at 500+.
- **Canvas fallback:** For a "fully zoomed out" thumbnail/minimap, consider a `<canvas>` render of the entire tree as colored dots. This avoids the SVG DOM cost entirely.

---

## 3. Map Visualization for Migration

### Best-in-Class Examples

**MyHeritage PedigreeMap:** The gold standard. Plots all life events on an interactive map. Key features:

- **Year-range slider** at the bottom (default: full range of all dates in tree)
- **Generations slider** to filter by how many generations back
- **Heatmap mode** showing concentration of family events by region
- **Person filter** -- show events for one individual, their ancestors, descendants, or all

**RootsMapper (FamilySearch extension):** Displays migration paths of multiple generations plotted on an interactive map. Users can watch the journey unfold across generations.

**Family Atlas (RootsMagic):** Desktop software with animated migration routes, clusters, and family member markers.

### Recommendations for Your Leaflet Map

**Current state:** Your map shows Spain-to-Americas routes with color-coded paths (Colombia blue, DR amber, Ecuador green, Argentina purple). This is already good.

**Enhancements to consider:**

1. **Timeline Scrubber (P0)**
   - Add a horizontal slider below the map: 1100 (medieval) to 2026 (present)
   - As the user drags, routes animate in/out based on approximate migration dates
   - At 1800: only the Galician origin point is visible
   - At 1860: the Colombia route appears
   - At 1900: DR, Ecuador, Argentina routes appear
   - At 1960: internal Colombian migrations appear (if you have that data)
   - Use CSS transitions on route opacity for smooth fade-in/out

2. **Animated Route Drawing (P1)**
   - When a route first appears (either on page load or when the slider reaches its date), animate it using SVG `stroke-dashoffset` technique
   - The route "draws" from Spain to the destination over 1-2 seconds
   - Creates a cinematic "our family spread across the Americas" moment

3. **Person Markers at Destinations (P1)**
   - At the end of each route, show small circular markers with the number of family members at that destination
   - Click a marker to see a list of people who migrated there
   - Connects the map back to the tree

4. **Dual-Layer Map: Historical + Modern (P2)**
   - Toggle between a modern map and a historical map overlay (sepia-toned)
   - Historical map tiles are available from: Stamen (Watercolor style) or Thunderforest (vintage)
   - Creates an atmospheric "old world" feeling appropriate for 12th-century content

5. **Galicia Detail Inset (P2)**
   - When viewing the full Americas view, show a small inset map of Galicia zoomed in to Porto do Son / Noia / Muros
   - Shows the specific parishes: Santa Maria de Caamano, Palmeira, Ribeira
   - Connects the macro migration story to the micro origin story

---

## 4. Mobile UX for Genealogy

### The Reality

Your primary distribution channel is WhatsApp links opened on phones. Mobile is not secondary -- it is the primary platform for family discovery.

### Touch Gesture Best Practices

**d3-zoom already handles the basics:**

- Pinch to zoom (two-finger spread/pinch)
- Drag to pan (one-finger swipe)
- Double-tap to zoom in on a specific area

**What needs attention:**

1. **Tap Target Size (44px minimum)**
   - Person cards in the tree must be at least 44x44px at default zoom
   - At very zoomed-out levels, tap targets overlap -- need a "tap to disambiguate" popover when multiple nodes are close together
   - On the map, migration route endpoints need 44px hit areas

2. **Bottom Sheet Instead of Sidebar**
   - On mobile (< 768px), the person detail sidebar should become a bottom sheet (slides up from bottom)
   - 60% height default, drag up for full screen, drag down to dismiss
   - This is the standard pattern for mobile maps (Google Maps, Apple Maps, Uber)
   - The sidebar currently slides in from the right, which on mobile pushes content off-screen or overlaps the tree entirely

3. **Navigation Simplification**
   - Bottom tab bar with 3-4 icons: Tree, Map, Historia, Search
   - Replace the top nav header with a compact hamburger + title on mobile
   - "Yo soy" chip should be persistent but compact (just the person's first name + a small icon)

4. **Gesture Hints on First Visit**
   - On first mobile visit, show a brief animation: two fingers spreading (pinch to zoom) + one finger dragging (swipe to explore)
   - Auto-dismiss after 3 seconds or on first interaction
   - Only show once (localStorage flag)

5. **Offline Capability**
   - For a static-export JSON-backed app, the entire tree can work offline after first load
   - Add a PWA manifest with `offline` support
   - Family members at reunions in areas with poor connectivity (rural Colombia, rural Galicia) can still browse

### Mobile Tree Rendering

- On screens < 768px, default to showing 2 generations (not 3-4) from the focal person
- Person cards should be simplified: name + birth year only (no photo, no kinship label)
- Tap a card to expand its detail in the bottom sheet
- "Zoom to fit" should fit the visible generation set, not the entire tree

---

## 5. Information Density and Progressive Disclosure

### The Problem

A person record can have: full name, maiden name, birth date, birth place, death date, death place, occupation, multiple life events, multiple migrations, photos, notes, kinship label, research links. Showing all of this at once in a tree card is impossible.

### Three-Layer Disclosure Model

**Layer 1: Tree Card (always visible)**

- Name (first + last)
- Birth year - death year (or "vivo" if alive)
- Gender color code (border or icon)
- Country flag or color dot
- Photo thumbnail (if available, else initials avatar)
- Kinship label from "yo soy" (e.g., "tu abuelo")

**Layer 2: Quick Popover (on hover/tap)**

- Full dates with places
- Occupation
- Immediate family count ("3 hijos, 2 hermanos")
- "Ver mas" link to Layer 3

**Layer 3: Full Detail Panel (sidebar/bottom sheet)**

- All personal information
- Life events timeline
- Migration details
- Notes
- Research links (FamilySearch, PARES, CEMLA)
- Inline editing controls
- Source citations

### Design Principle: "The Newspaper"

The best genealogy UX follows newspaper information hierarchy:

- **Headline:** Name + kinship label (immediately answers "who is this person to me?")
- **Subhead:** Dates + places (when and where)
- **Body:** Everything else (expand to read)

### Handling Historical vs. Modern Persons

Your tree has a unique challenge: medieval nobility (Rodrigo Garcia de Caamano, 1100s) alongside modern family (Pablo and Maria Lucia, 2020s). The information density is radically different.

**For historical persons (h001-h021):**

- Cards should have a subtle "historical" visual treatment (sepia tint, different border style, or a small scroll/document icon)
- Notes field is primary content (source citations, lineage claims)
- No photo expected -- use a heraldic or period-appropriate placeholder
- Kinship labels like "tu ancestro (generacion 15)" help orient

**For modern persons (p001-p153):**

- Full detail available
- Photo is the primary visual
- Kinship labels are personal ("tu papa", "tu prima segunda")

**For the gap (gap001):**

- Visual treatment should be distinctly different: dashed border, "?" icon, "Conexion sin verificar" label
- Tapping it should explain what the gap means and link to the research needed to close it

---

## 6. Sharing and Collaboration

### WhatsApp-First Sharing (Your Primary Channel)

Your competitive landscape doc already identifies this correctly: **"The screenshot IS the distribution."**

**Best practices observed:**

1. **OG Card Per Person**
   - URL: `genealogia.caamano.com/person/luis-miguel-caamano?yo=luis-miguel`
   - OG image: 1200x630 card with: person's name, birth year, kinship label relative to sender, family crest, tree silhouette background
   - OG title: "Luis Miguel Caamano -- 5ta generacion"
   - OG description: "Arbol genealogico de la familia Caamano. Desde Galicia, Espana hasta Colombia."
   - When shared on WhatsApp, this renders as a rich preview that makes people tap

2. **Pre-Written WhatsApp Share Text**
   - On each person's card, a "Compartir" button that opens: `whatsapp://send?text=Mira%20el%20arbol%20genealogico%20de%20los%20Caamano!%20Tu%20eres%20[kinship].%20[URL]`
   - Include the kinship label in the share text -- it personalizes the message

3. **Family Root App Pattern**
   - Family Root (emerging 2025-2026 competitor) lets you share tree images directly to WhatsApp, Instagram, Facebook
   - They offer PNG/JPG/PDF download of the tree
   - Your "Export JSON" is for power users. Add "Download tree as image" for family sharing.

4. **Geni's Invitation Pattern (Adapted)**
   - Geni uses email invitations. Adapt for WhatsApp: "Invitar a [person] al arbol" button pre-fills a WhatsApp message with their personalized URL
   - The URL includes `?yo=[their-slug]` so when they open it, they see themselves highlighted in the tree

### Privacy Considerations

- Living persons' details should be redacted for unauthenticated visitors (show name only, hide dates/places)
- Or: since this is a personal family app shared via direct links, rely on URL obscurity. No search engine indexing (robots.txt noindex).
- Geni's pattern: deceased persons are public, living persons require invitation/login

**Recommendation for your app:** Since there is no auth, rely on:

1. `robots.txt` with `Disallow: /` (no search indexing)
2. Shareable URLs are long enough to be unguessable
3. Living persons show full info only when accessed via a valid `?yo=` parameter from someone in the family
4. Without `?yo=`, show a generic "Familia Caamano" landing with the welcome modal

---

## 7. Visual Design Inspiration

### Current Design Trends (2025-2026)

**Warm light mode with accent colors** is the dominant trend for heritage/culture apps. Dark mode exists as a toggle but is not default.

**Typography:**

- Heritage/genealogy apps favor a serif or semi-serif for headings (signals tradition, authority) and a clean sans-serif for body text
- Variable fonts are the standard (fewer HTTP requests, better responsive scaling)
- Recommendation: Keep your current serif headings. Consider a variable font like **Literata** (Google Fonts, designed for long-form reading, has display and text optical sizes) for headings, and **Inter** for body.

**Color Coding (From MyHeritage's March 2026 Update):**

MyHeritage's Country Coding feature uses national flags on person cards. For your app, a simpler approach:

| Country            | Color       | Hex       | Use               |
| ------------------ | ----------- | --------- | ----------------- |
| Spain (Galicia)    | Slate blue  | `#475569` | Historical origin |
| Colombia           | Emerald     | `#10B981` | Primary branch    |
| Dominican Republic | Amber       | `#F59E0B` | Caribbean branch  |
| Ecuador            | Sky blue    | `#0EA5E9` | Pacific branch    |
| Argentina          | Purple      | `#8B5CF6` | Southern branch   |
| Unknown/Gap        | Dashed gray | `#94A3B8` | Research needed   |

Apply as: left border on person cards, route color on migration map, ring color on fan chart.

**Design Elements for Premium Feel:**

1. **Subtle paper texture background** (not heavy -- a 5-10% opacity noise pattern on warm white)
2. **Drop shadows on person cards** (soft, not hard-edged)
3. **Gold accents** for the family crest and medieval persons
4. **Smooth animations** on tree navigation (d3-zoom already handles this, but add entry animations for person cards appearing)
5. **Consistent border radius** (8px for cards, 4px for badges)

**Design Anti-Patterns to Avoid:**

- No glassmorphism (trendy but reduces readability for older family members)
- No dark mode default (older family members have difficulty with dark themes)
- No tiny text (minimum 14px body, 12px for metadata only)
- No low-contrast text (WCAG AA minimum, which you already comply with)

### Design References

- [Behance: Family Tree App UI projects](https://www.behance.net/search/projects/family%20tree%20app%20ui)
- [Dribbble: Family Tree designs (200+ examples)](https://dribbble.com/tags/family-tree)
- [Dribbble: Genealogy designs (63 examples)](https://dribbble.com/tags/genealogy)
- [Treemily Case Study](https://www.visual-craft.com/case-studies/treemily/) -- genealogy + art fusion, artistic elegance with intuitive design
- [FamTree UX Case Study (Figma Community)](https://www.figma.com/community/file/1221130545200803501/famtree-ux-case-study-template-community)

---

## 8. Progressive Disclosure for Complexity

### The Challenge

Your tree spans from a 12th-century knight (Rodrigo Garcia de Caamano, conquest of Baeza) to a toddler (Maria Lucia, born 2020s). It has verified genealogical records, unverified noble lineage claims, emigrant ship manifests, and a 300-year gap. A cousin in Barranquilla and a genealogy researcher in Santiago need completely different experiences.

### Recommended Disclosure Layers

**Layer 1: Family Story (Default for WhatsApp visitors)**

- "Yo soy" welcome modal
- Descendancy tree from the Colombian patriarch (Jose Tomas, p001) -- 4-6 generations
- Country-coded nodes
- Kinship labels ("tu prima", "tu tio abuelo")
- Migration map with animated routes
- "Compartir" buttons everywhere

**Layer 2: Extended Tree (For curious family members)**

- Toggle to expand medieval/historical branch
- Fan chart view (overview)
- Person detail sidebar with full dates, places, occupations
- Photo gallery (when available)
- "Yo soy" path finder (compare any two people)

**Layer 3: Research Layer (For genealogy enthusiasts)**

- Research dashboard with FamilySearch, PARES, CEMLA deep links
- Historia page with surname etymology, heraldry, INE distribution
- Gap markers with explanations of what evidence is needed
- Source citations on each fact
- GEDCOM export (future)
- Research notes per person

### Navigation Between Layers

- Default landing (via WhatsApp link) = Layer 1
- "Ver mas" / "Explorar" links throughout Layer 1 progressively reveal Layer 2
- "Investigacion" tab in nav reveals Layer 3
- Layer switching should never require a page reload

### Visual Differentiation

| Element      | Layer 1 (Family)      | Layer 2 (Extended)         | Layer 3 (Research)                     |
| ------------ | --------------------- | -------------------------- | -------------------------------------- |
| Person cards | Name + year + kinship | + full dates/places/photo  | + sources + research links             |
| Tree scope   | p001 descendants      | Full modern + historical   | + gap markers + CEMLA/Geneanet persons |
| Map          | Animated routes       | + person markers + heatmap | + historical map overlay               |
| Sidebar      | Quick info            | Full edit                  | + FamilySearch/PARES links             |

---

## 9. GitHub Pages Deployment

### Key Considerations for Next.js Static Export

**Required Configuration:**

1. **`next.config.ts`:**

   ```
   output: 'export'
   basePath: '/<repo-name>'   (if NOT using custom domain)
   images: { unoptimized: true }
   ```

2. **`.nojekyll` file in `/public`:** Prevents GitHub Pages from running Jekyll processing, which breaks files starting with `_` (like `_next/`).

3. **GitHub Actions workflow:** Automate build + deploy. The official template exists at `github.com/nextjs/deploy-github-pages`.

### Limitations That Affect Your App

| Feature                     | Impact                                                        | Workaround                                                                                              |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| No Server Components        | SSR-dependent data loading won't work                         | Your JSON is imported statically -- no impact                                                           |
| No API routes               | `/api/*` routes won't work                                    | Your research dashboard links are external -- no impact. If you add GEDCOM export, make it client-side. |
| No ISR/SSR                  | Pages are fully static                                        | Perfect for your use case                                                                               |
| Image optimization disabled | `next/image` won't optimize/resize                            | Use pre-optimized images. Photo thumbnails should be pre-sized.                                         |
| Base path prefix            | All internal links need the base path                         | Next.js handles this automatically with `basePath` config                                               |
| No middleware               | Edge middleware won't run                                     | Your `?yo=` system is client-side (localStorage) -- no impact                                           |
| Leaflet dynamic import      | `next/dynamic` with `ssr: false` still works in static export | Already handled in your `migration-map.tsx` wrapper                                                     |

### Custom Domain Option

If you use a custom domain (e.g., `genealogia.caamano.com` or `caamano.family`):

- No `basePath` needed
- Add a `CNAME` file in `/public` with the domain
- Configure DNS (CNAME to `<username>.github.io`)
- GitHub Pages provides free SSL

**Recommendation:** Use a custom domain. `caamano.family` or `arbol.caamano.co` are more shareable via WhatsApp than `luismiguelcaamano.github.io/genealogia`. The `.family` TLD exists and is designed for this use case.

### Build Size and Performance

- Your JSON data file is the biggest asset. At 200 persons with full records, expect ~50-100KB uncompressed, ~15-30KB gzipped. GitHub Pages serves gzipped automatically.
- Leaflet CSS/JS + tiles load from CDN, not from your bundle.
- Total static export should be under 2MB excluding node_modules.
- GitHub Pages has no bandwidth limit for public repos but rate-limits at ~100GB/month (not a concern for family sharing).

### PWA for Offline Access

Since GitHub Pages serves static files, you can add a service worker for offline capability:

- Cache the JSON data + all static assets on first visit
- Family members at reunions with poor connectivity can browse the tree offline
- Use `next-pwa` or a simple hand-rolled service worker

---

## 10. Actionable Summary: Priority Recommendations

### P0 -- High Impact, Immediate

| Recommendation                                                 | Source                                              | Effort                                                                 |
| -------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **Country color coding on person cards**                       | MyHeritage Country Coding 2026                      | Low -- add colored left border based on `birthPlace` country detection |
| **On-demand tree expansion** (3-4 gen default, "+" to expand)  | FamilySearch Virtual Pedigree, Ancestry Family View | Medium -- refactor layout.ts to compute visible subset                 |
| **Bottom sheet on mobile** (replace sidebar)                   | Google Maps pattern, mobile UX research             | Medium -- conditional rendering based on viewport                      |
| **Semantic zoom** (dots at far zoom, full cards at close zoom) | d3 best practices, Google Maps                      | Medium -- check zoom scale in render, swap card templates              |
| **OG cards per person** for WhatsApp sharing                   | Family Root App, competitive analysis               | Medium -- `@vercel/og` or static generation                            |

### P1 -- High Impact, More Effort

| Recommendation                                           | Source                        | Effort                                                  |
| -------------------------------------------------------- | ----------------------------- | ------------------------------------------------------- |
| **Timeline scrubber on migration map**                   | MyHeritage PedigreeMap        | Medium -- filter routes by date range, slider component |
| **Descendancy view as default**                          | FamilySearch Descendancy View | Medium -- new layout mode in layout.ts                  |
| **Animated route drawing on map**                        | RootsMapper, Family Atlas     | Low -- SVG stroke-dashoffset CSS animation              |
| **Breadcrumb trail** (path from "yo" to selected person) | Ancestry navigation           | Low -- derive from kinship path                         |
| **Pre-written WhatsApp share per person**                | Geni invitation pattern       | Low -- `whatsapp://send` URL with kinship text          |

### P2 -- Nice to Have, Future

| Recommendation                                   | Source                       | Effort                                               |
| ------------------------------------------------ | ---------------------------- | ---------------------------------------------------- |
| **Fan chart view**                               | FamilySearch, MyHeritage     | High -- radial SVG layout                            |
| **Historical map overlay** (sepia/vintage tiles) | Stamen Watercolor            | Low -- Leaflet tile layer swap                       |
| **Download tree as image**                       | Family Root App              | Medium -- SVG to PNG conversion                      |
| **PWA offline support**                          | Mobile UX research           | Low -- service worker + manifest                     |
| **Gesture hints on first mobile visit**          | Mobile UX best practice      | Low -- animated overlay + localStorage flag          |
| **Branch summary cards** (collapsed branches)    | Information density research | Medium -- aggregate statistics per collapsed subtree |
| **Galicia detail inset map**                     | Migration research           | Medium -- Leaflet MiniMap plugin                     |

---

## Sources

- [Norwegian Genealogy -- Best Genealogy Software 2025 Comparison](https://martinroe.com/blog/best-genealogy-software-in-2025-a-practical-comparison/)
- [DNA Weekly -- 7 Best Genealogy Software 2026](https://www.dnaweekly.com/best-test/family-tree/)
- [Genealogy Gems -- Comparison of Top Genealogy Websites](https://lisalouisecooke.com/2025/03/18/compary-genealogy-websites/)
- [FamilySearch -- Fan Chart Help](https://www.familysearch.org/en/help/helpcenter/article/how-do-i-use-the-fan-chart-view-in-family-tree)
- [FamilySearch -- Different Pedigree Views](https://www.familysearch.org/en/help/helpcenter/article/what-are-the-different-pedigree-views-in-family-tree)
- [FamilySearch -- Landscape View](https://www.familysearch.org/en/help/helpcenter/article/what-does-the-landscape-view-do-in-family-tree)
- [FamilySearch -- Different Tree Views Provide Perspective](https://www.familysearch.org/en/blog/family-tree-views)
- [Ancestry -- Navigating a Family Tree](https://support.ancestry.com/s/article/Navigating-an-Ancestry-Family-Tree?language=en_US)
- [Ancestry -- Tree Layouts: Horizontal, Vertical, Fan, Map](https://support.ancestry.com/s/article/Vertical-and-Horizontal-Tree-Displays?language=en_US)
- [MyHeritage -- Introducing PedigreeMap](https://blog.myheritage.com/2016/07/introducing-pedigreemap-an-interactive-map-of-your-family-history/)
- [MyHeritage -- Country Coding for Family Trees (March 2026)](https://blog.myheritage.com/2026/03/introducing-country-coding/)
- [MyHeritage -- Color Coding for Family Trees (2023)](https://blog.myheritage.com/2023/03/introducing-color-coding-for-family-trees/)
- [MyHeritage -- How to Use PedigreeMap](https://education.myheritage.com/article/how-to-use-pedigreemap/)
- [MyHeritage -- Visualizing Ancestors with Genealogy Maps (Feb 2025)](https://blog.myheritage.com/2025/02/genealogy-maps-ancestors/)
- [MyHeritage -- Improved Family Tree on Mobile App (March 2025)](https://blog.myheritage.com/2025/03/new-improved-family-tree-on-the-myheritage-mobile-app/)
- [Geni -- Invite Relatives Tips](https://www.geni.com/blog/geni-tips-invite-relatives-to-your-family-tree-92002.html)
- [Geni -- How to Share Your Tree](https://www.geni.com/blog/geni-tips-how-to-share-your-tree-with-others-87787.html)
- [Geni Help -- How to Invite a Relative](https://help.geni.com/hc/en-us/articles/229702947-How-do-I-invite-a-relative-to-join-the-tree)
- [Family Root App -- Share on WhatsApp & Facebook](https://familyrootapp.com/blog/share-your-family-tree-easily-on-social-media-with-family-root-app)
- [RootsMapper -- Visualize Family Heritage](https://www.familysearch.org/blog/en/visualize-family-heritage-rootsmapper/)
- [Family Atlas -- RootsMagic Mapping Software](https://www.rootsmagic.com/family-atlas)
- [Gramps -- New Visualization Techniques (GEPS 030)](https://www.gramps-project.org/wiki/index.php?title=GEPS_030:_New_Visualization_Techniques)
- [Family History Fanatics -- 6 Unique Chart Types](https://www.familyhistoryfanatics.com/unique-family-tree-charts)
- [Family Tree Magazine -- Family Tree Chart Types](https://familytreemagazine.com/resources/family-tree-chart-types/)
- [NN/g -- Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [LogRocket -- Progressive Disclosure in UX](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
- [IxDF -- Progressive Disclosure (2026)](https://ixdf.org/literature/topics/progressive-disclosure)
- [d3-zoom Documentation](https://d3js.org/d3-zoom)
- [Scott Logic -- D3 SVG Chart Performance](https://blog.scottlogic.com/2014/09/19/d3-svg-chart-performance.html)
- [Reintech -- Optimizing D3 Chart Performance for Large Datasets](https://reintech.io/blog/optimizing-d3-chart-performance-large-data)
- [Medium -- Deploying Static Next.js to GitHub Pages (2025)](https://medium.com/@onuraltuntasbusiness_99398/deploying-a-static-next-js-site-to-github-pages-the-right-way-in-2025-3337d88fb84c)
- [GitHub -- nextjs/deploy-github-pages Template](https://github.com/nextjs/deploy-github-pages)
- [Behance -- Family Tree App UI Projects](https://www.behance.net/search/projects/family%20tree%20app%20ui)
- [Dribbble -- Family Tree Designs](https://dribbble.com/tags/family-tree)
- [Dribbble -- Genealogy Designs](https://dribbble.com/tags/genealogy)
- [Figma Community -- FamTree UX Case Study](https://www.figma.com/community/file/1221130545200803501/famtree-ux-case-study-template-community)
- [Visual Craft -- Treemily Case Study](https://www.visual-craft.com/case-studies/treemily/)
- [Tonfotos -- Family Tree Templates](https://tonfotos.com/articles/family-tree-template/)
