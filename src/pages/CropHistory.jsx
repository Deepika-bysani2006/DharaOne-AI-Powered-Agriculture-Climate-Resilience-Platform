import React from "react";
import { CalendarDays } from "lucide-react";
import { getSavedScanHistory } from "../lib/agriInsights.js";

const baseHistory = [
  ["Aug 11", "Tomato block B", "Scanner review added for early discoloration."],
  ["Aug 09", "Paddy field", "Irrigation adjusted after high-temperature forecast."],
  ["Aug 06", "Chilli plot", "Treatment note saved for aphid monitoring."],
];

export default function CropHistory() {
  const scanHistory = getSavedScanHistory().map((scan) => [
    scan.date,
    scan.finding,
    `${scan.fileName}: ${scan.summary}`,
  ]);
  const history = [...scanHistory, ...baseHistory];

  return (
    <main className="page-content">
      <section className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Crop history</span>
          <h1>Field records</h1>
          <p>Review crop observations, scanner results, and Vana AI decisions over time.</p>
        </div>
      </section>

      <section className="timeline" aria-label="Recent crop history">
        {history.map(([date, crop, detail]) => (
          <article className="timeline-item" key={`${date}-${crop}`}>
            <CalendarDays aria-hidden="true" size={20} />
            <div>
              <strong>{date}</strong>
              <h2>{crop}</h2>
              <p>{detail}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
