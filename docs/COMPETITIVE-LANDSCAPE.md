# Genealogy Landscape Research (April 2026)

## The Big Players and Their Gaps

**Ancestry** ($25-40/mo) and **MyHeritage** ($13-30/mo) dominate with billions of records and DNA. **FamilySearch** is free, massive, but LDS-operated with a single shared world tree (anyone can edit your ancestors -- frequent vandalism complaints). **WikiTree** and **Geni** are collaborative but niche. **Gramps** is free desktop software, powerful but ugly and intimidating.

**What they all get wrong for a family like yours:** They are research tools, not family experiences. No one opens Ancestry at a reunion. The UI is built for solo researchers hunched over a laptop, not for a cousin in Barranquilla tapping a WhatsApp link on her phone. None of them answer "how am I related to this person?" in a way that feels personal.

## LATAM and Galician Gaps

Every major tool is English-first. MyHeritage has the best multilingual support but still feels translated, not native. No tool is designed for the Galicia-to-Americas migration pattern specifically. FamilySearch has digitized A Coruna parish records and Colombian civil registration, but discovery is buried behind researcher-grade UI. The Arquivo de Galicia (arquivosdegalicia.xunta.gal) and Galiciana digital library exist but have no API -- manual lookup only. **No competitor combines the Galician diaspora narrative (parish records + ship manifests + Colombian arrival) into a coherent story.**

## What Casual Users Actually Want

From Family Root App (emerging competitor, 2025-2026) and reunion research: families want **a link they can tap on WhatsApp**, a beautiful visual tree, "find myself" functionality, and photos. They do not want GEDCOM, source citations, or DNA. The "yo soy" identity system you already built is exactly right -- shareable URLs with personal context.

## AI Trends Worth Noting

MyHeritage leads with photo enhancement (colorization, animation, sharpening). FamilySearch uses AI for handwritten document transcription (22.7B searchable names as of 2025). Record matching (connecting scattered documents to the same person) is improving but still requires human review. **Photo restoration/colorization is the highest-impact AI feature for a family app** -- old Galician photos brought to life create emotional sharing moments.

## Data Formats

GEDCOM 5.5.1 remains the universal exchange format. GEDCOM 7.0 (2021) improved encoding and multimedia but adoption is slow. GEDCOM X is FamilySearch-only, API-oriented, not file-based. **For import/export, support GEDCOM 5.5.1 -- it is the lingua franca. Your internal JSON model is fine and arguably better for a web app.**

## Distribution Reality

Families share via WhatsApp (LATAM dominant), not email or Facebook. Printed photo books still matter for older generations. The viral loop is: someone sends a tree link in the family WhatsApp group, a cousin opens it, finds themselves, screenshots it, shares it again. **The screenshot IS the distribution.** OG cards with the person's name + relationship ("Luis Miguel -- 5ta generacion") are more shareable than a generic tree link.

## Monetization (If Ever)

Ancestry: $25-40/mo subscription. MyHeritage: $13-30/mo. FamilySearch: free (church-funded). Gramps: free (open source). Family Root: freemium. **For a personal family tool, monetization is irrelevant for v1.** If you ever generalize: the gap is a beautiful, mobile-first family tree builder at $5-10 one-time (not subscription) for LATAM families. No one in Colombia is paying $25/mo for Ancestry.

---

## Recommendations for Genealogia Caamano

1. **Do not compete with Ancestry/FamilySearch on records.** Link to them. Your value is the experience layer -- beautiful, personal, mobile, Spanish-native.
2. **Double down on "yo soy" + WhatsApp sharing.** This is your moat. OG cards per person, kinship labels in the share text, one-tap WhatsApp forward.
3. **Add photo colorization/restoration** as the emotional hook. Old sepia Galician photos colorized = instant family group engagement.
4. **Support GEDCOM 5.5.1 export** so power-user cousins can import into Ancestry/Gramps. Do not prioritize GEDCOM import (your JSON model is richer).
5. **Build the migration narrative** -- the Galicia-to-Colombia story as a visual timeline/map is something no tool does. You already have Leaflet + migration data.
6. **Keep it free, personal, JSON-backed.** The moment you add auth/payments, you lose the simplicity that makes this special.
7. **Galician record links** -- for each person born in Galicia, deep-link to FamilySearch/Arquivo de Galicia search results. Research aid without building a search engine.

---

Sources:

- [Family Tree Magazine - Genealogy Website Comparison](https://familytreemagazine.com/websites/genealogy-website-comparison/)
- [Best Genealogy Software 2025 Comparison](https://martinroe.com/blog/best-genealogy-software-in-2025-a-practical-comparison/)
- [Hispanic/Latino Genealogy Resources](https://familytreemagazine.com/heritage/mexican/hispanic-latino-genealogy-websites/)
- [FamilySearch - Galicia, Spain Genealogy](https://www.familysearch.org/en/wiki/Autonomous_Community_of_Galicia,_Spain_Genealogy)
- [FamilySearch - AI Developments in Genealogy](https://www.familysearch.org/en/blog/ai-developments-genealogy)
- [Best AI Tools for Genealogy 2026](https://cognitivefuture.ai/best-ai-tools-for-genealogy/)
- [GEDCOM Specifications](https://gedcom.io/specs/)
- [Family Root App - WhatsApp Sharing](https://familyrootapp.com/blog/share-your-family-tree-easily-on-social-media-with-family-root-app)
- [Genealogy Software Pricing Guide](https://www.getmonetizely.com/articles/how-much-should-you-pay-for-genealogy-research-software-a-guide-to-family-tree-and-dna-analysis-pricing)
- [Galicia Genealogy Databases](https://galicia-gen.com/databases/)
- [RootsTech 2026 AI Updates](https://www.thechurchnews.com/living-faith/2026/03/11/rootstech-leaders-attendees-enthusiastic-ai-updates-tech-forums-boom-you-are-connected/)
