# PatternPal MVP: AI Tailor for Sewing Patterns

Prototype web app for Wealthsimple AI Builder application:

> Design and prototype an AI system that meaningfully expands what a human can do.

This MVP expands a sewist's workflow by converting body measurements + pattern charts into an explainable alteration plan, with human approval before final decisions.

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

