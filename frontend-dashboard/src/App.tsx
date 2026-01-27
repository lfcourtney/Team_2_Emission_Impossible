import React, { useEffect, useMemo, useState } from "react";

// Slider theme color constant
const SLIDER_COLOR = "#4a7d63";

type Confidence = "High" | "Medium" | "Low";

type LocationKey =
  | "belfast"
  | "dublin"
  | "london"
  | "birmingham"
  | "india"
  | "australia";

type Location = {
  key: LocationKey;
  name: string;
  country: string;
  lat: number;
  lon: number;
  baselineCO2e: number;
  confidence: Confidence;
  // Percent split of baseline by source (must total 100)
  sourceSplit: { electricity: number; heating: number; transport: number };
};

const LOCATIONS: Location[] = [
  {
    key: "belfast",
    name: "Belfast",
    country: "UK",
    lat: 54.5973,
    lon: -5.9301,
    baselineCO2e: 18420,
    confidence: "Medium",
    sourceSplit: { electricity: 28, heating: 52, transport: 20 },
  },
  {
    key: "dublin",
    name: "Dublin",
    country: "Ireland",
    lat: 53.3498,
    lon: -6.2603,
    baselineCO2e: 22406,
    confidence: "Medium",
    sourceSplit: { electricity: 23, heating: 56, transport: 21 },
  },
  {
    key: "london",
    name: "London",
    country: "UK",
    lat: 51.5072,
    lon: -0.1276,
    baselineCO2e: 26890,
    confidence: "High",
    sourceSplit: { electricity: 30, heating: 45, transport: 25 },
  },
  {
    key: "birmingham",
    name: "Birmingham",
    country: "UK",
    lat: 52.4862,
    lon: -1.8904,
    baselineCO2e: 20610,
    confidence: "Medium",
    sourceSplit: { electricity: 26, heating: 54, transport: 20 },
  },
  {
    key: "india",
    name: "Bengaluru",
    country: "India",
    lat: 12.9716,
    lon: 77.5946,
    baselineCO2e: 31200,
    confidence: "Low",
    sourceSplit: { electricity: 40, heating: 25, transport: 35 },
  },
  {
    key: "australia",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lon: 151.2093,
    baselineCO2e: 24150,
    confidence: "Medium",
    sourceSplit: { electricity: 35, heating: 30, transport: 35 },
  },
];

const formatNum = (n: number) =>
  new Intl.NumberFormat("en-GB").format(Math.round(n));

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function Badge({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "good" | "warn" | "bad";
}) {
  const toneClass =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30"
      : tone === "warn"
      ? "bg-amber-500/15 text-amber-200 ring-amber-400/30"
      : tone === "bad"
      ? "bg-rose-500/15 text-rose-200 ring-rose-400/30"
      : "bg-slate-500/15 text-slate-200 ring-slate-400/30";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ${toneClass}`}
    >
      {label}
    </span>
  );
}

function Button({
  children,
  variant = "secondary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-white/10 transition text-white hover:opacity-90"
      style={{ backgroundColor: SLIDER_COLOR }}
    >
      {children}
    </button>
  );
}

function SliderRow({
  label,
  hint,
  value,
  onChange,
  capHint,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  capHint?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-950/40 ring-1 ring-white/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-slate-100">{label}</div>
          <div className="mt-1 text-xs text-slate-400">{hint}</div>
          {capHint ? (
            <div className="mt-1 text-[11px] text-slate-500">{capHint}</div>
          ) : null}
        </div>
        <Badge label={`${value}%`} tone="neutral" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-slate-700 to-slate-600 outline-none cursor-pointer"
        style={
          {
            background: `linear-gradient(to right, ${SLIDER_COLOR} 0%, ${SLIDER_COLOR} ${value}%, rgb(55, 65, 81) ${value}%, rgb(55, 65, 81) 100%)`,
          } as React.CSSProperties
        }
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${SLIDER_COLOR};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${SLIDER_COLOR};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        input[type="range"]::-moz-range-thumb:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.4);
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

function DonutChart({
  segments,
  title,
}: {
  title: string;
  segments: { label: string; value: number; strokeClass: string }[];
}) {
  const size = 160;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const total = Math.max(
    1,
    segments.reduce((a, s) => a + s.value, 0)
  );

  let acc = 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm font-semibold text-slate-100">{title}</div>
        <div className="mt-1 text-xs text-slate-400">
          Share of baseline footprint by source.
        </div>
      </div>

      <div className="flex items-center gap-6">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          {segments.map((s) => {
            const frac = s.value / total;
            const dash = frac * c;
            const gap = c - dash;
            const offset = acc;
            acc += dash;

            return (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                className={s.strokeClass}
              />
            );
          })}
          <text
            x={size / 2}
            y={size / 2 - 4}
            textAnchor="middle"
            className="fill-slate-100 text-[14px] font-semibold"
          >
            100%
          </text>
          <text
            x={size / 2}
            y={size / 2 + 16}
            textAnchor="middle"
            className="fill-slate-400 text-[10px]"
          >
            of baseline
          </text>
        </svg>

        <div className="grow space-y-3">
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    s.strokeClass.includes("teal")
                      ? "bg-teal-400"
                      : s.strokeClass.includes("sky")
                      ? "bg-sky-400"
                      : "bg-amber-300"
                  }`}
                />
                <span className="text-sm text-slate-200">{s.label}</span>
              </div>
              <span className="text-sm text-slate-400">
                {Math.round(s.value)}%
              </span>
            </div>
          ))}
          <div className="text-[11px] text-slate-500 pt-2">
            Use this to explain what’s driving emissions, not just the total.
          </div>
        </div>
      </div>
    </div>
  );
}

function projectPoint(lon: number, lat: number, w: number, h: number) {
  const x = ((lon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

function weatherCodeToText(code: number) {
  if (code === 0) return "Clear";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65].includes(code)) return "Rain";
  if ([71, 73, 75].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Showers";
  if ([95, 96, 99].includes(code)) return "Thunder";
  return "Unknown";
}

type ActionItem = {
  title: string;
  reason: string;
  impactKg: number;
  priority: "High" | "Medium" | "Low";
  cta: string;
  onClick: () => void;
};

function priorityTone(p: ActionItem["priority"]): "neutral" | "warn" | "bad" {
  if (p === "High") return "bad";
  if (p === "Medium") return "warn";
  return "neutral";
}

export default function App() {
  // Location selection
  const [locationKey, setLocationKey] = useState<LocationKey>("dublin");
  const location = useMemo(
    () => LOCATIONS.find((l) => l.key === locationKey)!,
    [locationKey]
  );

  // Baseline
  const baselineCO2e = location.baselineCO2e;
  const periodLabel = "Last 12 months";

  // Levers
  const [renewables, setRenewables] = useState(33);
  const [efficiency, setEfficiency] = useState(29);
  const [travel, setTravel] = useState(11);

  // Reality caps (guidance only)
  const caps = { renewables: 60, efficiency: 40, travel: 30 };

  // Projection model (placeholder)
  const projectedCO2e = useMemo(() => {
    const reduction =
      0.3 * (renewables / 100) +
      0.18 * (efficiency / 100) +
      0.1 * (travel / 100);

    return Math.round(baselineCO2e * (1 - Math.min(reduction, 0.7)));
  }, [renewables, efficiency, travel, baselineCO2e]);

  const deltaKg = useMemo(
    () => projectedCO2e - baselineCO2e,
    [projectedCO2e, baselineCO2e]
  );
  const deltaPct = useMemo(
    () => (deltaKg / baselineCO2e) * 100,
    [deltaKg, baselineCO2e]
  );

  const confidenceTone =
    location.confidence === "High"
      ? "good"
      : location.confidence === "Medium"
      ? "warn"
      : "bad";

  const capWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (renewables > caps.renewables)
      warnings.push("Renewables is beyond a typical realistic range.");
    if (efficiency > caps.efficiency)
      warnings.push("Efficiency is beyond a typical realistic range.");
    if (travel > caps.travel)
      warnings.push("Travel reduction is beyond a typical realistic range.");
    return warnings;
  }, [renewables, efficiency, travel]);

  // Donut chart data (baseline split)
  const donutSegments = useMemo(() => {
    const s = location.sourceSplit;
    return [
      { label: "Electricity", value: s.electricity, strokeClass: "stroke-teal-400" },
      { label: "Heating", value: s.heating, strokeClass: "stroke-sky-400" },
      { label: "Transport", value: s.transport, strokeClass: "stroke-amber-300" },
    ];
  }, [location]);

  // Weather (Open-Meteo, no key)
  const [weather, setWeather] = useState<{
    tempC: number;
    windKph: number;
    code: number;
    time: string;
  } | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setWeatherStatus("loading");
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${encodeURIComponent(location.lat)}` +
          `&longitude=${encodeURIComponent(location.lon)}` +
          `&current=temperature_2m,weather_code,wind_speed_10m` +
          `&wind_speed_unit=kmh` +
          `&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
        const json = await res.json();

        const cur = json.current;
        const next = {
          tempC: cur.temperature_2m as number,
          windKph: cur.wind_speed_10m as number,
          code: cur.weather_code as number,
          time: cur.time as string,
        };

        if (!cancelled) {
          setWeather(next);
          setWeatherStatus("idle");
        }
      } catch {
        if (!cancelled) setWeatherStatus("error");
      }
    }

    loadWeather();
    const id = setInterval(loadWeather, 10 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [location.lat, location.lon]);

  // Map config
  const mapW = 520;
  const mapH = 240;

  // Recommended actions (Option 1)
  const recommendedActions = useMemo<ActionItem[]>(() => {
    const split = location.sourceSplit;
    const base = baselineCO2e;

    const headroomRenewables = clamp(100 - renewables, 0, 100) / 100;
    const headroomEfficiency = clamp(100 - efficiency, 0, 100) / 100;
    const headroomTravel = clamp(100 - travel, 0, 100) / 100;

    const impactRenewables = base * (split.electricity / 100) * 0.35 * headroomRenewables;
    const impactEfficiency = base * (split.heating / 100) * 0.3 * headroomEfficiency;
    const impactTravel = base * (split.transport / 100) * 0.25 * headroomTravel;

    const actions: ActionItem[] = [
      {
        title: "Increase renewable electricity supply",
        reason: `Electricity is ${split.electricity}% of baseline for ${location.name}.`,
        impactKg: impactRenewables,
        priority: split.electricity >= 30 ? "High" : "Medium",
        cta: "Simulate +10%",
        onClick: () => setRenewables((v) => clamp(v + 10, 0, 100)),
      },
      {
        title: "Improve building efficiency (heating/cooling)",
        reason: `Heating is ${split.heating}% of baseline — typically the biggest controllable driver.`,
        impactKg: impactEfficiency,
        priority: split.heating >= 45 ? "High" : "Medium",
        cta: "Simulate +10%",
        onClick: () => setEfficiency((v) => clamp(v + 10, 0, 100)),
      },
      {
        title: "Reduce travel and transport emissions",
        reason: `Transport is ${split.transport}% of baseline. Policy and fleet changes compound over time.`,
        impactKg: impactTravel,
        priority: split.transport >= 30 ? "High" : "Low",
        cta: "Simulate +10%",
        onClick: () => setTravel((v) => clamp(v + 10, 0, 100)),
      },
    ];

    actions.sort((a, b) => b.impactKg - a.impactKg);

    const improvement = baselineCO2e - projectedCO2e;
    if (improvement > base * 0.25) {
      actions.forEach((a) => {
        if (a.priority === "High") a.priority = "Medium";
      });
    }

    return actions.slice(0, 3);
  }, [location, baselineCO2e, projectedCO2e, renewables, efficiency, travel]);

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        backgroundColor: "#06070c",
        backgroundImage: 'url("/Vibrant green leaves in the forest.png")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1
              className="inline-block rounded-xl px-4 py-2 text-4xl font-semibold tracking-tight text-white"
              style={{ backgroundColor: SLIDER_COLOR }}
            >
              Carbon IQ Dashboard
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-white/10"
                style={{ backgroundColor: SLIDER_COLOR }}
              >
                <span className="text-xs text-white">Location</span>
                <select
                  value={locationKey}
                  onChange={(e) => setLocationKey(e.target.value as LocationKey)}
                  className="bg-transparent text-sm text-white outline-none"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l.key} value={l.key} className="bg-slate-950">
                      {l.name}, {l.country}
                    </option>
                  ))}
                </select>
              </div>

              <Badge label={`Confidence: ${location.confidence}`} tone={confidenceTone} />
              <Button onClick={() => alert("Navigate to: /assumptions")}>
                View assumptions
              </Button>
              <Button onClick={() => alert("Navigate to: /compare")}>
                Compare scenarios
              </Button>
              <Button
                variant="primary"
                onClick={() => alert("Saved (demo). Hook up API/localStorage next.")}
              >
                Save scenario
              </Button>
            </div>
          </div>

          <p className="mt-2 inline-block rounded-xl bg-slate-900/70 px-4 py-2 text-sm text-slate-400">
            Baseline vs projected emissions with location-aware monitoring.
          </p>
        </div>

        {/* Main layout (Option 1): decoupled left/right stacks */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: Current/Projected + Recommended */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Current CO₂e */}
            <div className="h-[320px] flex flex-col rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
              <p className="text-base text-slate-300">Current CO₂e</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                {formatNum(baselineCO2e)} kg
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Based on <span className="text-slate-300">{periodLabel}</span> of
                recorded activity.
              </p>

              <div className="mt-auto rounded-xl bg-slate-950/40 p-3 ring-1 ring-white/10">
                <p className="text-xs text-slate-500">Baseline</p>
                <p className="mt-1 text-sm text-slate-200">
                  This is your "no changes made" starting point for {location.name}.
                </p>
              </div>
            </div>

            {/* Projected CO₂e */}
            <div className="h-[320px] flex flex-col rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
              <p className="text-base text-slate-300">Projected CO₂e</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                {formatNum(projectedCO2e)} kg
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Estimated if selected changes are applied.
              </p>

              <div className="mt-auto flex items-center justify-between rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                <div>
                  <p className="text-xs text-slate-500">Change vs baseline</p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      deltaKg < 0 ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {deltaKg < 0 ? "▼" : "▲"} {formatNum(Math.abs(deltaKg))} kg (
                    {deltaPct.toFixed(1)}%)
                  </p>
                </div>
                <Badge
                  label={deltaKg < 0 ? "Improving" : "Rising"}
                  tone={deltaKg < 0 ? "good" : "bad"}
                />
              </div>
            </div>

            {/* Recommended actions */}
            <div className="sm:col-span-2 rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-100">
                    Recommended actions
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Based on your current emissions mix in{" "}
                    <span className="text-slate-200">{location.name}</span>.
                    Click “Simulate” to apply a small change and see the projected impact.
                  </p>
                </div>
                <Badge label="Auto" tone="neutral" />
              </div>

              <div className="mt-5 space-y-3">
                {recommendedActions.map((a) => (
                  <div
                    key={a.title}
                    className="flex flex-col gap-3 rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-100">
                          {a.title}
                        </p>
                        <Badge
                          label={`Priority: ${a.priority}`}
                          tone={priorityTone(a.priority)}
                        />
                      </div>

                      <p className="mt-1 text-xs text-slate-400">{a.reason}</p>

                      <p className="mt-2 text-xs text-slate-500">
                        Estimated upside:{" "}
                        <span className="text-slate-300">
                          ~{formatNum(a.impactKg)} kg CO₂e
                        </span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button onClick={a.onClick}>{a.cta}</Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          alert(
                            "Action added (demo). Next: store in localStorage/API."
                          )
                        }
                      >
                        Add to plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                <div>
                  <p className="text-xs text-slate-500">Tip</p>
                  <p className="mt-1 text-sm text-slate-200">
                    This panel helps users prioritise the biggest drivers instead of guessing.
                  </p>
                </div>
                <Button onClick={() => alert("Navigate to: /actions")}>
                  View action log
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Levers + Notes */}
          <div className="flex flex-col gap-6">
            {/* Reduction Levers */}
            <div className="rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
              <p className="text-base text-slate-300">Reduction Levers</p>

              <div className="mt-4 space-y-4">
                <SliderRow
                  label="Renewable Energy"
                  hint="Share of electricity supplied by renewables."
                  value={renewables}
                  onChange={setRenewables}
                  capHint={`Typical realistic max: ~${caps.renewables}%`}
                />
                <SliderRow
                  label="Building Efficiency"
                  hint="Operational efficiency improvements in buildings."
                  value={efficiency}
                  onChange={setEfficiency}
                  capHint={`Typical realistic max: ~${caps.efficiency}%`}
                />
                <SliderRow
                  label="Reduced Travel"
                  hint="Shift delivery model towards remote-first."
                  value={travel}
                  onChange={setTravel}
                  capHint={`Typical realistic max: ~${caps.travel}%`}
                />
              </div>

              {capWarnings.length > 0 ? (
                <div className="mt-5 rounded-xl bg-amber-500/10 p-4 ring-1 ring-amber-400/20">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-amber-200">⚠</span>
                    <div>
                      <p className="text-sm font-medium text-amber-200">
                        Reality check
                      </p>
                      <ul className="mt-2 list-disc pl-5 text-xs text-amber-100/90">
                        {capWarnings.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Notes */}
            <div className="rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
              <h3 className="text-base font-semibold text-slate-100">Notes</h3>
              <p className="mt-2 text-sm text-slate-400">
                Recommendations use simple rules today. Swap in your approved
                methodology later without changing the UI.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-slate-500">Model transparency</p>
                  <p className="mt-1 text-slate-200">
                    Assumptions are documented under “View assumptions”.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-slate-500">Data quality</p>
                  <p className="mt-1 text-slate-200">
                    Confidence can vary by source and location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Donut + Weather + Map */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Emissions by source */}
          <div className="h-[320px] flex flex-col lg:col-span-4 rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
            <DonutChart title="Emissions by source" segments={donutSegments} />
            <div className="mt-auto rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
              <div className="text-xs text-slate-500">Why this matters</div>
              <div className="mt-1 text-sm text-slate-200">
                It tells you what to prioritise first (e.g., heating vs electricity vs transport).
              </div>
            </div>
          </div>

          {/* Weather monitoring */}
          <div className="h-[320px] flex flex-col lg:col-span-4 rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  Weather monitoring
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Live conditions for {location.name}. Useful for operational context (heating/cooling demand).
                </div>
              </div>
              <Badge
                label={
                  weatherStatus === "loading"
                    ? "Loading"
                    : weatherStatus === "error"
                    ? "Unavailable"
                    : "Live"
                }
                tone={
                  weatherStatus === "error"
                    ? "bad"
                    : weatherStatus === "loading"
                    ? "neutral"
                    : "good"
                }
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                <div className="text-xs text-slate-500">Temperature</div>
                <div className="mt-2 text-3xl font-semibold">
                  {weather ? `${Math.round(weather.tempC)}°C` : "—"}
                </div>
              </div>
              <div className="rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
                <div className="text-xs text-slate-500">Wind</div>
                <div className="mt-2 text-3xl font-semibold">
                  {weather ? `${Math.round(weather.windKph)} km/h` : "—"}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-950/40 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Conditions</div>
                  <div className="mt-1 text-sm text-slate-200">
                    {weather ? weatherCodeToText(weather.code) : "—"}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 text-right">
                  {weather?.time ? (
                    <>
                      Updated
                      <div className="text-slate-400">{weather.time}</div>
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto text-[11px] text-slate-500">
              Note: Weather does not change the carbon number directly here; it provides operational context.
            </div>
          </div>

          {/* Global locations */}
          <div className="lg:col-span-4 rounded-xl bg-slate-900/70 p-5 ring-1 ring-white/10 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  Global locations
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Sites plotted across regions. Select a site to update the dashboard.
                </div>
              </div>
              <Badge label={`${LOCATIONS.length} sites`} tone="neutral" />
            </div>

            <div className="mt-5 rounded-xl bg-slate-950/40 p-3 ring-1 ring-white/10">
              <svg width="100%" height={mapH} viewBox={`0 0 ${mapW} ${mapH}`} className="block">
                <rect x="0" y="0" width={mapW} height={mapH} rx="14" fill="rgba(255,255,255,0.03)" />
                {[...Array(6)].map((_, i) => {
                  const y = (mapH / 6) * i;
                  return (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={y}
                      x2={mapW}
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                    />
                  );
                })}
                {[...Array(10)].map((_, i) => {
                  const x = (mapW / 10) * i;
                  return (
                    <line
                      key={`v-${i}`}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2={mapH}
                      stroke="rgba(255,255,255,0.06)"
                    />
                  );
                })}

                {LOCATIONS.map((l) => {
                  const p = projectPoint(l.lon, l.lat, mapW, mapH);
                  const isSelected = l.key === locationKey;

                  return (
                    <g key={l.key} className="cursor-pointer" onClick={() => setLocationKey(l.key)}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isSelected ? 7 : 5}
                        fill={isSelected ? "rgba(56,189,248,0.95)" : "rgba(45,212,191,0.85)"}
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isSelected ? 14 : 10}
                        fill="transparent"
                        stroke={isSelected ? "rgba(56,189,248,0.35)" : "rgba(45,212,191,0.25)"}
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {LOCATIONS.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLocationKey(l.key)}
                  className={`rounded-full px-3 py-1 text-xs ring-1 transition ${
                    l.key === locationKey
                      ? "bg-sky-400/15 text-sky-200 ring-sky-400/30"
                      : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              Selected: <span className="text-slate-300">{location.name}</span> ({location.country})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
