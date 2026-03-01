# PatternPal MVP: AI Tailor for Sewing Patterns

Prototype web app for an interview challenge:

> Design and prototype an AI system that meaningfully expands what a human can do.

This MVP expands a sewist's workflow by converting body measurements + pattern charts into an explainable alteration plan, with human approval before final decisions.

## 4-Day MVP Plan

1. Day 1: Scope + data model  
   Define 3 patterns, required measurements, alteration vocabulary, and synthetic record schema.
2. Day 2: Core recommendation logic  
   Implement size selection, alteration rules, synthetic historical data generation, and nearest-case matching.
3. Day 3: UI and workflow  
   Build the website flow: profile input -> recommendations -> case evidence -> human override.
4. Day 4: Demo hardening  
   Tune thresholds, test with sample measurement profiles, and prepare interview narrative + metrics.

## What Is Implemented

1. Single-page site with:
   - Pattern selection from real published patterns (Peppermint Sewing School)
   - Visual pattern preview that updates with the selected pattern
   - Measurement input form
   - AI-generated alteration recommendations in beginner-friendly language
   - Confidence and expected fit-score lift with plain-language KPI labels
   - Per-alteration location images + full pattern highlight overlay
   - Similar historical case evidence
   - Human approval/override capture (saved locally)
2. Explainable recommendation engine:
   - Rule-based tailoring logic (FBA/SBA, waist/hip grading, bicep, shoulder, length)
   - Nearest-neighbor blending from synthetic historical fit records
3. Prototype-safe data strategy:
   - Synthetic records generated from expert-authored rules and realistic measurement variation
   - Clear in-product disclaimer that data is synthetic

## Pattern Image Sources

- [Peppermint Waratah Wrap Dress](https://peppermintmag.com/sewing-school/waratah-wrap-dress/)
- [Peppermint Albion Blouse](https://peppermintmag.com/sewing-school/albion-blouse/)
- [Peppermint Crossover Dress](https://peppermintmag.com/sewing-school/wrap-dress/)

## Data Notes

- There is no real user PII.
- Historical records are synthetic (`SYN-*`) and deterministic from a seeded generator.
- In production, synthetic data would be replaced by real fit outcomes and user feedback loops.

## Run Locally

From `/Users/meekybritanico/Development/WS-app`:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

## Interview Framing

Use this statement:

1. Baseline workflow: manual size-chart interpretation and ad-hoc alteration guesses.
2. With PatternPal: system proposes alteration actions with evidence and confidence.
3. Human-in-loop: maker approves/overrides each recommendation.
4. Impact claim (prototype): fewer fit re-dos, better first-fit confidence, faster prep time.
