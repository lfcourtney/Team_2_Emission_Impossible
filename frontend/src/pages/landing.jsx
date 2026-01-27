import NavCard from "../components/NavCard";
import logo2 from "../assets/logo2.png";
import canopy from "../assets/canopy.jpg";

import { useAuth } from "../contexts/AuthContext";

export default function Landing() {

  const { logout, authenticatedUser } = useAuth();



  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-sans">
      {/* ===== FOREST BACKGROUND ===== */}
      <img
        src={canopy}
        alt="Forest canopy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark wash for legibility */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ===== UPWARD TRIANGLE PORTAL ===== */}
      <div
        className="absolute top-0 left-1/2 z-20 flex min-h-[80vh] w-[110vw]
                   -translate-x-1/2 items-center justify-center"
        style={{
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          background: `
            linear-gradient(
              to bottom,
              rgba(8, 24, 40, 0.88),
              rgba(10, 42, 60, 0.84),
              rgba(8, 24, 40, 0.88)
            )
          `,
        }}
      >
        {/* CONTENT INSIDE TRIANGLE */}
        <div className="relative z-30 flex w-full max-w-5xl flex-col items-center px-6 pt-24">

          {/* ===== LOGO + BRAND ===== */}
          <div className="mb-12 flex flex-col items-center text-center">
            {/* LOGO CIRCLE */}
            <div className="relative mb-6 h-44 w-44 rounded-full overflow-hidden bg-[#0b1f2a]/60">
              <img
                src={logo2}
                alt="Carbon IQ Logo"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* BRAND TEXT */}
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Carbon IQ
            </h1>

            <p className="mt-1 text-sm sm:text-base font-medium tracking-wide uppercase text-green-400">
              Intelligent Carbon Monitoring
            </p>
          </div>

          {/* ===== NAVIGATION (CENTRED) ===== */}
          <nav className="w-full max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

              {/* 1️⃣ DASHBOARD */}
              <NavCard
                title="Dashboard"
                //description="Track performance, signals, and progress over time"
                accent="teal"
                to="/dashboard"
              />

              {/* 2️⃣ BUILD SCENARIOS */}
              <NavCard
                title="Build Scenarios"
                //description=""
                accent="green"
                to="/scenarios"
              />

              {/* 3️⃣ VIEW RESULTS */}
              <NavCard
                title="View Results"
                //description="Compare outcomes, trade-offs, and emissions trajectories"
                accent="teal"
                to="/results"
              />

            </div>
          </nav>

        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 mt-[85vh] pb-10 text-center text-xs text-gray-300 opacity-70">
        <div className="mt-2 font-mono text-gray-400">Carbon IQ</div>
      </footer>
    </div>
  );
}
