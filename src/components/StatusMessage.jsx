import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function StatusMessage({ message, type = "error", id }) {
  if (!message) return null;

  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <p className={`status-message ${type}`} id={id} role={type === "error" ? "alert" : "status"}>
      <Icon aria-hidden="true" size={18} />
      <span>{message}</span>
    </p>
  );
}
