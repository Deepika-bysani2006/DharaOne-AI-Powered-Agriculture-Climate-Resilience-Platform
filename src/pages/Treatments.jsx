import { ShieldAlert, Sprout } from "lucide-react";

const treatments = [
  {
    title: "Leaf spot response",
    detail: "Remove heavily affected leaves, improve airflow, and avoid overhead irrigation.",
    tone: "warning",
  },
  {
    title: "Soil recovery",
    detail: "Add organic matter after harvest and rotate with legumes where possible.",
    tone: "healthy",
  },
  {
    title: "Pesticide timing",
    detail: "Apply only in low-wind dry windows and follow local label guidance.",
    tone: "neutral",
  },
];

export default function Treatments() {
  return (
    <main className="page-content">
      <section className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Treatment planning</span>
          <h1>Treatments and pesticide guidance</h1>
          <p>Keep response plans practical, weather-aware, and tied to observed crop symptoms.</p>
        </div>
      </section>

      <section className="treatment-list">
        {treatments.map((item) => (
          <article className={`panel treatment ${item.tone}`} key={item.title}>
            {item.tone === "warning" ? <ShieldAlert aria-hidden="true" size={22} /> : <Sprout aria-hidden="true" size={22} />}
            <div>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
