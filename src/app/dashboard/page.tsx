"use client";

import { useEffect, useState } from "react";

/* ===== Types ===== */
type TabKey = "overview" | "perks" | "cards" | "alerts" | "insights";

type AutoDeposit = { title: string; date: string; amt: string };
type ProgressRow = { label: string; value: number; max: number; color: string };
type Perk = { title: string; chip: string; est: string; howTitle: string; howText: string; lastUsed?: string };
type CardRec = { cat: string; amount: string; btn: string; extra: string; note?: string };
type AlertItem = { name: string; place: string; amt: string; status: "ok" | "missed" | "pending" };
type Insight = { icon: string; title: string; detail: string };
type JournalGroup = { cat: string; amt: string; items: string[] };

type Preset = {
  header: { savingsThisMonth: string; projectedYearly: string; soundScore: number };
  scoreCard: { score: number; verdict: "Good" | "Excellent" | "Fair"; progress: ProgressRow[] };
  soundGrow: { total: string; thisMonth: string; interest: string; apy: string };
  deposits: AutoDeposit[];
  journalSummary: { recovered: string; savingsBalance: string; savingsApy: string; soundScore: string; monthLabel: string };
  perks: Perk[];
  cardRecs: CardRec[];
  alerts: { saved: string; missed: string; recent: AlertItem[]; example: string };
  insights: Insight[];
  journal: JournalGroup[];
};

/* ===== Local demo data (used if API fails/missing) ===== */
function getLocalPreset(): Preset {
  return {
    header: { savingsThisMonth: "$43.20", projectedYearly: "$518.40/year", soundScore: 78 },
    scoreCard: {
      score: 78,
      verdict: "Good",
      progress: [
        { label: "Perk Usage", value: 22, max: 25, color: "bg-emerald-500" },
        { label: "Card Optimization", value: 18, max: 25, color: "bg-blue-500" },
        { label: "Spending Awareness", value: 20, max: 25, color: "bg-emerald-500" },
        { label: "Benefit Discovery", value: 18, max: 25, color: "bg-blue-500" },
      ],
    },
    soundGrow: { total: "$147.35", thisMonth: "+$43.20", interest: "+$2.15", apy: "4.5% APY" },
    deposits: [
      { title: "Used Costco member discount", date: "Nov 7, 2025", amt: "+$12.50" },
      { title: "Cash back on dining", date: "Nov 6, 2025", amt: "+$8.40" },
      { title: "Used optimal card for gas", date: "Nov 5, 2025", amt: "+$3.25" },
      { title: "Hotel discount applied", date: "Nov 4, 2025", amt: "+$45.00" },
    ],
    journalSummary: {
      recovered: "$147.35",
      savingsBalance: "$147.35",
      savingsApy: "@ 4.5% APY",
      soundScore: "78/100",
      monthLabel: "November 2025",
    },
    perks: [
      {
        title: "Visa Signature Concierge Service",
        chip: "Sound Cash Back Card",
        est: "$50–200/use",
        howTitle: "How to use:",
        howText: "Call the number on the back of your Sound Cash Back Card and ask for concierge service",
        lastUsed: "Never used",
      },
      {
        title: "Hotel Portfolio Benefits",
        chip: "Sound Cash Back Card",
        est: "$100–500/trip",
        howTitle: "How to use:",
        howText: "Book through the Visa Signature hotel portal when planning travel",
        lastUsed: "Last used: Never",
      },
      {
        title: "Early Paycheck Access",
        chip: "Sound Credit Union",
        est: "$0 (time value)",
        howTitle: "How to use:",
        howText: "Set up direct deposit to your Sound checking account",
        lastUsed: "Last used: Never",
      },
    ],
    cardRecs: [
      { cat: "Dining", amount: "$680/month", btn: "Sound Cash Back Card", extra: "+$3.40 / mo" },
      { cat: "Groceries", amount: "$920/month", btn: "Sound Cash Back Card", extra: "+$4.60 / mo" },
      { cat: "Gas", amount: "$240/month", btn: "Sound Rewards Card", extra: "+$1.20 / mo" },
    ],
    alerts: {
      saved: "$15.75",
      missed: "$6.85",
      example: "📍 You're at Costco! Use your Cash Back Card for 5% back.",
      recent: [
        { name: "Costco", place: "Seattle, WA • 2 hours ago", amt: "$12.50", status: "ok" },
        { name: "Olive Garden", place: "Tacoma, WA • 1 day ago", amt: "$6.85", status: "missed" },
        { name: "Shell Gas", place: "Seattle, WA • 2 days ago", amt: "$3.25", status: "ok" },
        { name: "Amazon", place: "Online • 3 days ago", amt: "$6.25", status: "pending" },
      ],
    },
    insights: [
      { icon: "🛒", title: "Buy groceries mid-week", detail: "Wed–Thu discounts average 4–7% lower." },
      { icon: "⛽", title: "Fill up on Mondays", detail: "Stations are ~2–3% cheaper Mon/Tue in your area." },
      { icon: "🏨", title: "Use hotel portals", detail: "Signature portal adds perks worth $25–$60/night." },
    ],
    journal: [
      { cat: "Shopping & Groceries", amt: "$31.80", items: ["Costco member discount ($12.50)"] },
      { cat: "Dining & Entertainment", amt: "$42.50", items: ["Restaurants cash back ($18.40)"] },
      { cat: "Travel & Hotels", amt: "$58.25", items: ["Visa Signature hotel discount ($45.00)"] },
      { cat: "Gas & Transportation", amt: "$14.80", items: ["Gas station rewards ($3.25/fill-up)"] },
    ],
  };
}

/* ===== Page ===== */
export default function DashboardPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [data, setData] = useState<Preset>(getLocalPreset()); // start with demo so tabs never look empty
  const [usingMock, setUsingMock] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
    if (!BASE) {
      setApiError("Missing NEXT_PUBLIC_API_BASE_URL; using demo data.");
      return;
    }

    let cancelled = false;

    async function load() {
      setApiError(null);
      try {
        // Adjust these endpoints to match your FastAPI /docs
        const [
          summaryRes,
          perksRes,
          cardsRes,
          alertsRes,
          insightsRes,
          journalRes,
          depositsRes,
        ] = await Promise.all([
          fetch(`${BASE}/dashboard/summary`).then((r) => r.ok ? r.json() : null),
          fetch(`${BASE}/perks/unused`).then((r) => r.ok ? r.json() : []),
          fetch(`${BASE}/cards/recommendations`).then((r) => r.ok ? r.json() : []),
          fetch(`${BASE}/alerts/recent`).then((r) => r.ok ? r.json() : null),
          fetch(`${BASE}/insights`).then((r) => r.ok ? r.json() : []),
          fetch(`${BASE}/journal`).then((r) => r.ok ? r.json() : []),
          fetch(`${BASE}/deposits/recent`).then((r) => r.ok ? r.json() : []),
        ]);

        if (cancelled) return;

        const local = getLocalPreset();

        // Merge API data over the local template, field-by-field with strong fallbacks
        const assembled: Preset = {
          header: {
            savingsThisMonth: summaryRes?.savingsThisMonth ?? local.header.savingsThisMonth,
            projectedYearly: summaryRes?.projectedYearly ?? local.header.projectedYearly,
            soundScore: Number(summaryRes?.soundScore ?? local.header.soundScore),
          },
          scoreCard: {
            score: Number(summaryRes?.soundScore ?? local.scoreCard.score),
            verdict: (summaryRes?.verdict as "Good" | "Excellent" | "Fair") ?? local.scoreCard.verdict,
            progress: Array.isArray(summaryRes?.progress) ? summaryRes.progress : local.scoreCard.progress,
          },
          soundGrow: {
            total: summaryRes?.balance ?? local.soundGrow.total,
            thisMonth: summaryRes?.thisMonth ?? local.soundGrow.thisMonth,
            interest: summaryRes?.interest ?? local.soundGrow.interest,
            apy: summaryRes?.apy ?? local.soundGrow.apy,
          },
          deposits: Array.isArray(depositsRes) ? depositsRes : local.deposits,
          journalSummary: {
            recovered: summaryRes?.recovered ?? local.journalSummary.recovered,
            savingsBalance: summaryRes?.balance ?? local.journalSummary.savingsBalance,
            savingsApy: summaryRes?.apy ? `@ ${summaryRes.apy}` : local.journalSummary.savingsApy,
            soundScore: `${summaryRes?.soundScore ?? local.header.soundScore}/100`,
            monthLabel: summaryRes?.monthLabel ?? local.journalSummary.monthLabel,
          },
          perks: Array.isArray(perksRes) ? perksRes : local.perks,
          cardRecs: Array.isArray(cardsRes) ? cardsRes : local.cardRecs,
          alerts: {
            saved: alertsRes?.saved ?? local.alerts.saved,
            missed: alertsRes?.missed ?? local.alerts.missed,
            example: alertsRes?.example ?? local.alerts.example,
            recent: Array.isArray(alertsRes?.recent) ? alertsRes.recent : local.alerts.recent,
          },
          insights: Array.isArray(insightsRes) ? insightsRes : local.insights,
          journal: Array.isArray(journalRes) ? journalRes : local.journal,
        };

        setData(assembled);
        setUsingMock(false);
      } catch (e: any) {
        setApiError(e?.message || "Failed to reach API; using demo data.");
        setUsingMock(true);
        setData(getLocalPreset());
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F8FB]">
      {(usingMock || apiError) && (
        <div className="bg-amber-50 border-y border-amber-200 text-amber-800 text-sm px-4 py-2 text-center">
          {apiError ?? "Using demo data."}
        </div>
      )}

      {/* Banner */}
      <section className="mx-auto mt-10 w-full max-w-5xl rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 sm:p-8 text-white shadow-md">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm leading-6 opacity-90">Your Savings This Month</div>
            <div className="mt-1 text-5xl font-semibold">{data.header.savingsThisMonth}</div>
            <div className="mt-2 text-sm leading-6 opacity-90">
              Automatically saved • Earning 4.5% APY • On track for {data.header.projectedYearly}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="rounded-2xl bg-white/15 px-6 py-5 text-center backdrop-blur border border-white/25">
              <div className="text-xs leading-5 opacity-90">SoundScore</div>
              <div className="mt-1 text-3xl font-semibold">{data.header.soundScore}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="mx-auto mt-5 w-full max-w-5xl">
        <div className="flex items-center justify-between rounded-full border border-black/10 bg-white p-1 text-sm shadow-sm">
          <Tab name="Overview" icon="↯" active={tab === "overview"} onClick={() => setTab("overview")} />
          <Tab name="My Perks" icon="📈" active={tab === "perks"} onClick={() => setTab("perks")} />
          <Tab name="Cards" icon="💳" active={tab === "cards"} onClick={() => setTab("cards")} />
          <Tab name="Alerts" icon="📱" active={tab === "alerts"} onClick={() => setTab("alerts")} />
          <Tab name="Insights" icon="🔎" active={tab === "insights"} onClick={() => setTab("insights")} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
        {tab === "overview" && <OverviewTab data={data} />}
        {tab === "perks" && <PerksTab data={data} />}
        {tab === "cards" && <CardsTab data={data} />}
        {tab === "alerts" && <AlertsTab data={data} />}
        {tab === "insights" && <InsightsTab data={data} />}
      </div>
    </main>
  );
}

/* ===== Components ===== */

function Tab({
  name, icon, active, onClick,
}: { name: string; icon?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
        active ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon && <span className="opacity-70">{icon}</span>}
      {name}
    </button>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-gray-900">{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function CircularScore({ score, size = 144, strokeWidth = 12 }: { score: number; size?: number; strokeWidth?: number; }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EDE9FE" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
          className="text-violet-600" strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-4xl font-semibold text-violet-700">{clamped}</div>
          <div className="text-xs text-gray-400">/100</div>
        </div>
      </div>
    </div>
  );
}

/* ----- Overview ----- */
function OverviewTab({ data }: { data: Preset }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SectionCard title="Your SoundScore" subtitle="How well you're optimizing your finances">
        <div className="flex items-center gap-6">
          <CircularScore score={data.scoreCard?.score ?? 0} />
          <div className="min-w-0">
            <div className="text-gray-700 font-medium">{data.scoreCard?.verdict ?? "Good"}</div>
            <div className="mt-4 space-y-4">
              {(data.scoreCard?.progress ?? []).map((row) => {
                const pct = Math.round((row.value / row.max) * 100);
                return (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{row.label}</span>
                      <span>{row.value}/{row.max}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-gray-100">
                      <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="SoundGrow Savings" subtitle={`High-yield savings @ ${data.soundGrow?.apy ?? "4.5% APY"}`}>
        <div className="rounded-xl bg-emerald-50 p-5 text-center">
          <div className="text-xs text-emerald-800/80">Total Balance</div>
          <div className="mt-1 text-4xl font-semibold text-emerald-700">{data.soundGrow?.total ?? "$0.00"}</div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-emerald-700/70">This Month</div>
              <div className="font-semibold text-emerald-700">{data.soundGrow?.thisMonth ?? "+$0.00"}</div>
            </div>
            <div>
              <div className="text-emerald-700/70">Interest</div>
              <div className="font-semibold text-emerald-700">{data.soundGrow?.interest ?? "+$0.00"}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-sm text-gray-500">Recent Auto-Deposits</div>
        <ul className="mt-2 divide-y divide-gray-100">
          {(data.deposits ?? []).map((d) => (
            <li key={d.title} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-900">{d.title}</div>
                <div className="text-xs text-gray-500">{d.date}</div>
              </div>
              <div className="font-semibold text-emerald-600">{d.amt}</div>
            </li>
          ))}
          {(data.deposits ?? []).length === 0 && (
            <li className="py-3 text-sm text-gray-500">No deposits yet.</li>
          )}
        </ul>
      </SectionCard>

      <section className="lg:col-span-2 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-900">Monthly Benefit Journal</div>
            <div className="text-xs text-gray-500">{data.journalSummary?.monthLabel ?? "This month"}</div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
            ⬇️ Download
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryPill label="Recovered" value={data.journalSummary?.recovered ?? "$0.00"} color="emerald" />
          <SummaryPill label="Savings Balance" value={data.journalSummary?.savingsBalance ?? "$0.00"} sub={data.journalSummary?.savingsApy ?? "@ 4.5% APY"} color="blue" />
          <SummaryPill label="SoundScore" value={data.journalSummary?.soundScore ?? "0/100"} color="violet" />
        </div>

        <div className="mt-6 text-sm text-gray-700">Recovered by Category</div>
        {(data.journal ?? []).map((j) => (
          <CategoryRow key={j.cat} title={j.cat} value={j.amt} hint="" note={j.items[0] ?? ""} />
        ))}
        {(data.journal ?? []).length === 0 && (
          <div className="mt-3 text-sm text-gray-500">No journal entries yet.</div>
        )}
      </section>
    </div>
  );
}

/* ----- Perks ----- */
function PerksTab({ data }: { data: Preset }) {
  const perks = data.perks ?? [];
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="mb-4">
        <div className="text-lg font-semibold text-gray-900">Benefits You Haven’t Used</div>
        <div className="text-sm text-gray-600">Activate these to boost your SoundScore</div>
      </div>

      {perks.length === 0 ? (
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500">No perks to show.</div>
      ) : (
        <div className="space-y-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-xl border border-amber-200 bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <div className="text-gray-900 font-medium">{p.title}</div>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{p.chip}</span>
                    <span className="ml-auto text-sm font-semibold text-orange-600 sm:ml-0">{p.est}</span>
                  </div>
                  <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-gray-700">
                    <div className="mb-1 text-gray-600">ⓘ {p.howTitle}</div>
                    <div>{p.howText}</div>
                  </div>
                  {p.lastUsed && <div className="mt-2 text-xs text-gray-500">{p.lastUsed}</div>}
                </div>
                <button className="shrink-0 self-start rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                  Learn More ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ----- Cards ----- */
function CardsTab({ data }: { data: Preset }) {
  const cards = data.cardRecs ?? [];
  if (cards.length === 0) {
    return (
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm text-sm text-gray-500">
        No card recommendations yet.
      </section>
    );
  }
  return (
    <section className="space-y-3">
      {cards.map((r, idx) => (
        <div key={idx} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-gray-900 font-medium">{r.cat}</div>
              <div className="text-sm text-gray-600">{r.amount}</div>
              {r.note && <div className="text-xs text-gray-500 mt-1">{r.note}</div>}
            </div>
            <div className="text-right">
              <div className="text-amber-700 text-sm">Potential Extra</div>
              <div className="text-amber-700 font-semibold">{r.extra}</div>
              <button className="mt-2 w-full rounded-lg bg-orange-600 text-white px-4 py-1.5 text-sm">
                Set as Default
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ----- Alerts ----- */
function AlertsTab({ data }: { data: Preset }) {
  const [test, setTest] = useState<string | null>(null);
  const recent = data.alerts?.recent ?? [];

  return (
    <section className="grid gap-6">
      <SectionCard title="Real-Time SMS Alerts">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-emerald-50 p-4">
            <div className="text-xs text-emerald-700">Saved via Alerts</div>
            <div className="text-2xl font-semibold text-emerald-700">{data.alerts?.saved ?? "$0.00"}</div>
          </div>
          <div className="rounded-lg bg-rose-50 p-4">
            <div className="text-xs text-rose-700">Missed</div>
            <div className="text-2xl font-semibold text-rose-700">{data.alerts?.missed ?? "$0.00"}</div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          <div className="font-medium mb-1">Example SMS:</div>
          {data.alerts?.example ?? "—"}
        </div>

        <button
          onClick={() => setTest(data.alerts?.example ?? "Test alert")}
          className="mt-4 w-full rounded-lg bg-blue-600 text-white py-2 text-sm"
        >
          Send Test Alert
        </button>

        {test && <div className="mt-3 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{test}</div>}
      </SectionCard>

      <SectionCard title="Recent Alerts">
        {recent.length === 0 ? (
          <div className="text-sm text-gray-500">No recent alerts.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recent.map((a) => (
              <li key={a.name} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500">{a.place}</div>
                </div>
                <div
                  className={
                    a.status === "ok"
                      ? "text-emerald-600 font-semibold"
                      : a.status === "missed"
                      ? "text-rose-600 font-semibold"
                      : "text-gray-600 font-semibold"
                  }
                >
                  {a.amt}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </section>
  );
}

/* ----- Insights ----- */
function InsightsTab({ data }: { data: Preset }) {
  const insights = data.insights ?? [];
  return insights.length === 0 ? (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm text-sm text-gray-500">
      No insights yet.
    </section>
  ) : (
    <section className="grid gap-3">
      {insights.map((i) => (
        <div key={i.title} className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
          <div className="font-medium text-gray-900">
            {i.icon} {i.title}
          </div>
          <div className="text-sm text-gray-600 mt-1">{i.detail}</div>
        </div>
      ))}
    </section>
  );
}

/* ----- shared bits ----- */
function SummaryPill({ label, value, sub, color }: { label: string; value: string; sub?: string; color: "emerald" | "blue" | "violet" }) {
  const tone =
    color === "emerald"
      ? "text-emerald-700 bg-emerald-50"
      : color === "blue"
      ? "text-blue-700 bg-blue-50"
      : "text-violet-700 bg-violet-50";

  return (
    <div className={`rounded-xl ${tone} p-4`}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs opacity-80 mt-1">{sub}</div>}
    </div>
  );
}

function CategoryRow({ title, value, hint, note }: { title: string; value: string; hint: string; note: string }) {
  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-900 font-medium">{title}</div>
          {hint && <div className="text-xs text-gray-500">{hint}</div>}
        </div>
        <div className="text-emerald-600 font-semibold">{value}</div>
      </div>
      {note && <div className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-600">{note}</div>}
    </div>
  );
}
