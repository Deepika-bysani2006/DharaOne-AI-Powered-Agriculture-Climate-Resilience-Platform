import { CloudSun, Droplets, ThermometerSun, Wind } from "lucide-react";

const weather = [
  { label: "Temperature", value: "31 C", icon: ThermometerSun },
  { label: "Rain chance", value: "62%", icon: Droplets },
  { label: "Wind", value: "12 km/h", icon: Wind },
];

export default function Weather() {
  return (
    <main className="page-content">
      <section className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Weather</span>
          <h1>Farm weather risk</h1>
          <p>Use local weather signals to plan irrigation, spraying, and harvest timing.</p>
        </div>
        <CloudSun aria-hidden="true" size={38} />
      </section>

      <section className="metric-grid">
        {weather.map(({ label, value, icon: Icon }) => (
          <article className="metric-card" key={label}>
            <Icon aria-hidden="true" size={21} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
