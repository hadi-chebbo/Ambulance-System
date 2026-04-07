import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ForbiddenPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16">

      {/* Animated icon */}
      <div
        className={`relative flex items-center justify-center mb-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ width: 160, height: 160 }}
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full border border-red-300 animate-ping opacity-20" />
        <span className="absolute rounded-full border border-red-200 opacity-10"
          style={{ inset: -20, animation: "pulse 3s ease-in-out infinite" }} />

        {/* Icon background */}
        <div className="absolute inset-0 rounded-full bg-red-50 border border-red-200" />

        {/* Caduceus SVG */}
        <svg
          width="80" height="80" viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
            @keyframes draw { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
            @keyframes shake { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-4deg)} 40%{transform:rotate(4deg)} 60%{transform:rotate(-2deg)} 80%{transform:rotate(2deg)} }
          `}</style>

          {/* Staff */}
          <line x1="40" y1="8" x2="40" y2="72" stroke="#E24B4A" strokeWidth="3.5" strokeLinecap="round" />

          {/* Snake 1 */}
          <path d="M40 18 C28 22, 28 32, 40 36 C52 40, 52 50, 40 54"
            fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="600" strokeDashoffset="600"
            style={{ animation: "draw 2s ease forwards 0.3s", opacity: 0.85 }} />

          {/* Snake 2 */}
          <path d="M40 18 C52 22, 52 32, 40 36 C28 40, 28 50, 40 54"
            fill="none" stroke="#A32D2D" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="600" strokeDashoffset="600"
            style={{ animation: "draw 2s ease forwards 0.6s", opacity: 0.7 }} />

          {/* Top orb */}
          <ellipse cx="40" cy="10" rx="6" ry="7" fill="#E24B4A" opacity="0.9" />

          {/* Wings */}
          <line x1="28" y1="26" x2="52" y2="26" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="54" x2="54" y2="54" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" />

          {/* Dashed orbit ring */}
          <circle cx="40" cy="40" r="36" fill="none" stroke="#E24B4A"
            strokeWidth="2" strokeDasharray="8 5" opacity="0.2" />

          {/* Forbidden slash */}
          <line x1="14" y1="14" x2="66" y2="66" stroke="#E24B4A" strokeWidth="3"
            strokeLinecap="round" opacity="0.9"
            style={{ animation: "shake 1.8s ease-in-out infinite 1.5s" }} />
        </svg>
      </div>

      {/* Error code badge */}
      <span
        className={`text-xs font-semibold tracking-widest text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-1 mb-5 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        403 — ACCESS FORBIDDEN
      </span>

      <h1
        className={`text-3xl font-bold text-gray-900 mb-2 text-center transition-all duration-700 delay-150 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Access restricted
      </h1>

      <p
        className={`text-sm text-gray-500 max-w-sm text-center mb-8 leading-relaxed transition-all duration-700 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        You don't have the required permissions to view this page.
        Only super admins can access this area.
      </p>

      <div className={`flex gap-3 transition-all duration-700 delay-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          ← Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Home
        </button>
      </div>
    </div>
  );
}