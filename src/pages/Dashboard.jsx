import { AlertTriangle, Bot, CloudRain, Leaf, ShieldCheck } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

const metrics = [
  { label: "Crop health", value: "86%", icon: Leaf },
  { label: "Weather risk", value: "Moderate", icon: CloudRain },
  { label: "Active alerts", value: "3", icon: AlertTriangle },
  { label: "Resilience score", value: "72", icon: ShieldCheck },
];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const location = window.localStorage.getItem("dharaone-profile-location") || "Farm region";

  return (
    <main className="page-content">
      <section className="page-hero">
        <div>
          <span className="eyebrow">DharaOne dashboard</span>
          <h1>Welcome back, {currentUser?.displayName || "grower"}</h1>
          <p>
            Monitor crop signals, climate risk, treatment decisions, and Vana AI guidance from one
            clean workspace.
          </p>
        </div>
        <div className="hero-status">
          <strong>{location}</strong>
          <span>Today needs irrigation review and leaf-spot monitoring.</span>
        </div>
      </section>

      <section className="metric-grid" aria-label="Farm status summary">
        {metrics.map(({ label, value, icon: Icon }) => (
          <article className="metric-card" key={label}>
            <Icon aria-hidden="true" size={21} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel wide">
          <div className="panel-heading">
            <h2>Priority actions</h2>
            <span>Next 48 hours</span>
          </div>
          <div className="action-list">
            <div>
              <strong>Inspect tomato block B</strong>
              <span>Disease scanner flagged early leaf discoloration.</span>
            </div>
            <div>
              <strong>Delay pesticide spray</strong>
              <span>Rain probability is elevated; reschedule after the wet window.</span>
            </div>
            <div>
              <strong>Ask Vana AI about soil moisture</strong>
              <span>Combine weather trend and crop stage before irrigation.</span>
            </div>
          </div>
        </article>

        <article className="panel assistant-panel">
          <Bot aria-hidden="true" size={24} />
          <h2>Ask Vana AI</h2>
          <p>Use the assistant inside DharaOne for crop questions, treatment planning, and climate advice.</p>
        </article>
      </section>
    </main>
  );
}
