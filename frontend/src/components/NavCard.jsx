import { Link } from "react-router-dom";
import leaf from "../assets/leaf.jpg"; // <-- change extension if needed

export default function NavCard({ title, description, accent, to }) {
  const accentStyles =
    accent === "green"
      ? "border-green-400/40 hover:border-green-400"
      : "border-teal-400/40 hover:border-teal-400";

  return (
    <Link
      to={to}
      className={`
        group relative overflow-hidden rounded-2xl border p-6
        transition-all duration-300
        bg-white/5 backdrop-blur-sm
        hover:bg-white/10
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400
        ${accentStyles}
      `}
    >
      {/* ===== LEAF IMAGE (HOVER) ===== */}
      <img
        src={leaf}
        alt=""
        className="
          pointer-events-none absolute inset-0 h-full w-full object-cover
          opacity-0 scale-105
          transition-all duration-500
          group-hover:opacity-100 group-hover:scale-100
        "
      />

      {/* ===== DARK OVERLAY (READABILITY) ===== */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[#0b1f2a]/75
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 text-center">
        <h3 className="mb-2 text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-white/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* ===== ARROW ===== */}
      <span className="absolute bottom-4 right-5 text-white/50 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
