import React from "react";

export default function Logo({ compact = false }) {
  return (
    <div className={`brand-lockup ${compact ? "compact" : ""}`}>
      <img src="/assets/dharaone-logo.png" alt="DharaOne logo" />
      {!compact && (
        <div>
          <strong>DharaOne</strong>
          <span>AI-powered agriculture platform</span>
        </div>
      )}
    </div>
  );
}
