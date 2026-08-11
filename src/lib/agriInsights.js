const scanHistoryKey = "dharaone-scan-history";

const responseLibrary = [
  {
    match: /irrigat|water|moisture|dry|drought/i,
    response:
      "For irrigation, check root-zone moisture before watering. If the top 5 cm is dry and plants show morning wilt, irrigate early and apply water slowly enough to avoid runoff. Recheck after rainfall before scheduling the next cycle.",
  },
  {
    match: /yellowing|yellow leaves|chlorosis|nutrient|fertili[sz]/i,
    response:
      "Yellowing can come from water stress, nitrogen shortage, or root damage. Check whether older leaves are affected first, inspect drainage, and compare plants across the field before adding fertilizer. Avoid a blanket application until you have ruled out waterlogging.",
  },
  {
    match: /spot|blight|fung|disease|lesion|mildew/i,
    response:
      "Start with a field check: note whether spots have halos, are spreading after rain, or occur on older leaves first. Remove heavily affected leaves, improve airflow, avoid overhead watering, and use only locally approved treatments according to their labels.",
  },
  {
    match: /pest|aphid|insect|mite|worm|caterpillar/i,
    response:
      "Inspect the underside of leaves and a few plants across the block. Record the pest, crop stage, and affected area before treating. Use the least disruptive locally approved control and avoid spraying during heat, wind, or rain.",
  },
  {
    match: /rain|weather|heat|temperature|wind|climate/i,
    response:
      "For weather risk, prioritise drainage before heavy rain and avoid spraying in wet or windy windows. During heat, irrigate in the morning, protect young transplants, and monitor for stress before adding inputs.",
  },
];

export function createVanaReply(question) {
  const normalizedQuestion = question.trim();
  const matchingResponse = responseLibrary.find((item) => item.match.test(normalizedQuestion));

  return matchingResponse?.response ||
    "I can help frame a field decision. Tell me the crop, growth stage, symptom location, when it started, and recent weather. With those details, I can suggest what to inspect first and how urgent the response may be.";
}

export function analyzeCropImage(file) {
  const filename = file.name.toLowerCase();
  let finding = "Visual review recommended";
  let confidence = "Field triage";
  let summary = "The image has been recorded for a closer field comparison. Inspect nearby plants and note whether the symptom is spreading.";
  let actions = ["Check 10 nearby plants for the same symptom.", "Record crop stage and the last irrigation or rainfall."];

  if (/spot|blight|fung|mildew|lesion|rust/.test(filename)) {
    finding = "Possible leaf-spot pattern";
    confidence = "Moderate signal";
    summary = "The filename indicates a possible foliar disease concern. Confirm by checking for expanding spots, yellow halos, or symptoms after wet weather.";
    actions = ["Remove heavily affected leaves where practical.", "Improve airflow and avoid overhead irrigation.", "Use only locally approved treatment after confirming the cause."];
  } else if (/yellow|chlorosis|nutrient/.test(filename)) {
    finding = "Possible nutrient or water stress";
    confidence = "Moderate signal";
    summary = "The filename indicates yellowing or chlorosis. Check soil moisture and drainage before changing fertilizer rates.";
    actions = ["Compare older and newer leaves.", "Check for waterlogging or dry root-zone soil.", "Test soil or tissue before corrective fertilizer use."];
  } else if (/aphid|pest|mite|insect|worm/.test(filename)) {
    finding = "Possible pest pressure";
    confidence = "Moderate signal";
    summary = "The filename indicates a pest concern. Confirm pest identity by inspecting leaf undersides and fresh growth.";
    actions = ["Check the affected area across multiple plants.", "Identify the pest before applying a control.", "Avoid spraying in windy or rainy periods."];
  } else if (/healthy|normal|good/.test(filename)) {
    finding = "No concern named in the image";
    confidence = "Low signal";
    summary = "No symptom cue was found in the image name. Use this record as a baseline and compare it with future field images.";
  }

  return {
    id: crypto.randomUUID(),
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    fileName: file.name,
    finding,
    confidence,
    summary,
    actions,
  };
}

export function getSavedScanHistory() {
  try {
    return JSON.parse(window.localStorage.getItem(scanHistoryKey) || "[]");
  } catch {
    return [];
  }
}

export function saveScanHistory(scan) {
  const history = [scan, ...getSavedScanHistory()].slice(0, 12);
  window.localStorage.setItem(scanHistoryKey, JSON.stringify(history));
  return history;
}
