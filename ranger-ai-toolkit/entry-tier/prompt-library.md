# AI Reporting Prompt Library — Ranger AI Toolkit

Fourteen ready-to-use prompts. Copy one into any AI chat tool (ChatGPT, Claude, Copilot, Gemini — any of them work), paste your raw field notes where indicated, and the AI turns rough notes into a finished, structured document.

**How to use this library:**
1. Find the prompt that matches what you're writing.
2. Copy the whole prompt, including the instructions — don't just paste your notes on their own.
3. Replace the `[bracketed placeholders]` with your actual details.
4. Paste in your raw notes — bullet points, voice-to-text transcripts, half-sentences are fine. The messier your notes, the more this helps.
5. Read the output before you send or file it. The AI drafts; you're still the one who knows if it's right.

**A note on what these prompts don't do:** they don't verify facts, GPS coordinates, species names, or compliance requirements. They restructure what you tell them. Garbage in, garbage out — if a detail matters, put it in your notes before you paste.

---

## Section 1 — Incident Reports

### 1. Standard field incident report

Use when: something happened in the field that needs a formal, dated, filed record — equipment failure, near-miss, injury, vehicle incident, wildlife encounter gone wrong.

```
You are helping a ranger turn raw field notes into a formal incident report.
Write in plain, factual, third-person language. Do not add details that
aren't in my notes, and do not speculate about cause unless I've stated it.

Structure the report with these headings:
- Date, time, and location of incident
- Personnel present
- Description of what occurred (chronological, factual)
- Immediate actions taken
- Injuries or damage (state "none" if none)
- Follow-up actions required
- Reported by

My raw notes:
[paste your notes here]
```

### 2. Near-miss / hazard report

Use when: nothing went wrong yet, but something could have — a hazard you want logged before it becomes an incident.

```
Turn these raw notes into a near-miss/hazard report. Keep the tone
factual and non-blaming — this is a prevention record, not a finger-
pointing exercise. Structure it as:
- What was the hazard or near-miss
- Where and when it was observed
- Who was involved or nearby
- What could have happened if unaddressed
- Recommended corrective action
- Urgency (low / medium / high, and why)

My raw notes:
[paste your notes here]
```

### 3. Equipment / vehicle damage report

Use when: a vehicle, drone, boat, or piece of field equipment is damaged and needs a report for insurance, asset tracking, or maintenance.

```
Write an equipment damage report from these notes. Structure it as:
- Asset ID / description
- Date and location of damage
- Description of damage
- How it occurred (only include cause if I've stated it — otherwise
  write "cause not yet determined")
- Current operational status of the asset
- Repair or replacement action needed
- Estimated downtime impact on program activities

My raw notes:
[paste your notes here]
```

---

## Section 2 — Biosecurity Observation Logs

### 4. Weed / invasive plant detection log

Use when: logging a weed or invasive plant sighting for the biosecurity record.

```
Turn these field notes into a biosecurity weed detection log entry.
Use plain language a non-specialist coordinator can read at a glance.
Structure it as:
- Species observed (common name, and scientific name if I've given it)
- Location (as specific as my notes allow — GPS, landmark, or description)
- Estimated extent/density (e.g. single plant, patch, infestation —
  use my wording, don't invent a category I haven't given you)
- Growth stage observed (seedling / flowering / seeding / mature)
- Treatment applied, if any (leave blank if none)
- Recommended follow-up and timeframe

My raw notes:
[paste your notes here]
```

### 5. Feral / pest animal detection log

Use when: logging sign, sighting, or trapping activity for a pest animal.

```
Turn these field notes into a pest animal detection log entry.
Structure it as:
- Species observed
- Type of evidence (direct sighting / tracks / scat / camera trap /
  damage sign — use what's in my notes)
- Location and habitat context
- Estimated number/population indicators if noted
- Control action taken, if any
- Recommended follow-up

My raw notes:
[paste your notes here]
```

### 6. Biosecurity escalation note

Use when: a detection is serious enough that it needs to go up the chain to a coordinator or a biosecurity authority immediately, not just sit in a routine log.

```
Write a short, urgent biosecurity escalation note from these field
notes, addressed to a program coordinator. Open with the single most
important fact (what was found, where) in the first sentence. Then
structure it as:
- What was detected and why it's significant
- Exact location
- Date/time observed
- Immediate risk if untreated
- What the ranger has already done
- What decision or action is needed from the coordinator, and by when

Keep it under 150 words — this needs to be read and acted on fast.

My raw notes:
[paste your notes here]
```

---

## Section 3 — Weekly Summaries for Coordinators

### 7. Weekly activity summary

Use when: turning a week's worth of scattered field notes into the summary a coordinator actually reads.

```
You are helping a ranger write a weekly activity summary for their
program coordinator. Turn these notes — which may cover multiple days
and multiple activities — into a clear weekly summary. Structure it as:
- Week ending [date]
- Key activities completed (grouped by category, not just a day-by-day
  list)
- Notable observations or findings (flag anything that needs
  coordinator attention)
- Issues or blockers encountered
- Planned activities for next week, if I've mentioned any
- Time/hours summary if I've given you hours

Write it so a coordinator managing several rangers can read it in
under two minutes and know exactly what happened and what needs
their attention.

My raw notes covering this week:
[paste your notes here]
```

### 8. Multi-ranger team summary

Use when: a coordinator needs one rolled-up summary from several rangers' individual notes.

```
I'm going to give you raw notes from multiple rangers covering the
same week. Combine them into a single team summary for the
coordinator. Structure it as:
- Week ending [date]
- Summary by activity area (not by ranger) — group similar work
  together even if different rangers did it
- Individually flag anything that's urgent or needs a decision
- Note which ranger did what only where it's relevant to follow-up
  (e.g. "further detail available from [name]")
- Overall week assessment in 1-2 sentences

Raw notes from each ranger (labelled):
[paste notes here, one ranger per section]
```

### 9. New ranger's first weekly report (coaching mode)

Use when: a new ranger is still learning how to write these reports and needs the AI to also explain what it changed and why — a teaching tool, not just a converter.

```
I'm a new ranger still learning how to write field reports. Turn my
raw notes into a proper weekly summary using the same structure an
experienced ranger would use (activities completed, notable
observations, issues, next week's plan). Then, after the report,
add a short "What I changed and why" section explaining 2-3 things
you restructured or clarified, so I learn the pattern for next time.

My raw notes:
[paste your notes here]
```

---

## Section 4 — Funding-Body Compliance Notes

### 10. Grant milestone compliance note

Use when: a funding body requires a short written update tying field activity back to a funded milestone or deliverable.

```
Write a funding compliance note linking my field activity to a grant
milestone. Use formal, factual language suitable for a funding body
reviewer who has no other context. Structure it as:
- Grant/program name: [insert]
- Milestone or deliverable this activity relates to: [insert]
- Reporting period: [insert dates]
- Activity undertaken (clear, specific, tied to the milestone wording
  where possible)
- Outputs/evidence produced (counts, locations, dates — only what's
  in my notes)
- Progress against milestone (on track / behind / ahead, with one
  sentence of justification)

My raw notes:
[paste your notes here]
```

### 11. Quarterly funding report input

Use when: compiling notes across a quarter into the raw material a coordinator will use to fill out a formal funder report.

```
I need to prepare input for a quarterly funding report. Turn these
notes — covering roughly three months of activity — into a
structured summary a coordinator can lift directly into a funder's
report template. Structure it as:
- Reporting quarter: [insert]
- Activities delivered (grouped by funded activity type if I've
  indicated categories, otherwise by general theme)
- Quantifiable outputs (counts of surveys, treatments, sites visited,
  hours — pull every number that appears in my notes, don't estimate
  ones that aren't there)
- Challenges encountered and how they were managed
- Community/cultural outcomes, if noted
- Plans for next quarter, if noted

My raw notes:
[paste your notes here]
```

### 12. Compliance gap flag

Use when: you realise partway through the reporting period that something required hasn't been logged, and you need a clear note to the coordinator about the gap — not to hide it, to flag it early.

```
Write a short, direct note to my coordinator flagging a compliance
gap. Don't soften it into vague language — state clearly what's
missing, why it happened if I've said why, and what I'm proposing to
fix it. Structure it as:
- What compliance requirement is affected
- What's missing and for what period
- Why it happened (only if I've told you — otherwise omit this line
  rather than guessing)
- Proposed fix and timeframe
- Whether this affects any current or upcoming funding milestone

My raw notes:
[paste your notes here]
```

---

## Section 5 — General Utility Prompts

### 13. Plain-language translation for community handout

Use when: a technical field report needs to become something readable for a community meeting, newsletter, or non-technical audience.

```
Take this field report and rewrite it in plain, warm, non-technical
language suitable for a community update or newsletter. Keep every
fact accurate — don't add anything that isn't in the source — but
translate any technical or bureaucratic terms into everyday language,
explained in one sentence if a term has to stay. Keep it under 200
words.

Source report:
[paste your report here]
```

### 14. Handover note for the next shift or ranger

Use when: passing ongoing work to another ranger or the next rostered shift and you need a tight, complete handover.

```
Turn these notes into a shift handover note for the next ranger
coming on. Structure it as:
- What's in progress and current status
- Anything that needs immediate attention or follow-up
- Equipment/vehicle status
- Anything flagged but not yet actioned
- Who to contact if something's unclear

Keep it scannable — the next ranger should be able to read this in
under a minute before heading out.

My raw notes:
[paste your notes here]
```

---

*Part of the Ranger AI Toolkit — Entry Tier. These prompts are general-purpose and don't require the Ranger Field App. They work with any AI chat tool your program already has access to.*
