# SHRM Site Migration Plan

## Overview

Migrate the SHRM website (https://www.shrm.org) to AEM Edge Delivery Services. The migration scope includes the homepage plus additional key pages to be confirmed by the user.

## Status: Awaiting Page URLs

The homepage URL has been confirmed: **https://www.shrm.org/home**

Additional page URLs are pending — please share them when ready, and this plan will be updated with the full scope and migration steps.

## Migration Approach

The migration will use the **EXCAT Site Migration** workflow, which provides:
- Intelligent block variant tracking and reuse across pages
- Automatic metadata management
- Similarity detection to prevent duplicate block variants
- Consistent styling across all migrated pages

## High-Level Steps

1. **Site Analysis** — Analyze all provided URLs, identify page templates, and classify URL patterns
2. **Page Analysis** — Analyze each page's content structure, sections, and block variants
3. **Design System Extraction** — Extract colors, fonts, and design tokens from the original site
4. **Block Mapping** — Map original site components to EDS blocks (with variant management)
5. **Import Infrastructure** — Generate parsers, transformers, and import scripts
6. **Content Import** — Execute import for all pages and generate HTML content
7. **Block Development** — Implement custom block JS/CSS as needed
8. **Navigation Setup** — Migrate the site navigation structure
9. **Visual QA & Critique** — Compare migrated pages against originals and fix styling gaps
10. **Final Review** — Validate rendering, accessibility, and performance

## Checklist

- [ ] Collect all page URLs from user (homepage confirmed, additional pages pending)
- [ ] Run site analysis on all URLs
- [ ] Analyze each page for content structure and block variants
- [ ] Extract and apply design system (colors, fonts, typography)
- [ ] Map content blocks and manage variants
- [ ] Generate import infrastructure (parsers, transformers, scripts)
- [ ] Execute content import for all pages
- [ ] Develop custom block implementations (JS/CSS)
- [ ] Set up navigation structure
- [ ] Perform visual QA and fix styling differences
- [ ] Final review and validation

## Next Step

Share the additional page URLs when ready, and the migration will begin with a full site analysis.

> **Note:** Execution requires exiting Plan mode. Once URLs are confirmed, switch to Execute mode to begin the migration.
