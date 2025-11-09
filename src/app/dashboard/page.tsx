"use client";

import { useEffect, useMemo, useState } from "react";

/* ===================== Types ===================== */
type TabKey = "overview" | "perks" | "cards" | "alerts" | "insights";
type SegmentKey = "homebody";

type AutoDeposit = { title: string; date: string; amt: string };
type Perk = { title: string; chip: string; how: string; est: string };
type CardRec = { cat: string; amount: string; btn: string; extra: string };
type AlertItem = { name: string; place: string; amt: string; ok: string };
type Insight = { title: string; detail: string; icon: string };
type JournalGroup = { cat: string; amt: string; items: string[] };

type Preset = {
  balance: string;
  soundScore: number;
  savingsThisMonth: string;
  projectedYearly: string;
  autoDeposits: AutoDeposit[];
  perks: Perk[];
  cardRecs: CardRec[];
  alerts: {
    saved: string;
    missed: string;
    recent: AlertItem[];
    example: string;
  };
  insights: Insight[];
  journal: JournalGroup[];
};

/* ===================== Page ===================== */
export default function DashboardPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [segment, setSegment] = useState<SegmentKey>("homebody");

  // Read localStorage only on the client
  useEffect(() => {
    const s = (localStorage.getItem("userSegment") as SegmentKey) || "homebody";
    setSegment(s);
  }, []);

  const data = useMemo(() => getPreset(segment), [segment]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#F9FBFD] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xl font-semibold text-gray-900">SoundSmart</div>
            <div className="text-sm text-gray-500">
              AI Financial Co-Pilot for Sound Credit Union Members
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Profile: <span className="font-medium capitalize">{segment}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-right">
              <div className="text-gray-500">SoundGrow Balance</div>
              <div className="font-semibold text-emerald-600">{data.balance}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500">SoundScore</div>
              <div className="font-semibold text-violet-600">{data.soundScore}/100</div>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-6 sm:p-8 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm leading-6 opacity-90">Your Savings This Month</div>
              <div className="mt-1 text-5xl font-semibold">{data.savingsThisMonth}</div>
              <div className="mt-2 text-sm leading-6 opacity-90">
                Automatically saved • Earning 4.5% APY • On track for {data.projectedYearly}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-2xl bg-white/15 px-6 py-5 text-center backdrop-blur border border-white/25">
                <div className="text-xs leading-5 opacity-90">SoundScore</div>
                <div className="mt-1 text-3xl font-semibold">{data.soundScore}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex items-center justify-between rounded-full border border-black/10 bg-white p-1 text-sm shadow-sm">
            <Tab name="Overview" active={tab === "overview"} onClick={() => setTab("overview")} />
            <Tab name="My Perks" active={tab === "perks"} onClick={() => setTab("perks")} />
            <Tab name="Cards" active={tab === "cards"} onClick={() => setTab("cards")} />
            <Tab name="Alerts" active={tab === "alerts"} onClick={() => setTab("alerts")} />
            <Tab name="Insights" active={tab === "insights"} onClick={() => setTab("insights")} />
          </div>
        </div>

        {/* Content */}
        {tab === "overview" && <OverviewTab data={data} />}
        {tab === "perks" && <PerksTab data={data} />}
        {tab === "cards" && <CardsTab data={data} />}
        {tab === "alerts" && <AlertsTab data={data} />}
        {tab === "insights" && <InsightsTab data={data} />}
      </div>
    </main>
  );
}

/* ===================== Preset Data ===================== */
function getPreset(_segment: SegmentKey): Preset {
  // Only "homebody" demo for now
  return {
    balance: "$147.35",
    soundScore: 78,
    savingsThisMonth: "$43.20",
    projectedYearly: "$518.40/year",
    autoDeposits: [
      { title: "Used Costco member discount", date: "Nov 7, 2025", amt: "+$12.50" },
      { title: "Cash back on dining", date: "Nov 6, 2025", amt: "+$8.40" },
      { title: "Used optimal card for gas", date: "Nov 5, 2025", amt: "+$3.25" },
    ],
    perks: [
      { title: "Workshop: Budgeting", chip: "Sound Credit Union", how: "Sign up online", est: "$150 value" },
    ],
    cardRecs: [
      { cat: "Groceries", amount: "$920/month", btn: "Sound Cash Back Card", extra: "+$4.60 / mo" },
    ],
    alerts: {
      saved: "$15.75",
      missed: "$6.85",
      recent: [{ name: "Costco", place: "Seattle, WA", amt: "$12.50", ok: "✓" }],
      example: "📍 You're at Costco! Use your Cash Back Card for 5% back.",
    },
    insights: [
      { title: "Buy groceries mid-week", detail: "Wed–Thu discounts average 4–7% lower.", icon: "🛒" },
    ],
    journal: [
      { cat: "Shopping & Groceries", amt: "$31.80", items: ["Costco discount ($12.50)"] },
    ],
  };
}

/* ===================== Components ===================== */
function Tab({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 transition ${
        active ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {name}
    </button>
  );
}

function OverviewTab({ data }: { data: Preset }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="text-sm text-gray-500">Your SoundScore</div>
      <div className="text-gray-900 font-semibold">How well you're optimizing your finances</div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-violet-700">{data.soundScore}/100</div>
      </div>
    </section>
  );
}

function PerksTab({ data }: { data: Preset }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="text-gray-900 font-semibold mb-4">Unused Perks</div>
      {data.perks.map((p) => (
        <div key={p.title} className="rounded-xl border border-amber-200 bg-white p-4 mb-2">
          <div className="font-medium">{p.title}</div>
          <div className="text-sm text-gray-600">{p.how}</div>
          <div className="text-xs text-gray-400 mt-1">{p.est}</div>
        </div>
      ))}
    </section>
  );
}

function CardsTab({ data }: { data: Preset }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="text-lg font-semibold text-gray-900 mb-4">Card Recommendations</div>
      {data.cardRecs.map((r, idx) => (
        <div key={idx} className="rounded-xl border border-amber-200 bg-white p-4 mb-2">
          <div className="font-medium">{r.cat}</div>
          <div className="text-sm text-gray-600">{r.amount}</div>
          <div className="text-xs text-amber-700 mt-1">{r.extra}</div>
        </div>
      ))}
    </section>
  );
}

function AlertsTab({ data }: { data: Preset }) {
  const [alert, setAlert] = useState<string | null>(null);
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="font-semibold text-gray-900 mb-4">Recent Alerts</div>
      {data.alerts.recent.map((a) => (
        <div key={a.name} className="flex justify-between p-3 border-b border-gray-100">
          <div>
            <div className="font-medium">{a.name}</div>
            <div className="text-xs text-gray-500">{a.place}</div>
          </div>
          <div className="text-emerald-600 font-semibold">{a.amt}</div>
        </div>
      ))}
      <button
        onClick={() => setAlert(data.alerts.example)}
        className="mt-4 w-full rounded-lg bg-blue-600 text-white py-2 text-sm"
      >
        Send Test Alert
      </button>
      {alert && <div className="mt-3 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{alert}</div>}
    </section>
  );
}

function InsightsTab({ data }: { data: Preset }) {
  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <div className="font-semibold text-gray-900 mb-4">Insights</div>
      {data.insights.map((i) => (
        <div key={i.title} className="p-3 border border-blue-100 bg-white rounded-lg mb-2">
          <div>
            {i.icon} {i.title}
          </div>
          <div className="text-sm text-gray-600">{i.detail}</div>
        </div>
      ))}
    </section>
  );
}
