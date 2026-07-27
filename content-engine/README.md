# AI FIRST NATIONS — Content Engine

A self-contained system for generating AIFN's daily social content. Everything a post needs — voice, angles, real facts, and the schedule — lives in this folder.

## Folder guide

- [`brand-voice.md`](brand-voice.md) — the voice rules and 3 fully worked example posts. Read this before writing anything.
- [`pillars.md`](pillars.md) — the six content pillars, each with 5 example angles.
- [`project-facts.md`](project-facts.md) — real, citable facts from AIFN's actual work. The only source of numbers/details a post is allowed to cite. **Keep appending to this as new work happens.**
- [`calendar/content-calendar-90day.csv`](calendar/content-calendar-90day.csv) — the 90-day schedule: date, pillar, working title, status.
- [`templates/daily-post-template.md`](templates/daily-post-template.md) — the fill-in-the-blank structure for a single post.
- `posts/` — one finished file per post, named `YYYY-MM-DD-slug.md`, front-matter `date`, `pillar`, `platform`.

## How to generate a new day's post

1. Open `calendar/content-calendar-90day.csv` and find the next row with an **empty status**. That row's `date`, `pillar`, and `title` are your starting point.
2. Open `pillars.md` and re-read the angle list for that pillar — the working title in the calendar was generated from one of these angles plus a fact, so use it as the frame.
3. Pull the specific real detail to cite from `project-facts.md` — a count, an hours figure, an accuracy percentage, a date. Don't paraphrase a fact into something vaguer than the source; don't invent one that isn't there.
4. Copy `templates/daily-post-template.md` and fill in each section: hook, the one lesson, real example, close.
5. Check the draft against `brand-voice.md` — read it out loud. First person, one lesson, 150–250 words, jargon translated, closes on the anchor question, no cultural overclaiming.
6. Save the finished post to `posts/YYYY-MM-DD-slug.md` with front-matter:
   ```yaml
   ---
   date: YYYY-MM-DD
   pillar: <1-6>
   platform: linkedin | facebook
   ---
   ```
7. Update that row's `status` in the calendar CSV to `drafted`. Once John has posted it, update `status` to `posted`.

## Notes

- John can override any calendar row manually at any time (e.g. bumping in a timely post reacting to news) — just edit that row's `title` and keep the pillar rotation intact for the rest.
- This folder is additive only. Nothing here touches the existing site pages (`portal.html`, `advisory.html`, `marketing.html`, etc.).
- Don't auto-generate a large batch of posts ahead of the schedule until the voice on the first 2–3 drafts has been checked against real AIFN posts and confirmed by John.
