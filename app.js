"use strict";

const patterns = [
  {
    id: "peppermint-waratah-wrap-dress",
    name: "Peppermint Waratah Wrap Dress",
    fabric: "woven",
    defaultStretch: "stable",
    image: "https://peppermintmag.com/wp-content/uploads/2025/12/Peppermint-WaratahWrapDress-2-600x835.jpg",
    sourceLabel: "Peppermint Magazine",
    sourceUrl: "https://peppermintmag.com/sewing-school/waratah-wrap-dress/",
    hint: "Wrap dress with a gentle fit shape. Start at bust and blend softly into waist and hips.",
    cupRef: 2.5,
    sizes: [
      { label: "4", bust: 34, waist: 27, hip: 36, bicep: 11.5, shoulder: 14, backWaistLength: 15.5, height: 65 },
      { label: "8", bust: 36, waist: 29, hip: 38, bicep: 12, shoulder: 14.5, backWaistLength: 15.8, height: 65 },
      { label: "12", bust: 38, waist: 31, hip: 40, bicep: 12.8, shoulder: 14.9, backWaistLength: 16.1, height: 66 },
      { label: "16", bust: 41, waist: 34, hip: 43, bicep: 13.6, shoulder: 15.4, backWaistLength: 16.5, height: 66 },
      { label: "20", bust: 44, waist: 37, hip: 46, bicep: 14.4, shoulder: 15.9, backWaistLength: 16.9, height: 67 },
    ],
  },
  {
    id: "peppermint-albion-blouse",
    name: "Peppermint Albion Blouse",
    fabric: "woven",
    defaultStretch: "stable",
    image: "https://peppermintmag.com/wp-content/uploads/2022/05/Peppermint-Albion-Blouse-1-1-600x835.jpg",
    sourceLabel: "Peppermint Magazine",
    sourceUrl: "https://peppermintmag.com/sewing-school/albion-blouse/",
    hint: "Relaxed blouse style. Beginners usually get a nicer result by checking chest and shoulder fit first.",
    cupRef: 2.25,
    sizes: [
      { label: "4", bust: 33.5, waist: 27, hip: 36, bicep: 11.25, shoulder: 14.1, backWaistLength: 15.4, height: 65 },
      { label: "8", bust: 35.5, waist: 29, hip: 38, bicep: 11.75, shoulder: 14.5, backWaistLength: 15.7, height: 65 },
      { label: "12", bust: 37.5, waist: 31.5, hip: 40.5, bicep: 12.5, shoulder: 14.9, backWaistLength: 16, height: 66 },
      { label: "16", bust: 40.5, waist: 34.5, hip: 43.5, bicep: 13.3, shoulder: 15.4, backWaistLength: 16.4, height: 66 },
      { label: "20", bust: 43.5, waist: 37.5, hip: 46.5, bicep: 14.2, shoulder: 15.9, backWaistLength: 16.8, height: 67 },
    ],
  },
  {
    id: "peppermint-crossover-dress",
    name: "Peppermint Crossover Dress",
    fabric: "woven",
    defaultStretch: "stable",
    image: "https://peppermintmag.com/wp-content/uploads/2016/05/SewingSchool20-631x878.jpg",
    sourceLabel: "Peppermint Magazine",
    sourceUrl: "https://peppermintmag.com/sewing-school/wrap-dress/",
    hint: "Flowy crossover style. A quick waist and length adjustment usually improves comfort a lot.",
    cupRef: 2.5,
    sizes: [
      { label: "XS", bust: 32, waist: 25.5, hip: 34.5, bicep: 10.75, shoulder: 13.5, backWaistLength: 15.3, height: 64 },
      { label: "S", bust: 34, waist: 27.5, hip: 36.5, bicep: 11.4, shoulder: 13.9, backWaistLength: 15.6, height: 65 },
      { label: "M", bust: 36, waist: 29.5, hip: 38.5, bicep: 12, shoulder: 14.3, backWaistLength: 15.9, height: 65 },
      { label: "L", bust: 39, waist: 32.5, hip: 41.5, bicep: 12.9, shoulder: 14.8, backWaistLength: 16.3, height: 66 },
      { label: "XL", bust: 42, waist: 35.5, hip: 44.5, bicep: 13.8, shoulder: 15.3, backWaistLength: 16.7, height: 67 },
    ],
  },
];

const measureKeys = [
  "bust",
  "highBust",
  "waist",
  "hip",
  "bicep",
  "shoulder",
  "backWaistLength",
  "height",
];

const alterationLabels = {
  fba: "Add room at chest",
  sba: "Reduce extra chest fabric",
  waist: "Adjust at waist",
  hip: "Adjust at hips",
  bicep: "Add sleeve room",
  shoulder: "Adjust shoulder width",
  bodiceLength: "Adjust upper-body length",
  hemLength: "Adjust hem length",
};

const beginnerLookupTerms = {
  fba: "Full Bust Adjustment (FBA)",
  sba: "Small Bust Adjustment (SBA)",
  waist: "Blend side seams at the waist",
  hip: "Blend side seams at the hip",
  bicep: "Full bicep sleeve adjustment",
  shoulder: "Narrow or wide shoulder adjustment",
  bodiceLength: "Lengthen or shorten bodice",
  hemLength: "Lengthen or shorten hem",
};

const adjustmentImages = {
  fba: "assets/adjustments/chest.svg",
  sba: "assets/adjustments/chest.svg",
  waist: "assets/adjustments/waist.svg",
  hip: "assets/adjustments/hip.svg",
  bicep: "assets/adjustments/bicep.svg",
  shoulder: "assets/adjustments/shoulder.svg",
  bodiceLength: "assets/adjustments/bodice-length.svg",
  hemLength: "assets/adjustments/hem.svg",
};

const form = document.querySelector("#fit-form");
const tabJudges = document.querySelector("#tab-judges");
const tabTool = document.querySelector("#tab-tool");
const panelJudges = document.querySelector("#panel-judges");
const panelTool = document.querySelector("#panel-tool");

const patternSelect = document.querySelector("#pattern");
const unitSystemSelect = document.querySelector("#unit-system");
const unitTitleNodes = [...document.querySelectorAll("[data-unit-base]")];
const patternHint = document.querySelector("#pattern-hint");
const patternImage = document.querySelector("#pattern-image");
const patternCaption = document.querySelector("#pattern-caption");
const overlayBaseImage = document.querySelector("#overlay-base-image");
const overlayEl = document.querySelector("#pattern-overlay");

const reviewSection = document.querySelector("#step-review");
const approvalSection = document.querySelector("#step-approval");
const feedbackSection = document.querySelector("#step-feedback");
const toApprovalBtn = document.querySelector("#to-approval-btn");
const friendlySummaryEl = document.querySelector("#friendly-summary");
const recommendationsEl = document.querySelector("#recommendations");
const historyBody = document.querySelector("#history-body");
const approvalList = document.querySelector("#approval-list");
const formError = document.querySelector("#form-error");
const approvalForm = document.querySelector("#approval-form");
const approvalStatus = document.querySelector("#approval-status");
const customAlterationKey = document.querySelector("#custom-alteration-key");
const customAlterationAmount = document.querySelector("#custom-alteration-amount");
const addCustomAlterationBtn = document.querySelector("#add-custom-alteration-btn");
const customAlterationList = document.querySelector("#custom-alteration-list");
const feedbackForm = document.querySelector("#feedback-form");
const ratingUpBtn = document.querySelector("#rating-up");
const ratingDownBtn = document.querySelector("#rating-down");
const feedbackRatingInput = document.querySelector("#feedback-rating");
const muslinCountInput = document.querySelector("#muslin-count");
const feedbackStatus = document.querySelector("#feedback-status");
const finalPatternSummary = document.querySelector("#final-pattern-summary");
const finalPatternImage = document.querySelector("#final-pattern-image");
const finalPatternCaption = document.querySelector("#final-pattern-caption");
const finalPatternName = document.querySelector("#final-pattern-name");
const finalBaseSize = document.querySelector("#final-base-size");
const finalAdjustmentList = document.querySelector("#final-adjustment-list");
const finalNotes = document.querySelector("#final-notes");
const saveAlteredPatternBtn = document.querySelector("#save-altered-pattern-btn");
const savePatternStatus = document.querySelector("#save-pattern-status");

const kpiSize = document.querySelector("#kpi-size");
const kpiConfidence = document.querySelector("#kpi-confidence");
const kpiRedos = document.querySelector("#kpi-redos");

let latestResult = null;
const random = mulberry32(20260226);
const historicalCases = generateSyntheticHistory();
const FEEDBACK_STORAGE_KEY = "fitforge_feedback";
const PERSONAL_LEARNING_STORAGE_KEY = "fitforge_personal_learning";
let customAlterationDraft = [];
let latestFinalizedPattern = null;

init();

function init() {
  initTabs();

  for (const pattern of patterns) {
    const option = document.createElement("option");
    option.value = pattern.id;
    option.textContent = pattern.name;
    patternSelect.append(option);
  }
  updatePatternContext();
  initCustomAlterationControls();
  updateUnitDisplay();
  patternSelect.addEventListener("change", updatePatternContext);
  if (unitSystemSelect) {
    unitSystemSelect.addEventListener("change", updateUnitDisplay);
  }
  form.addEventListener("submit", handleAnalyze);
  if (toApprovalBtn) {
    toApprovalBtn.addEventListener("click", handleContinueToApproval);
  }
  approvalForm.addEventListener("submit", handleApprovalSave);
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSave);
  }
  if (saveAlteredPatternBtn) {
    saveAlteredPatternBtn.addEventListener("click", handleSaveAlteredPattern);
  }
  if (ratingUpBtn && ratingDownBtn) {
    ratingUpBtn.addEventListener("click", () => setFeedbackRating("up"));
    ratingDownBtn.addEventListener("click", () => setFeedbackRating("down"));
  }
}

function initCustomAlterationControls() {
  if (!customAlterationKey || !addCustomAlterationBtn || !customAlterationList) {
    return;
  }

  customAlterationKey.innerHTML = Object.entries(alterationLabels)
    .map(([key, label]) => `<option value="${key}">${label}</option>`)
    .join("");
  renderCustomAlterationDraft();

  addCustomAlterationBtn.addEventListener("click", addCustomAlterationFromInput);
  customAlterationList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.removeIndex === undefined) {
      return;
    }
    const index = Number(target.dataset.removeIndex);
    if (!Number.isInteger(index) || index < 0) {
      return;
    }
    customAlterationDraft.splice(index, 1);
    renderCustomAlterationDraft();
  });
}

function getUnitSystem() {
  return unitSystemSelect && unitSystemSelect.value === "cm" ? "cm" : "in";
}

function convertInputToInches(value) {
  return getUnitSystem() === "cm" ? value / 2.54 : value;
}

function updateUnitDisplay() {
  const unit = getUnitSystem();
  const step = unit === "cm" ? "0.5" : "0.25";
  for (const node of unitTitleNodes) {
    const base = node.dataset.unitBase || "";
    if (base === "Amount +/-") {
      node.textContent = `Amount (+/- ${unit})`;
    } else {
      node.textContent = `${base} (${unit})`;
    }
  }
  for (const key of measureKeys) {
    const input = document.querySelector(`#${key}`);
    if (input) {
      input.setAttribute("step", step);
    }
  }
  if (customAlterationAmount) {
    customAlterationAmount.setAttribute("step", step);
  }
}

function initTabs() {
  if (!tabJudges || !tabTool || !panelJudges || !panelTool) {
    return;
  }

  tabJudges.addEventListener("click", () => setActiveTab("judges"));
  tabTool.addEventListener("click", () => setActiveTab("tool"));
}

function setActiveTab(mode) {
  const judgesActive = mode === "judges";

  tabJudges.classList.toggle("active", judgesActive);
  tabTool.classList.toggle("active", !judgesActive);
  tabJudges.setAttribute("aria-pressed", String(judgesActive));
  tabTool.setAttribute("aria-pressed", String(!judgesActive));
  panelJudges.classList.toggle("active", judgesActive);
  panelTool.classList.toggle("active", !judgesActive);
}

function setFeedbackRating(value) {
  if (!feedbackRatingInput || !ratingUpBtn || !ratingDownBtn) {
    return;
  }
  feedbackRatingInput.value = value;
  ratingUpBtn.classList.toggle("active", value === "up");
  ratingDownBtn.classList.toggle("active", value === "down");
}

function resetFeedbackControls() {
  if (feedbackRatingInput) {
    feedbackRatingInput.value = "";
  }
  if (muslinCountInput) {
    muslinCountInput.value = "";
  }
  if (ratingUpBtn) {
    ratingUpBtn.classList.remove("active");
  }
  if (ratingDownBtn) {
    ratingDownBtn.classList.remove("active");
  }
  if (feedbackStatus) {
    feedbackStatus.textContent = "";
  }
}

function resetCustomAlterationDraft() {
  customAlterationDraft = [];
  if (customAlterationAmount) {
    customAlterationAmount.value = "";
  }
  renderCustomAlterationDraft();
}

function addCustomAlterationFromInput() {
  if (!customAlterationKey || !customAlterationAmount) {
    return;
  }

  const key = customAlterationKey.value;
  const rawAmount = Number(customAlterationAmount.value);
  if (!key) {
    return;
  }
  if (!Number.isFinite(rawAmount) || rawAmount === 0) {
    return;
  }

  const amount = roundHundredth(convertInputToInches(rawAmount));
  if (amount === 0) {
    return;
  }

  customAlterationDraft.push({
    key,
    title: alterationLabels[key] || key,
    amount,
  });
  customAlterationAmount.value = "";
  renderCustomAlterationDraft();
}

function renderCustomAlterationDraft() {
  if (!customAlterationList) {
    return;
  }
  if (!customAlterationDraft.length) {
    customAlterationList.innerHTML = `<p class="hint">No custom muslin findings added yet.</p>`;
    syncSuggestionStateWithCustomAdjustments();
    return;
  }
  customAlterationList.innerHTML = customAlterationDraft
    .map(
      (item, index) => `
      <div class="custom-item">
        <p><strong>${item.title}</strong> (${item.amount.toFixed(2)} in / ${toCm(item.amount).toFixed(1)} cm)</p>
        <button type="button" class="remove-custom-btn" data-remove-index="${index}">Remove</button>
      </div>
    `
    )
    .join("");
  syncSuggestionStateWithCustomAdjustments();
}

function syncSuggestionStateWithCustomAdjustments() {
  if (!approvalList) {
    return;
  }
  const customKeys = new Set(customAlterationDraft.map((item) => item.key));
  const rows = [...approvalList.querySelectorAll(".approval-item")];
  for (const row of rows) {
    const input = row.querySelector("input[type='checkbox']");
    if (!(input instanceof HTMLInputElement)) {
      continue;
    }
    const shouldDisable = customKeys.has(input.dataset.key || "");
    if (shouldDisable) {
      input.checked = false;
    }
    input.disabled = shouldDisable;
    row.classList.toggle("disabled", shouldDisable);
  }
}

function updatePatternContext() {
  const pattern = getPattern(patternSelect.value);
  if (!pattern) {
    patternHint.textContent = "";
    return;
  }

  patternImage.src = pattern.image;
  patternCaption.innerHTML = `${pattern.name} preview from <a href="${pattern.sourceUrl}" target="_blank" rel="noopener noreferrer">${pattern.sourceLabel}</a>.`;
  overlayBaseImage.src = pattern.image;
  patternHint.textContent = `${pattern.hint} Synthetic fit examples for this pattern: ${historicalCases.filter((c) => c.patternId === pattern.id).length}.`;
}

function getPattern(id) {
  return patterns.find((pattern) => pattern.id === id) || null;
}

function handleAnalyze(event) {
  event.preventDefault();
  formError.textContent = "";

  const pattern = getPattern(patternSelect.value);
  if (!pattern) {
    formError.textContent = "Please select a pattern.";
    return;
  }

  const measurements = readMeasurements();
  if (!measurements.ok) {
    formError.textContent = measurements.error;
    return;
  }

  const stretch = pattern.defaultStretch;
  const selectedSize = determineBaseSize(pattern, measurements.values, stretch);
  const ruleSuggestions = inferAlterations(pattern, selectedSize, measurements.values, stretch);
  const nearest = findNearestCases(pattern.id, measurements.values, stretch, 24);
  const historicalAgg = aggregateHistoricalAlterations(nearest);
  const learningProfile = getLearningProfile();
  const personalLearningProfile = getPersonalLearningProfile();
  const recommendations = buildRecommendations(
    ruleSuggestions,
    historicalAgg,
    nearest,
    selectedSize,
    measurements.values,
    learningProfile,
    personalLearningProfile
  );

  const baselineFit = estimateFitScore(pattern, selectedSize, measurements.values, []);
  const overallConfidence = recommendations.length
    ? recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
    : 0.38;

  const baselineChecks = clamp(1 + (100 - baselineFit) / 24, 1, 4.5);
  const improvedChecks = clamp(
    baselineChecks - (recommendations.length * 0.2 + overallConfidence * 0.5),
    0.8,
    4.2
  );
  const redoSaved = Math.max(0, baselineChecks - improvedChecks);

  latestResult = {
    timestamp: new Date().toISOString(),
    patternId: pattern.id,
    patternName: pattern.name,
    stretch,
    measurements: measurements.values,
    selectedSize: selectedSize.label,
    recommendations,
    nearest,
    baselineFit,
    overallConfidence,
    learningEntries: learningProfile.entries,
    personalLearningEntries: personalLearningProfile.entries,
  };

  renderKpis(selectedSize, overallConfidence, redoSaved);
  renderFriendlySummary(pattern, selectedSize, recommendations, learningProfile, personalLearningProfile);
  renderRecommendations(recommendations);
  renderHistory(nearest);
  renderApprovalList(recommendations);
  renderPatternOverlay(pattern, recommendations);
  resetFeedbackControls();
  resetCustomAlterationDraft();
  latestFinalizedPattern = null;
  if (finalPatternSummary) {
    finalPatternSummary.classList.add("hidden");
  }
  if (savePatternStatus) {
    savePatternStatus.textContent = "";
  }

  reviewSection.classList.remove("hidden");
  approvalSection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  approvalStatus.textContent = "";
  reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleContinueToApproval() {
  if (!latestResult) {
    return;
  }
  approvalSection.classList.remove("hidden");
  approvalSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function readMeasurements() {
  const values = {};
  for (const key of measureKeys) {
    const raw = Number(document.querySelector(`#${key}`).value);
    if (!Number.isFinite(raw) || raw <= 0) {
      return { ok: false, error: `Please enter a valid number for ${labelForMeasure(key)}.` };
    }
    values[key] = convertInputToInches(raw);
  }

  if (values.highBust >= values.bust) {
    return {
      ok: false,
      error: "High bust should be a little smaller than full bust.",
    };
  }

  return { ok: true, values };
}

function determineBaseSize(pattern, measurements, stretch) {
  const stretchBias = pattern.fabric === "knit" && stretch !== "stable" ? 0.75 : 1;
  const scored = pattern.sizes.map((size) => {
    const primary = Math.abs(measurements[pattern.primary] - size[pattern.primary]) * 1.8 * stretchBias;
    const waist = Math.abs(measurements.waist - size.waist) * 0.85;
    const hip = Math.abs(measurements.hip - size.hip) * 0.85;
    const shoulder = Math.abs(measurements.shoulder - size.shoulder) * 0.6;
    const bicep = Math.abs(measurements.bicep - size.bicep) * 0.5;
    return {
      size,
      score: primary + waist + hip + shoulder + bicep,
    };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored[0].size;
}

function inferAlterations(pattern, size, measurements, stretch) {
  const suggestions = [];
  const bustDelta = measurements.bust - size.bust;
  const waistDelta = measurements.waist - size.waist;
  const hipDelta = measurements.hip - size.hip;
  const bicepDelta = measurements.bicep - size.bicep;
  const shoulderDelta = measurements.shoulder - size.shoulder;
  const torsoDelta = measurements.backWaistLength - size.backWaistLength;
  const heightDelta = measurements.height - size.height;
  const cupDelta = measurements.bust - measurements.highBust;

  if (cupDelta >= pattern.cupRef + 1 || bustDelta >= 2) {
    addSuggestion(
      suggestions,
      "fba",
      roundQuarter(Math.max(0.5, (cupDelta - pattern.cupRef) * 0.5 + bustDelta * 0.2)),
      "Your full bust is running larger than this size chart at the chest.",
      4.8
    );
  } else if (cupDelta <= pattern.cupRef - 1 || bustDelta <= -1.75) {
    addSuggestion(
      suggestions,
      "sba",
      roundQuarter(Math.max(0.25, Math.abs(cupDelta - pattern.cupRef) * 0.4 + Math.abs(bustDelta) * 0.2)),
      "This size likely has extra fabric across your chest.",
      3.9
    );
  }

  if (Math.abs(waistDelta) >= 1) {
    addSuggestion(
      suggestions,
      "waist",
      roundQuarter(Math.abs(waistDelta) / 2),
      waistDelta > 0
        ? "Your waist measure is larger than this size chart at waist level."
        : "Your waist measure is smaller than this size chart at waist level.",
      3.6
    );
  }

  if (Math.abs(hipDelta) >= 1.25) {
    addSuggestion(
      suggestions,
      "hip",
      roundQuarter(Math.abs(hipDelta) / 2),
      hipDelta > 0
        ? "Your hip measure is larger than this size chart in the hip area."
        : "Your hip measure is smaller than this size chart in the hip area.",
      3.4
    );
  }

  if (bicepDelta >= 0.75) {
    addSuggestion(
      suggestions,
      "bicep",
      roundQuarter(bicepDelta / 2),
      "You may want extra sleeve room for comfort when you move.",
      3.5
    );
  }

  if (Math.abs(shoulderDelta) >= 0.5) {
    addSuggestion(
      suggestions,
      "shoulder",
      roundQuarter(Math.abs(shoulderDelta) / 2),
      shoulderDelta > 0
        ? "Your shoulder width is wider than this size chart."
        : "Your shoulder width is narrower than this size chart.",
      2.9
    );
  }

  if (Math.abs(torsoDelta) >= 0.6) {
    addSuggestion(
      suggestions,
      "bodiceLength",
      roundQuarter(Math.abs(torsoDelta)),
      torsoDelta > 0
        ? "Your upper body length is longer than this size chart."
        : "Your upper body length is shorter than this size chart.",
      4.2
    );
  }

  if (Math.abs(heightDelta) >= 2) {
    addSuggestion(
      suggestions,
      "hemLength",
      roundQuarter(Math.abs(heightDelta) * 0.35),
      heightDelta > 0
        ? "You are taller than the pattern's base height."
        : "You are shorter than the pattern's base height.",
      2.2
    );
  }

  if (pattern.fabric === "knit" && stretch !== "stable") {
    for (const suggestion of suggestions) {
      if (suggestion.key === "waist" || suggestion.key === "hip") {
        suggestion.amount = roundQuarter(Math.max(0.25, suggestion.amount - 0.25));
      }
    }
  }

  return suggestions;
}

function addSuggestion(suggestions, key, amount, reason, impact) {
  const existing = suggestions.find((suggestion) => suggestion.key === key);
  if (existing) {
    existing.amount = Math.max(existing.amount, amount);
    existing.impact = Math.max(existing.impact, impact);
    return;
  }

  suggestions.push({
    key,
    title: alterationLabels[key] || key,
    amount,
    reason,
    impact,
  });
}

function findNearestCases(patternId, measurements, stretch, limit) {
  return historicalCases
    .filter((row) => row.patternId === patternId)
    .map((row) => {
      const distance =
        Math.abs(row.measurements.bust - measurements.bust) * 1.8 +
        Math.abs(row.measurements.highBust - measurements.highBust) * 1.1 +
        Math.abs(row.measurements.waist - measurements.waist) * 1.25 +
        Math.abs(row.measurements.hip - measurements.hip) * 1.25 +
        Math.abs(row.measurements.bicep - measurements.bicep) * 1.1 +
        Math.abs(row.measurements.shoulder - measurements.shoulder) * 0.85 +
        Math.abs(row.measurements.backWaistLength - measurements.backWaistLength) * 1.2 +
        Math.abs(row.measurements.height - measurements.height) * 0.25 +
        (row.stretch === stretch ? 0 : 1.9);

      return { ...row, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

function aggregateHistoricalAlterations(cases) {
  const byKey = {};
  for (const row of cases) {
    for (const alt of row.alterations) {
      const weight = 1 / (1 + row.distance);
      if (!byKey[alt.key]) {
        byKey[alt.key] = {
          key: alt.key,
          title: alt.title,
          weightedAmount: 0,
          weightTotal: 0,
          count: 0,
          fitGainTotal: 0,
        };
      }

      byKey[alt.key].weightedAmount += alt.amount * weight;
      byKey[alt.key].weightTotal += weight;
      byKey[alt.key].count += 1;
      byKey[alt.key].fitGainTotal += row.fitScore - row.baselineFit;
    }
  }

  const aggregated = {};
  for (const key of Object.keys(byKey)) {
    const item = byKey[key];
    aggregated[key] = {
      key,
      title: item.title,
      amount: roundQuarter(item.weightedAmount / Math.max(item.weightTotal, 0.01)),
      support: item.count / Math.max(cases.length, 1),
      count: item.count,
      fitGain: item.fitGainTotal / Math.max(item.count, 1),
    };
  }

  return aggregated;
}

function buildRecommendations(
  ruleSuggestions,
  historicalAgg,
  nearestCasesList,
  size,
  measurements,
  learningProfile,
  personalLearningProfile
) {
  const result = [];
  const ruleMap = Object.fromEntries(ruleSuggestions.map((item) => [item.key, item]));
  const keys = new Set([...Object.keys(ruleMap), ...Object.keys(historicalAgg)]);
  const avgDistance =
    nearestCasesList.reduce((sum, row) => sum + row.distance, 0) /
    Math.max(nearestCasesList.length, 1);
  const distancePenalty = clamp(avgDistance / 30, 0, 0.22);

  for (const key of keys) {
    const rule = ruleMap[key];
    const hist = historicalAgg[key];
    const support = hist ? hist.support : 0;
    let blendedAmount = rule && hist
      ? roundQuarter(rule.amount * 0.6 + hist.amount * 0.4)
      : rule
        ? rule.amount
        : hist.amount;

    let confidence = clamp(
      (rule ? 0.52 : 0.33) +
        support * 0.42 +
        (hist ? Math.min(0.1, hist.fitGain / 20) : 0) -
        distancePenalty,
      0.22,
      0.95
    );

    let learnedNote = "";
    const learnedStats = learningProfile.byAlteration[key];
    if (learnedStats && learnedStats.count >= 2) {
      const confidenceShift = (learnedStats.successRate - 0.5) * 0.24;
      confidence = clamp(confidence + confidenceShift, 0.22, 0.95);
      learnedNote = `From ${learnedStats.count} past feedback ratings, this adjustment was marked helpful ${Math.round(
        learnedStats.successRate * 100
      )}% of the time.`;

      if (learnedStats.count >= 4) {
        const amountShift = clamp((learnedStats.avgMuslin - 1.5) * 0.04, -0.08, 0.08);
        blendedAmount = roundHundredth(blendedAmount * (1 + amountShift));
      }
    }

    let personalNote = "";
    const personalStats = personalLearningProfile.byAlteration[key];
    if (personalStats && personalStats.count >= 1) {
      const personalShift = (personalStats.acceptRate - 0.5) * 0.3;
      confidence = clamp(confidence + personalShift, 0.22, 0.95);
      if (Number.isFinite(personalStats.avgAmount) && Math.abs(personalStats.avgAmount) > 0) {
        blendedAmount = roundHundredth(blendedAmount * 0.75 + personalStats.avgAmount * 0.25);
      }
      personalNote = `Based on your past muslin approvals, you usually keep this adjustment ${Math.round(
        personalStats.acceptRate * 100
      )}% of the time.`;
    }

    if (confidence < 0.42 && !rule) {
      continue;
    }

    const rationaleParts = [];
    if (rule) {
      rationaleParts.push(rule.reason);
    }
    if (hist) {
      rationaleParts.push(`Similar past examples used this in ${hist.count} nearby cases.`);
    }

    const friendlyInstruction = createFriendlyInstruction(key, blendedAmount, size, measurements);

    result.push({
      key,
      title: alterationLabels[key] || key,
      amount: blendedAmount,
      confidence,
      impact: rule ? rule.impact : clamp((hist.fitGain || 3) / 2.2, 1.5, 4.8),
      reason: rationaleParts.join(" "),
      friendlyInstruction,
      lookupTerm: beginnerLookupTerms[key] || "Basic sewing pattern adjustment",
      learnedNote,
      personalNote,
      image: adjustmentImages[key] || "assets/adjustments/waist.svg",
    });
  }

  for (const key of Object.keys(personalLearningProfile.byAlteration)) {
    if (result.some((item) => item.key === key)) {
      continue;
    }
    const personalStats = personalLearningProfile.byAlteration[key];
    if (!personalStats || personalStats.count < 2) {
      continue;
    }
    const fallbackAmount = personalStats.avgAmount || 0.5;
    const amount = roundHundredth(fallbackAmount);
    if (amount === 0) {
      continue;
    }
    result.push({
      key,
      title: alterationLabels[key] || key,
      amount,
      confidence: clamp(0.48 + (personalStats.acceptRate - 0.5) * 0.2, 0.3, 0.78),
      impact: 2.6,
      reason: "Added from your personal fitting history.",
      friendlyInstruction: createFriendlyInstruction(key, amount, size, measurements),
      lookupTerm: beginnerLookupTerms[key] || "Basic sewing pattern adjustment",
      learnedNote: "",
      personalNote: `You have manually added this change in ${personalStats.count} previous fittings.`,
      image: adjustmentImages[key] || "assets/adjustments/waist.svg",
    });
  }

  result.sort((a, b) => b.confidence - a.confidence || b.impact - a.impact);
  return result;
}

function createFriendlyInstruction(key, amount, size, measurements) {
  const magnitude = Math.abs(amount);
  const magnitudeText = formatInAndCm(magnitude, toCm(magnitude));
  const addOrRemove = amount < 0 ? "remove" : "add";

  const lines = {
    fba: amount < 0
      ? `There may be extra fabric at the chest in size ${size.label}. Remove about ${magnitudeText}, then smoothly redraw the side seam to meet the waist.`
      : `Your bust is a little fuller than size ${size.label}. Add about ${magnitudeText} at the chest, then smoothly redraw the side seam to meet the waist.`,
    sba: amount < 0
      ? `There may be extra fabric at the chest in size ${size.label}. Remove about ${magnitudeText} at the chest so the front sits flatter.`
      : `Your chest area may need a little more room than this size gives. Add about ${magnitudeText} at the chest for better comfort.`,
    waist: `Your waist and this size are a bit different. ${capitalize(addOrRemove)} about ${magnitudeText} at the waist and smoothly redraw that side seam into the hip.`,
    hip: `Your hip area needs a small tweak. ${capitalize(addOrRemove)} about ${magnitudeText} through the hip curve so side seams hang straighter.`,
    bicep: amount < 0
      ? `If the sleeve feels loose, remove about ${magnitudeText} from the upper sleeve area.`
      : `For easier arm movement, add about ${magnitudeText} to the upper sleeve area.`,
    shoulder: amount < 0
      ? `Move the shoulder seam inward by about ${magnitudeText} so it sits closer to your natural shoulder point.`
      : `Move the shoulder seam outward by about ${magnitudeText} so it sits closer to your natural shoulder point.`,
    bodiceLength: amount < 0
      ? `Shorten the upper body length by about ${magnitudeText} so the waist line lands where your waist actually is.`
      : `Lengthen the upper body length by about ${magnitudeText} so the waist line lands where your waist actually is.`,
    hemLength: amount < 0
      ? `Shorten the hem by about ${magnitudeText} to keep the finished length where you want it.`
      : `Lengthen the hem by about ${magnitudeText} to keep the finished length where you want it.`,
  };

  if (!lines[key]) {
    return `${capitalize(addOrRemove)} about ${magnitudeText} here to improve comfort and shape.`;
  }

  return lines[key];
}

function renderKpis(size, confidence, redoSaved) {
  kpiSize.textContent = size.label;
  kpiConfidence.textContent = `${Math.round(confidence * 100)}%`;
  kpiRedos.textContent = `${redoSaved.toFixed(1)} fewer re-dos`;
}

function renderFriendlySummary(pattern, size, recommendations, learningProfile, personalLearningProfile) {
  const personalLine = personalLearningProfile.entries
    ? ` Your personal history currently has ${personalLearningProfile.entries} saved fitting signals.`
    : "";
  if (!recommendations.length) {
    const learningLine = learningProfile.entries
      ? ` This suggestion also used ${learningProfile.entries} past user feedback notes.`
      : "";
    friendlySummaryEl.innerHTML = `<p>Nice match. You can start with size ${size.label}. Do one quick test in cheap fabric before cutting your final fabric.${learningLine}${personalLine}</p>`;
    return;
  }

  const top = recommendations.slice(0, 2).map((rec) => rec.friendlyInstruction).join(" ");
  const learningLine = learningProfile.entries
    ? ` This plan was also adjusted using ${learningProfile.entries} saved feedback entries.`
    : " As more users rate outcomes, these recommendations keep getting better.";
  friendlySummaryEl.innerHTML = `<p><strong>Quick plan:</strong> You can start with size ${size.label} for ${pattern.name}. ${top}${learningLine}${personalLine}</p>`;
}

function renderRecommendations(recommendations) {
  if (!recommendations.length) {
    recommendationsEl.innerHTML = `<p class="hint">No major changes are needed. Start with the suggested size and do a quick fit check.</p>`;
    return;
  }

  recommendationsEl.innerHTML = recommendations
    .map(
      (rec) => `
      <article class="recommendation">
        <div class="recommendation-main">
          <div>
            <h4>${rec.title}: ${formatInAndCm(rec.amount, toCm(rec.amount))}</h4>
            <div class="meta">
              <span>Confidence ${Math.round(rec.confidence * 100)}%</span>
            </div>
            <p>${rec.friendlyInstruction}</p>
            <p class="lookup"><strong>Lookup term:</strong> ${rec.lookupTerm}</p>
            ${rec.learnedNote ? `<p class="learned-note">${rec.learnedNote}</p>` : ""}
            ${rec.personalNote ? `<p class="personal-note">${rec.personalNote}</p>` : ""}
          </div>
          <img class="rec-image" src="${rec.image}" alt="Pattern area for ${rec.title}" />
        </div>
      </article>
    `
    )
    .join("");
}

function renderPatternOverlay(pattern, recommendations) {
  overlayBaseImage.src = pattern.image;

  const active = {
    chest: recommendations.some((rec) => rec.key === "fba" || rec.key === "sba"),
    waist: recommendations.some((rec) => rec.key === "waist"),
    hip: recommendations.some((rec) => rec.key === "hip"),
    bicep: recommendations.some((rec) => rec.key === "bicep"),
    shoulder: recommendations.some((rec) => rec.key === "shoulder"),
    torso: recommendations.some((rec) => rec.key === "bodiceLength"),
    hem: recommendations.some((rec) => rec.key === "hemLength"),
  };

  overlayEl.innerHTML = `
    <svg viewBox="0 0 640 480" aria-hidden="true">
      <ellipse class="zone ${active.chest ? "active" : ""}" cx="320" cy="188" rx="96" ry="50"></ellipse>
      <rect class="zone ${active.waist ? "active" : ""}" x="236" y="220" width="168" height="32" rx="16"></rect>
      <ellipse class="zone ${active.hip ? "active" : ""}" cx="320" cy="286" rx="122" ry="48"></ellipse>
      <ellipse class="zone ${active.bicep ? "active" : ""}" cx="214" cy="178" rx="36" ry="46"></ellipse>
      <ellipse class="zone ${active.bicep ? "active" : ""}" cx="426" cy="178" rx="36" ry="46"></ellipse>
      <ellipse class="zone ${active.shoulder ? "active" : ""}" cx="252" cy="136" rx="52" ry="22"></ellipse>
      <ellipse class="zone ${active.shoulder ? "active" : ""}" cx="388" cy="136" rx="52" ry="22"></ellipse>
      <rect class="zone ${active.torso ? "active" : ""}" x="300" y="148" width="40" height="140" rx="20"></rect>
      <rect class="zone ${active.hem ? "active" : ""}" x="190" y="346" width="260" height="34" rx="16"></rect>
    </svg>
  `;
}

function renderHistory(cases) {
  historyBody.innerHTML = cases
    .slice(0, 8)
    .map((row) => {
      const alterationSummary = row.alterations.length
        ? row.alterations
            .slice(0, 2)
            .map((alt) => `${alt.title} (${formatInAndCm(alt.amount, toCm(alt.amount))})`)
            .join(", ")
        : "None";
      return `
        <tr>
          <td>${row.id}</td>
          <td>${row.chosenSize}</td>
          <td>${row.fitScore.toFixed(1)}</td>
          <td>${alterationSummary}</td>
        </tr>
      `;
    })
    .join("");
}

function renderApprovalList(recommendations) {
  if (!recommendations.length) {
    approvalList.innerHTML = `<p class="hint">No changes suggested, but you can leave notes before saving.</p>`;
    syncSuggestionStateWithCustomAdjustments();
    return;
  }

  approvalList.innerHTML = recommendations
    .map(
      (rec, index) => `
      <label class="approval-item">
        <input type="checkbox" id="approve-${index}" data-key="${rec.key}" checked />
        <p><strong>${rec.title}</strong> (${formatInAndCm(rec.amount, toCm(rec.amount))})</p>
      </label>
    `
    )
    .join("");
  syncSuggestionStateWithCustomAdjustments();
}

function handleApprovalSave(event) {
  event.preventDefault();
  if (!latestResult) {
    approvalStatus.textContent = "Run an analysis before saving a decision.";
    return;
  }

  const checkboxes = [...approvalList.querySelectorAll("input[type='checkbox']")];
  const accepted = checkboxes.filter((item) => item.checked).map((item) => item.dataset.key);
  const rejected = checkboxes.filter((item) => !item.checked).map((item) => item.dataset.key);
  const customAlterations = customAlterationDraft.map((item) => ({ ...item }));
  const notes = document.querySelector("#approval-notes").value.trim();

  if (!accepted.length && !customAlterations.length && latestResult.recommendations.length) {
    approvalStatus.textContent =
      "Select at least one suggested alteration or add your own muslin finding before saving.";
    return;
  }

  const recommendationByKey = Object.fromEntries(
    (latestResult.recommendations || []).map((rec) => [rec.key, rec])
  );
  const acceptedAdjustments = accepted
    .map((key) => recommendationByKey[key])
    .filter(Boolean)
    .map((rec) => ({
      key: rec.key,
      title: rec.title,
      amount: rec.amount,
      source: "suggested",
    }));
  const customAdjustments = customAlterations.map((item) => ({
    key: item.key,
    title: item.title,
    amount: item.amount,
    source: "custom",
  }));
  latestFinalizedPattern = {
    patternId: latestResult.patternId,
    patternName: latestResult.patternName,
    baseSize: latestResult.selectedSize,
    adjustments: [...acceptedAdjustments, ...customAdjustments],
    notes: notes || "No extra notes provided.",
    createdAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("fitforge_approvals") || "[]");
  existing.push({
    createdAt: new Date().toISOString(),
    patternId: latestResult.patternId,
    selectedSize: latestResult.selectedSize,
    accepted,
    rejected,
    customAlterations,
    notes,
    confidence: latestResult.overallConfidence,
  });
  localStorage.setItem("fitforge_approvals", JSON.stringify(existing));
  appendPersonalLearningSignals(latestResult, accepted, rejected, customAlterations);

  const personalProfile = getPersonalLearningProfile();
  approvalStatus.textContent = `Saved. Personal fitting memory now has ${personalProfile.entries} signals.`;
  feedbackSection.classList.remove("hidden");
  feedbackSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleFeedbackSave(event) {
  event.preventDefault();
  if (!latestResult) {
    if (feedbackStatus) {
      feedbackStatus.textContent = "Run an analysis before sharing feedback.";
    }
    return;
  }

  const rating = feedbackRatingInput ? feedbackRatingInput.value : "";
  if (rating !== "up" && rating !== "down") {
    if (feedbackStatus) {
      feedbackStatus.textContent = "Please choose thumbs up or thumbs down first.";
    }
    return;
  }

  const muslinCount = Number(muslinCountInput ? muslinCountInput.value : NaN);
  if (!Number.isFinite(muslinCount) || muslinCount < 0 || muslinCount > 10) {
    if (feedbackStatus) {
      feedbackStatus.textContent = "Please enter a muslin count between 0 and 10.";
    }
    return;
  }

  const feedback = getStoredFeedback();
  feedback.push({
    createdAt: new Date().toISOString(),
    patternId: latestResult.patternId,
    selectedSize: latestResult.selectedSize,
    rating,
    muslinCount,
    recommendationKeys: latestResult.recommendations.map((rec) => rec.key),
  });
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));

  if (feedbackStatus) {
    feedbackStatus.textContent =
      "Thank you for submitting your fitting outcome. Your feedback helps improve future recommendation quality.";
  }

  if (latestFinalizedPattern) {
    renderFinalPatternSummary(latestFinalizedPattern);
    if (finalPatternSummary) {
      finalPatternSummary.classList.remove("hidden");
      finalPatternSummary.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function renderFinalPatternSummary(summary) {
  if (!summary || !finalPatternSummary) {
    return;
  }
  const pattern = getPattern(summary.patternId);
  if (finalPatternImage && pattern) {
    finalPatternImage.src = pattern.image;
  }
  if (finalPatternCaption && pattern) {
    finalPatternCaption.textContent = `${pattern.name} altered pattern preview`;
  }
  if (finalPatternName) {
    finalPatternName.textContent = summary.patternName;
  }
  if (finalBaseSize) {
    finalBaseSize.textContent = summary.baseSize;
  }
  if (finalAdjustmentList) {
    if (!summary.adjustments.length) {
      finalAdjustmentList.innerHTML = `<li>No adjustment changes saved.</li>`;
    } else {
      finalAdjustmentList.innerHTML = summary.adjustments
        .map((item) => {
          const signed = formatSignedInAndCm(item.amount);
          const sourceLabel = item.source === "custom" ? "custom" : "suggested";
          return `<li>${item.title}: ${signed} (${sourceLabel})</li>`;
        })
        .join("");
    }
  }
  if (finalNotes) {
    finalNotes.textContent = summary.notes;
  }
  if (savePatternStatus) {
    savePatternStatus.textContent = "";
  }
}

function handleSaveAlteredPattern() {
  if (!latestFinalizedPattern) {
    if (savePatternStatus) {
      savePatternStatus.textContent = "Save is available after you complete approval and feedback.";
    }
    return;
  }

  const payload = {
    ...latestFinalizedPattern,
    unitSystemInput: getUnitSystem(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const safePattern = latestFinalizedPattern.patternName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  anchor.href = url;
  anchor.download = `${safePattern}-altered-pattern.json`;
  anchor.click();
  URL.revokeObjectURL(url);

  if (savePatternStatus) {
    savePatternStatus.textContent = "Altered pattern summary saved.";
  }
}

function getStoredFeedback() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function getStoredPersonalSignals() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PERSONAL_LEARNING_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function appendPersonalLearningSignals(result, accepted, rejected, customAlterations) {
  const signals = getStoredPersonalSignals();
  const byKey = Object.fromEntries((result.recommendations || []).map((rec) => [rec.key, rec]));
  const timestamp = new Date().toISOString();

  for (const key of accepted) {
    const rec = byKey[key];
    signals.push({
      createdAt: timestamp,
      patternId: result.patternId,
      key,
      outcome: "accept",
      amount: rec ? rec.amount : 0,
    });
  }

  for (const key of rejected) {
    const rec = byKey[key];
    signals.push({
      createdAt: timestamp,
      patternId: result.patternId,
      key,
      outcome: "reject",
      amount: rec ? rec.amount : 0,
    });
  }

  for (const item of customAlterations) {
    signals.push({
      createdAt: timestamp,
      patternId: result.patternId,
      key: item.key,
      outcome: "custom",
      amount: item.amount,
    });
  }

  localStorage.setItem(PERSONAL_LEARNING_STORAGE_KEY, JSON.stringify(signals));
}

function getLearningProfile() {
  const feedback = getStoredFeedback();
  const byAlteration = {};

  for (const row of feedback) {
    if (!Array.isArray(row.recommendationKeys)) {
      continue;
    }
    const uniqueKeys = [...new Set(row.recommendationKeys)];
    for (const key of uniqueKeys) {
      if (!byAlteration[key]) {
        byAlteration[key] = {
          count: 0,
          positive: 0,
          muslinTotal: 0,
        };
      }
      byAlteration[key].count += 1;
      byAlteration[key].positive += row.rating === "up" ? 1 : 0;
      byAlteration[key].muslinTotal += Number.isFinite(row.muslinCount) ? row.muslinCount : 0;
    }
  }

  const normalizedByAlteration = {};
  for (const key of Object.keys(byAlteration)) {
    const stats = byAlteration[key];
    normalizedByAlteration[key] = {
      count: stats.count,
      successRate: stats.positive / Math.max(stats.count, 1),
      avgMuslin: stats.muslinTotal / Math.max(stats.count, 1),
    };
  }

  return {
    entries: feedback.length,
    byAlteration: normalizedByAlteration,
  };
}

function getPersonalLearningProfile() {
  const signals = getStoredPersonalSignals();
  const byAlteration = {};

  for (const signal of signals) {
    if (!signal || !signal.key) {
      continue;
    }
    if (!byAlteration[signal.key]) {
      byAlteration[signal.key] = {
        count: 0,
        acceptCount: 0,
        amountTotal: 0,
        amountCount: 0,
      };
    }
    byAlteration[signal.key].count += 1;
    if (signal.outcome === "accept" || signal.outcome === "custom") {
      byAlteration[signal.key].acceptCount += 1;
      if (Number.isFinite(signal.amount) && signal.amount !== 0) {
        byAlteration[signal.key].amountTotal += signal.amount;
        byAlteration[signal.key].amountCount += 1;
      }
    }
  }

  const normalizedByAlteration = {};
  for (const key of Object.keys(byAlteration)) {
    const stats = byAlteration[key];
    normalizedByAlteration[key] = {
      count: stats.count,
      acceptRate: stats.acceptCount / Math.max(stats.count, 1),
      avgAmount: stats.amountTotal / Math.max(stats.amountCount, 1),
    };
  }

  return {
    entries: signals.length,
    byAlteration: normalizedByAlteration,
  };
}

function estimateFitScore(pattern, size, measurements, appliedAlterations, clampScore = true) {
  const bustPenalty = Math.abs(measurements.bust - size.bust) * 3.8;
  const waistPenalty = Math.abs(measurements.waist - size.waist) * 2.7;
  const hipPenalty = Math.abs(measurements.hip - size.hip) * 2.4;
  const bicepPenalty = Math.abs(measurements.bicep - size.bicep) * 2.4;
  const shoulderPenalty = Math.abs(measurements.shoulder - size.shoulder) * 2.1;
  const torsoPenalty = Math.abs(measurements.backWaistLength - size.backWaistLength) * 3.2;
  const heightPenalty = Math.abs(measurements.height - size.height) * 0.6;
  const knitFactor = pattern.fabric === "knit" ? 0.9 : 1;

  const totalPenalty =
    (bustPenalty + waistPenalty + hipPenalty + bicepPenalty + shoulderPenalty + torsoPenalty) * knitFactor +
    heightPenalty;

  const bonus = appliedAlterations.reduce((sum, alteration) => {
    const perKey = {
      fba: 5.3,
      sba: 3.8,
      waist: 3.2,
      hip: 3.1,
      bicep: 3.2,
      shoulder: 2.4,
      bodiceLength: 4.1,
      hemLength: 1.7,
    };
    return sum + (perKey[alteration.key] || 1.5) * Math.min(1.2, alteration.amount);
  }, 0);

  const score = 93 - totalPenalty + bonus;
  if (!clampScore) {
    return score;
  }
  return clamp(score, 34, 98);
}

function generateSyntheticHistory() {
  const data = [];
  let sequence = 1000;

  for (const pattern of patterns) {
    for (const size of pattern.sizes) {
      for (let i = 0; i < 32; i += 1) {
        const measurements = {
          bust: roundQuarter(size.bust + randomRange(-4.5, 4.5)),
          highBust: 0,
          waist: roundQuarter(size.waist + randomRange(-4.25, 4.25)),
          hip: roundQuarter(size.hip + randomRange(-4.5, 4.5)),
          bicep: roundQuarter(size.bicep + randomRange(-1.8, 2.2)),
          shoulder: roundQuarter(size.shoulder + randomRange(-1.2, 1.2)),
          backWaistLength: roundQuarter(size.backWaistLength + randomRange(-1.8, 1.8)),
          height: roundQuarter(size.height + randomRange(-4, 4)),
        };

        measurements.highBust = roundQuarter(
          clamp(measurements.bust - randomRange(1, 4.2), 24, measurements.bust - 0.5)
        );

        const stretch = pickStretchForPattern(pattern.fabric);
        const chosenSize = determineBaseSize(pattern, measurements, stretch);
        const inferred = inferAlterations(pattern, chosenSize, measurements, stretch);

        const applied = inferred
          .filter((suggestion) => random() < 0.68 + suggestion.impact * 0.04)
          .map((suggestion) => ({
            ...suggestion,
            amount: roundQuarter(Math.max(0.25, suggestion.amount + randomRange(-0.25, 0.25))),
          }));

        const baselineFit = estimateFitScore(pattern, chosenSize, measurements, []);
        const fitScore = estimateFitScore(pattern, chosenSize, measurements, applied);

        data.push({
          id: `SYN-${sequence}`,
          patternId: pattern.id,
          chosenSize: chosenSize.label,
          measurements,
          stretch,
          alterations: applied,
          baselineFit,
          fitScore,
        });
        sequence += 1;
      }
    }
  }

  return data;
}

function labelForMeasure(key) {
  const map = {
    bust: "full bust",
    highBust: "high bust",
    waist: "waist",
    hip: "full hip",
    bicep: "bicep",
    shoulder: "shoulder width",
    backWaistLength: "back waist length",
    height: "height",
  };
  return map[key] || key;
}

function pickStretchForPattern(fabric) {
  const roll = random();
  if (fabric === "woven") {
    if (roll < 0.82) {
      return "stable";
    }
    if (roll < 0.95) {
      return "light";
    }
    return "medium";
  }

  if (roll < 0.2) {
    return "stable";
  }
  if (roll < 0.62) {
    return "light";
  }
  return "medium";
}

function formatInAndCm(inches, cm) {
  return `${inches.toFixed(2)} in (${cm.toFixed(1)} cm)`;
}

function formatSignedInAndCm(inches) {
  const sign = inches >= 0 ? "+" : "-";
  const absIn = Math.abs(inches);
  const absCm = Math.abs(toCm(inches));
  return `${sign}${absIn.toFixed(2)} in (${sign}${absCm.toFixed(1)} cm)`;
}

function toCm(inches) {
  return inches * 2.54;
}

function capitalize(value) {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function roundQuarter(value) {
  return Math.round(value * 4) / 4;
}

function roundHundredth(value) {
  return Math.round(value * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomRange(min, max) {
  return min + (max - min) * random();
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function generated() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
