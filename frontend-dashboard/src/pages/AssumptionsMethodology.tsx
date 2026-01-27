import React from "react";
import { Link } from "react-router-dom";

type ChildrenProps = { children: React.ReactNode };

const SectionTitle = ({ children }: ChildrenProps) => (
  <h2 className="text-[11px] tracking-[0.22em] text-emerald-400/90 uppercase">
    {children}
  </h2>
);

const Bullet = ({ children }: ChildrenProps) => (
  <li className="flex items-start gap-2 text-sm text-fuchsia-300/90">
    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400/90" />
    <span className="text-fuchsia-300/90">{children}</span>
  </li>
);

export default function AssumptionsMethodology() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-md border border-zinc-800 bg-[#0b0f14] shadow-[0_0_0_1px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <h1 className="text-sm font-semibold tracking-wide text-emerald-400">
              Assumptions &amp; Methodology
            </h1>
            <div className="text-xs text-zinc-500">v1.0</div>
          </div>

          <div className="px-4 py-5 space-y-6">
            <div className="space-y-3">
              <SectionTitle>DATA SOURCES (Actual / Proxy / Benchmark)</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Electricity: Supplier verified (Actual)</Bullet>
                <Bullet>AI compute intensity: Industry benchmark (Benchmark)</Bullet>
                <Bullet>Travel: Proxy estimate (Proxy)</Bullet>
              </ul>
            </div>

            <div className="space-y-3">
              <SectionTitle>KEY ASSUMPTIONS</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Duration: 12 months</Bullet>
                <Bullet>Region energy mix: EU-West</Bullet>
                <Bullet>AI profile: inference-heavy</Bullet>
              </ul>
            </div>

            <div className="space-y-3">
              <SectionTitle>LIMITATIONS (plain English)</SectionTitle>
              <ul className="space-y-2">
                <Bullet>Outputs are decision-grade estimates based on available inputs</Bullet>
              </ul>
            </div>

            <div className="pt-2 text-xs text-emerald-400/90">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/assumptions/download"
                  className="hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/40"
                >
                  [Download assumptions]
                </Link>
                <span className="text-zinc-600">|</span>
                <Link
                  to="/"
                  className="hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/40"
                >
                  [Back to results]
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-zinc-500">
          Tip: Keep copy tight. This page is for governance, not storytelling.
        </div>
      </div>
    </div>
  );
}
