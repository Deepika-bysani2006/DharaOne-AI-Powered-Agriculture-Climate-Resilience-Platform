import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordField({ errorId, id, label, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <div className="password-input">
        <input
          aria-describedby={errorId}
          id={id}
          type={visible ? "text" : "password"}
          {...props}
        />
        <button
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
          title={visible ? "Hide password" : "Show password"}
          type="button"
        >
          {visible ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
        </button>
      </div>
    </label>
  );
}
