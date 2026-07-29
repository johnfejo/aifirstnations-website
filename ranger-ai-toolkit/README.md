# Ranger AI Toolkit

A two-tier product: **Entry tier** (templates and a prompt library, sellable immediately) and **Premium tier** (licensed access to the Ranger Field App, on hold pending an insurance/legal review — see below).

This folder is additive only, same rule as `content-engine/`. Nothing here touches the existing site pages (`portal.html`, `advisory.html`, `marketing.html`, etc.).

## Folder guide

```
/ranger-ai-toolkit
  /entry-tier/
      prompt-library.md                          14 ready-to-use AI prompts — the flagship item
      guide-ai-saves-rangers-hours.md             practical guide, AIFN brand voice
      /templates/
          field-observation-template.md           18-category fillable observation template
          toolbox-safety-checker-template.md      JSA-style pre-task safety checklist
          flight-log-template.md                  generic drone flight log (no ReOC reference)
  sales-page-copy.md                              landing page copy, $297 per seat
  README.md                                       this file
```

`/premium-tier/` does not exist yet. It's gated on an insurance/legal check (Professional Indemnity coverage for third-party-licensed software, and a licence agreement confirming each ranger group operates under their own CASA authorisation) that hasn't been completed. Do not build or sell Premium-tier content until that's resolved — see the product brief for the full reasoning.

## Status

Entry tier: content drafted and ready for John's review before publishing to the live site.

## Source material

- Voice and tone: [`content-engine/brand-voice.md`](../content-engine/brand-voice.md)
- Real project facts (used sparingly here — this product is general-purpose, not tied to specific AIFN project numbers): [`content-engine/project-facts.md`](../content-engine/project-facts.md)
- Original product brief: supplied directly by John, not stored in this repo.

## Pricing model (Entry tier)

$297 per seat, per coordinator/manager — not a flat organisation-wide licence. Sold as a static digital download for now; no seat-tracking/license-key enforcement built yet (deliberately — not worth the engineering effort until volume justifies it). See `sales-page-copy.md` for how this is communicated to buyers.
