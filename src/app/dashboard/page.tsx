"use client";

import { useEffect, useState } from "react";

type TabKey = "overview" | "perks" | "cards" | "alerts" | "insights";
type Segment = "homebody" | "traveler" | "foodie" | "roadwarrior" | "student" | "family";

export default function DashboardPage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [segment, setSegment] = useState<Segment>("homebody");

  useEffect(() => {
    const s = (localStorage.getItem("userSegment") as Segment) || "homebody";
    setSegment(s);
  }, []);

  const data = getPreset(segment);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#F9FBFD] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Top header badges */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xl font-semibold text-gray-900">SoundSmart</div>
            <div className="text-sm text-gray-500">AI Financial Co-Pilot for Sound Credit Union Members</div>
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

        {/* Hero Savings card */}
        <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-6 sm:p-8 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm/6 opacity-90">Your Savings This Month</div>
              <div className="mt-1 text-5xl font-semibold">{data.savingsThisMonth}</div>
              <div className="mt-2 text-sm/6 opacity-90">
                Automatically saved • Earning 4.5% APY • On track for {data.projectedYearly}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-2xl bg-white/15 px-6 py-5 text-center backdrop-blur border border-white/25">
                <div className="text-xs/5 opacity-90">SoundScore</div>
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

        {/* Tab content */}
        {tab === "overview" && <OverviewTab data={data} />}
        {tab === "perks" && <PerksTab data={data} />}
        {tab === "cards" && <CardsTab data={data} />}
        {tab === "alerts" && <AlertsTab data={data} />}
        {tab === "insights" && <InsightsTab data={data} />}
      </div>
    </main>
  );
}

/* ===================== PRESET DATA ===================== */

function getPreset(segment: Segment) {
  switch (segment) {
    case "traveler":
      return {
        balance: "$265.80",
        soundScore: 82,
        savingsThisMonth: "$68.40",
        projectedYearly: "$820.80/year",
        autoDeposits: [
          { title: "Visa hotel portfolio credit", date: "Nov 7, 2025", amt: "+$45.00" },
          { title: "Airport lounge pass used", date: "Nov 6, 2025", amt: "+$9.00" },
          { title: "Rideshare category bonus", date: "Nov 5, 2025", amt: "+$4.40" },
          { title: "Airline bag fee waived", date: "Nov 3, 2025", amt: "+$10.00" },
        ],
        journal: [
          { cat: "Travel & Hotels", amt: "$84.00", items: ["Visa Signature hotel credit ($45)", "Lounge pass value ($9)"] },
          { cat: "Dining & Entertainment", amt: "$26.40", items: ["Airport dining 3% back ($6.40)"] },
          { cat: "Rideshare", amt: "$11.00", items: ["Uber/Lyft category bonus ($4.40)"] },
        ],
        perks: [
          { title: "Hotel Portfolio Benefits", chip: "Sound Cash Back Card", how: "Book via Visa Signature hotel portal for credits", est: "$100–500/trip" },
          { title: "Visa Signature Concierge Service", chip: "Sound Cash Back Card", how: "Call the number on back of card for travel help", est: "$50–200/use" },
          { title: "TSA PreCheck/Global Entry Credit", chip: "Sound Rewards Card", how: "Pay the fee with card for reimbursement", est: "$78–100/4yr" },
        ],
        cardRecs: [
          { cat: "Flights", amount: "$420/month", btn: "Sound Rewards Card", extra: "+$6.30 / mo" },
          { cat: "Hotels", amount: "$650/month", btn: "Sound Cash Back Card", extra: "+$10.00 / mo" },
          { cat: "Rideshare", amount: "$180/month", optimized: true },
        ],
        alerts: {
          saved: "$24.10",
          missed: "$7.85",
          recent: [
            { name: "Marriott", place: "San Jose, CA • 3h ago", amt: "$45.00", ok: "✓" },
            { name: "Uber", place: "San Jose, CA • 1d ago", amt: "$4.40", ok: "✓" },
            { name: "United", place: "Online • 2d ago", amt: "$10.00", ok: "…" },
          ],
          example: "✈️ You're at SEA. Book through Visa Hotels for $100 on-property credit.",
        },
        insights: [
          { title: "Bundle hotel+flight", detail: "Your trips could save ~$22/mo via packages.", icon: "🧳", color: "bg-blue-50 border-blue-200" },
          { title: "Use hotel portfolio", detail: "Next trip gets $100 credit + breakfast.", icon: "🏨", color: "bg-blue-50 border-blue-200" },
          { title: "Rideshare off-peak", detail: "Travel off-peak to cut surge costs ~8–12%.", icon: "🚕", color: "bg-amber-50 border-amber-200" },
        ],
      };

    case "foodie":
      return {
        balance: "$132.20",
        soundScore: 75,
        savingsThisMonth: "$39.80",
        projectedYearly: "$477.60/year",
        autoDeposits: [
          { title: "5% dining cash back", date: "Nov 8, 2025", amt: "+$7.80" },
          { title: "Coffee shop bonus", date: "Nov 7, 2025", amt: "+$1.20" },
          { title: "Delivery fee waived", date: "Nov 6, 2025", amt: "+$3.50" },
          { title: "Restaurant partner discount", date: "Nov 5, 2025", amt: "+$6.40" },
        ],
        journal: [
          { cat: "Dining & Coffee", amt: "$28.50", items: ["5% dining cash back ($7.80)", "Delivery fee waived ($3.50)"] },
          { cat: "Groceries", amt: "$8.60", items: ["Grocery 3% category bonus ($3.60)"] },
          { cat: "Transportation", amt: "$2.70", items: ["Gas 1% from card default ($2.70)"] },
        ],
        perks: [
          { title: "Local Restaurant Network", chip: "Sound Cash Back Card", how: "Pay with your card at partner restaurants", est: "5–10% off" },
          { title: "Food Delivery Perk", chip: "Sound Rewards Card", how: "Activate partner promo in rewards portal", est: "$0–3 fees" },
          { title: "Event Tickets Presale", chip: "Visa Signature", how: "Use presale code via benefits hub", est: "Varies" },
        ],
        cardRecs: [
          { cat: "Dining", amount: "$850/month", btn: "Sound Cash Back Card", extra: "+$4.25 / mo" },
          { cat: "Delivery", amount: "$160/month", btn: "Sound Rewards Card", extra: "+$1.60 / mo" },
          { cat: "Groceries", amount: "$420/month", optimized: true },
        ],
        alerts: {
          saved: "$14.60",
          missed: "$4.30",
          recent: [
            { name: "Chipotle", place: "Seattle, WA • 1h ago", amt: "$3.40", ok: "✓" },
            { name: "Starbucks", place: "Bellevue, WA • 1d ago", amt: "$1.20", ok: "✓" },
            { name: "DoorDash", place: "Online • 2d ago", amt: "$3.50", ok: "…" },
          ],
          example: "🍔 You're at a partner restaurant — pay with Cash Back Card for 5%.",
        },
        insights: [
          { title: "Rotate delivery passes", detail: "Only keep one delivery subscription active — save ~$6–9/mo.", icon: "🛵", color: "bg-amber-50 border-amber-200" },
          { title: "Lunch special windows", detail: "Your spots offer 11–2pm discounts; average 8% cheaper.", icon: "⏰", color: "bg-emerald-50 border-emerald-200" },
          { title: "Brew at home 2x/week", detail: "Could save ~$14/mo based on your coffee pattern.", icon: "☕", color: "bg-purple-50 border-purple-200" },
        ],
      };

    case "roadwarrior":
      return {
        balance: "$171.10",
        soundScore: 79,
        savingsThisMonth: "$44.90",
        projectedYearly: "$538.80/year",
        autoDeposits: [
          { title: "Gas station rewards", date: "Nov 8, 2025", amt: "+$5.10" },
          { title: "Tire rotation coupon", date: "Nov 6, 2025", amt: "+$12.00" },
          { title: "Partner fuel discount", date: "Nov 4, 2025", amt: "+$6.80" },
          { title: "Car wash bundle pass", date: "Nov 2, 2025", amt: "+$2.40" },
        ],
        journal: [
          { cat: "Gas & Transportation", amt: "$24.30", items: ["Partner fuel discount ($6.80)", "Gas station rewards ($5.10)"] },
          { cat: "Dining (drive-through)", amt: "$12.10", items: ["Quick-serve category bonus ($3.40)"] },
          { cat: "Maintenance", amt: "$8.50", items: ["Tire rotation coupon ($12.00)"] },
        ],
        perks: [
          { title: "Fuel Partner Network", chip: "Sound Rewards Card", how: "Link card in rewards portal for cents-off/gal", est: "$0.05–0.10/gal" },
          { title: "Auto Service Discounts", chip: "Sound Credit Union", how: "Show digital member card at partner shops", est: "10–20% off" },
          { title: "Roadside Assistance", chip: "Visa", how: "Activate via card benefits page", est: "$0 dispatch fee" },
        ],
        cardRecs: [
          { cat: "Gas", amount: "$320/month", btn: "Sound Rewards Card", extra: "+$1.60 / mo" },
          { cat: "Maintenance", amount: "$140/month", btn: "Sound Rewards Card", extra: "+$1.40 / mo" },
          { cat: "Dining (fast)", amount: "$210/month", optimized: true },
        ],
        alerts: {
          saved: "$18.80",
          missed: "$5.20",
          recent: [
            { name: "Shell Gas", place: "Tacoma, WA • 3h ago", amt: "$2.80", ok: "✓" },
            { name: "Jiffy Lube", place: "Seattle, WA • 1d ago", amt: "$12.00", ok: "✓" },
            { name: "Chevron", place: "Bellevue, WA • 3d ago", amt: "$3.20", ok: "…" },
          ],
          example: "⛽ You’re at Shell — Rewards Card active for extra cents off/gal.",
        },
        insights: [
          { title: "Refuel mid-week", detail: "Wednesday prices in your area trend lower by ~3–5%.", icon: "📉", color: "bg-emerald-50 border-emerald-200" },
          { title: "Bundle car wash", detail: "Annual pass is cheaper than 8 single washes/mo.", icon: "🧽", color: "bg-blue-50 border-blue-200" },
          { title: "Stack fuel + card", detail: "Link the Rewards Card and the station app to stack savings.", icon: "🪙", color: "bg-amber-50 border-amber-200" },
        ],
      };

    case "student":
      return {
        balance: "$96.40",
        soundScore: 72,
        savingsThisMonth: "$28.10",
        projectedYearly: "$337.20/year",
        autoDeposits: [
          { title: "Student plan discount", date: "Nov 8, 2025", amt: "+$4.99" },
          { title: "Transit pass savings", date: "Nov 7, 2025", amt: "+$2.50" },
          { title: "Campus bookstore promo", date: "Nov 5, 2025", amt: "+$7.20" },
          { title: "Used meal plan wisely", date: "Nov 3, 2025", amt: "+$3.10" },
        ],
        journal: [
          { cat: "Subscriptions", amt: "$12.19", items: ["Student music/video bundles ($4.99)"] },
          { cat: "Books & Supplies", amt: "$9.70", items: ["Bookstore promo ($7.20)"] },
          { cat: "Transit", amt: "$6.21", items: ["Pass savings ($2.50)"] },
        ],
        perks: [
          { title: "Student Checking Perks", chip: "Sound Credit Union", how: "Enable fee waivers in the student portal", est: "$3–12/mo" },
          { title: "Campus Deals", chip: "Sound Credit Union", how: "Browse local student discounts in-app", est: "5–20% off" },
          { title: "Cell Phone Protection", chip: "Rewards Card", how: "Pay your bill with the card to activate", est: "$600/claim" },
        ],
        cardRecs: [
          { cat: "Subscriptions", amount: "$55/month", btn: "Sound Cash Back Card", extra: "+$0.55 / mo" },
          { cat: "Groceries", amount: "$240/month", btn: "Sound Cash Back Card", extra: "+$1.20 / mo" },
          { cat: "Transit", amount: "$60/month", optimized: true },
        ],
        alerts: {
          saved: "$10.30",
          missed: "$3.40",
          recent: [
            { name: "Spotify/Apple", place: "Online • 2h ago", amt: "$4.99", ok: "✓" },
            { name: "UW Bookstore", place: "Seattle, WA • 1d ago", amt: "$7.20", ok: "✓" },
            { name: "Link Light Rail", place: "Seattle, WA • 3d ago", amt: "$2.50", ok: "…" },
          ],
          example: "🎧 Student deal detected — confirm your .edu for extra savings.",
        },
        insights: [
          { title: "Share subscriptions", detail: "Split costs with roommates — cut 20–40% on streaming.", icon: "👥", color: "bg-purple-50 border-purple-200" },
          { title: "Used textbooks", detail: "Your courses have cheaper used editions at partner stores.", icon: "📚", color: "bg-emerald-50 border-emerald-200" },
          { title: "Meal prep 1×/wk", detail: "Replace two takeouts/week to save ~$22/mo.", icon: "🍲", color: "bg-amber-50 border-amber-200" },
        ],
      };

    case "family":
      return {
        balance: "$312.45",
        soundScore: 81,
        savingsThisMonth: "$72.60",
        projectedYearly: "$871.20/year",
        autoDeposits: [
          { title: "Bulk grocery discount", date: "Nov 8, 2025", amt: "+$14.30" },
          { title: "Warehouse membership perks", date: "Nov 6, 2025", amt: "+$9.50" },
          { title: "Kids’ activities credit", date: "Nov 4, 2025", amt: "+$6.80" },
          { title: "Pharmacy savings", date: "Nov 3, 2025", amt: "+$4.60" },
        ],
        journal: [
          { cat: "Groceries & Household", amt: "$36.20", items: ["Bulk discount ($14.30)", "Warehouse perks ($9.50)"] },
          { cat: "Kids & School", amt: "$22.80", items: ["Activity credit ($6.80)"] },
          { cat: "Health & Pharmacy", amt: "$13.60", items: ["Rx savings ($4.60)"] },
        ],
        perks: [
          { title: "Warehouse Club Benefits", chip: "Sound Credit Union", how: "Link membership in benefits hub", est: "Varies" },
          { title: "Family Activity Discounts", chip: "Sound Credit Union", how: "Use partner list for kids’ programs", est: "10–25% off" },
          { title: "Purchase Protection", chip: "Rewards Card", how: "Use card for big purchases; keep receipts", est: "$1,000+/claim" },
        ],
        cardRecs: [
          { cat: "Groceries", amount: "$1,100/month", btn: "Sound Cash Back Card", extra: "+$5.50 / mo" },
          { cat: "Pharmacy", amount: "$180/month", btn: "Sound Rewards Card", extra: "+$1.80 / mo" },
          { cat: "Gas", amount: "$260/month", optimized: true },
        ],
        alerts: {
          saved: "$26.90",
          missed: "$8.40",
          recent: [
            { name: "Costco", place: "Renton, WA • 2h ago", amt: "$14.30", ok: "✓" },
            { name: "Little Gym", place: "Bellevue, WA • 1d ago", amt: "$6.80", ok: "✓" },
            { name: "Walgreens", place: "Seattle, WA • 2d ago", amt: "$4.60", ok: "…" },
          ],
          example: "🛒 Costco trip — use Cash Back Card + member coupon stack.",
        },
        insights: [
          { title: "Auto-ship basics", detail: "Set monthly auto-ship for diapers & detergents to save 5–10%.", icon: "📦", color: "bg-blue-50 border-blue-200" },
          { title: "Rx price compare", detail: "Use partner tool to compare pharmacy prices — often 15% lower.", icon: "💊", color: "bg-emerald-50 border-emerald-200" },
          { title: "Meal plan Sundays", detail: "Plan 4 dinners to cut midweek takeout by ~30%.", icon: "🗓️", color: "bg-amber-50 border-amber-200" },
        ],
      };

    default: // homebody
      return {
        balance: "$147.35",
        soundScore: 78,
        savingsThisMonth: "$43.20",
        projectedYearly: "$518.40/year",
        autoDeposits: [
          { title: "Used Costco member discount", date: "Nov 7, 2025", amt: "+$12.50" },
          { title: "Cash back on dining", date: "Nov 6, 2025", amt: "+$8.40" },
          { title: "Used optimal card for gas", date: "Nov 5, 2025", amt: "+$3.25" },
          { title: "Grocery category bonus", date: "Nov 4, 2025", amt: "+$5.60" },
        ],
        journal: [
          { cat: "Shopping & Groceries", amt: "$31.80", items: ["Costco member discount ($12.50)", "Grocery 3% back ($5.60)"] },
          { cat: "Dining & Entertainment", amt: "$26.80", items: ["Cash back at restaurants ($8.40)"] },
          { cat: "Gas & Transportation", amt: "$14.80", items: ["Gas station rewards ($3.25)"] },
        ],
        perks: [
          { title: "Workshop: Budgeting", chip: "Sound Credit Union", how: "Sign up in the member portal for the next free session", est: "$150 value" },
          { title: "Visa Signature Concierge", chip: "Sound Cash Back Card", how: "For dining reservations & events", est: "$50–200/use" },
          { title: "Cell Phone Protection", chip: "Sound Rewards Card", how: "Pay your monthly bill with the card", est: "$600/claim" },
        ],
        cardRecs: [
          { cat: "Groceries", amount: "$920/month", btn: "Sound Cash Back Card", extra: "+$4.60 / mo" },
          { cat: "Dining", amount: "$680/month", btn: "Sound Cash Back Card", extra: "+$3.40 / mo" },
          { cat: "Gas", amount: "$240/month", optimized: true },
        ],
        alerts: {
          saved: "$15.75",
          missed: "$6.85",
          recent: [
            { name: "Costco", place: "Seattle, WA • 2 hours ago", amt: "$12.50", ok: "✓" },
            { name: "Olive Garden", place: "Tacoma, WA • 1 day ago", amt: "$6.85", ok: "✕" },
            { name: "Shell Gas", place: "Seattle, WA • 2 days ago", amt: "$3.25", ok: "✓" },
          ],
          example: "📍 You're at Costco! Use your Cash Back Card for 5% back.",
        },
        insights: [
          { title: "You could save on streaming", detail: "Rotate one service monthly to save ~$18/mo.", icon: "📺", color: "bg-purple-50 border-purple-200" },
          { title: "Buy groceries mid-week", detail: "Wed–Thu discounts average 4–7% lower.", icon: "🛒", color: "bg-emerald-50 border-emerald-200" },
          { title: "Use gas rewards", detail: "Your route passes a partner station — +$3–5/mo.", icon: "⛽", color: "bg-amber-50 border-amber-200" },
        ],
      };
  }
}

/* ===================== TABS & SECTIONS ===================== */

function OverviewTab({ data }: { data: ReturnType<typeof getPreset> }) {
  return (
    <>
      {/* Score + Savings */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ScoreCard score={data.soundScore} />
        <SavingsCard balance={data.balance} autoDeposits={data.autoDeposits} />
      </section>

      {/* Monthly Benefit Journal */}
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Monthly Benefit Journal</div>
            <div className="text-gray-900 font-semibold">November 2025</div>
          </div>
          <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
            Download
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryTile label="Recovered" value={data.balance} />
          <SummaryTile label="Savings Balance" value={data.balance} sub="@ 4.5% APY" />
          <SummaryTile label="SoundScore" value={`${data.soundScore}/100`} violet />
        </div>

        <div className="mt-6 divide-y divide-gray-100">
          {data.journal.map((g) => (
            <div key={g.cat} className="py-4">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-gray-900">{g.cat}</div>
                <div className="font-semibold text-emerald-600">{g.amt}</div>
              </div>
              <ul className="mt-2 space-y-2">
                {g.items.map((i: string) => (
                  <li key={i} className="rounded-lg border border-black/5 bg-gray-50 p-3 text-sm text-gray-700">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function PerksTab({ data }: { data: ReturnType<typeof getPreset> }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-gray-900 font-semibold">Benefits You Haven’t Used</div>
        <div className="text-xs text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded-full">
          {data.perks.length} Unused
        </div>
      </div>

      <div className="space-y-4">
        {data.perks.map((b) => (
          <div key={b.title} className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-900">{b.title}</div>
                  <span className="text-xs rounded-full border border-gray-300 bg-white px-2 py-0.5 text-gray-700">
                    {b.chip}
                  </span>
                </div>
                <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-gray-700">
                  <div className="text-xs text-blue-700/80 mb-1">How to use:</div>
                  {b.how}
                </div>
                <div className="mt-1 text-xs text-gray-500">Last used: Never</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-amber-700">{b.est}</div>
                <button className="mt-3 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-white/60 bg-white">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CardsTab({ data }: { data: ReturnType<typeof getPreset> }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="text-lg font-semibold text-gray-900">Smart Card Recommendations</div>
      <div className="mt-1 text-sm text-gray-500">
        AI analyzed your last 30 days of spending and suggests these optimizations 👇
      </div>

      <div className="mt-4 space-y-4">
        {data.cardRecs.map((r: any, idx: number) => (
          <div key={idx} className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-gray-900 font-medium">{r.cat}</div>
                <div className="text-sm text-gray-600">{r.amount}</div>
              </div>
              <div className="text-right">
                {r.optimized ? (
                  <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-2 py-1">
                    ✓ Optimized
                  </span>
                ) : (
                  <div className="text-amber-700 text-sm font-semibold">
                    Potential Extra <br /> {r.extra}
                  </div>
                )}
              </div>
            </div>

            {!r.optimized && (
              <div className="mt-4 rounded-xl border border-amber-300 bg-white p-4">
                <div className="text-sm">
                  Switch to <span className="font-semibold">{r.btn}</span>
                </div>
                <button className="mt-3 w-full rounded-lg bg-orange-600 text-white py-2 text-sm">
                  Set as Default
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AlertsTab({ data }: { data: ReturnType<typeof getPreset> }) {
  const [testAlert, setTestAlert] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-900">Real-Time SMS Alerts</div>
          <div className="text-sm text-gray-600">Get notified at the moment of purchase</div>
        </div>
        <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-3 py-1 border border-emerald-200">
          Enabled
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
          <div className="text-sm font-semibold text-emerald-700">Saved via Alerts</div>
          <div className="mt-1 text-2xl font-bold text-emerald-700">{data.alerts.saved}</div>
        </div>
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
          <div className="text-sm font-semibold text-rose-700">Missed</div>
          <div className="mt-1 text-2xl font-bold text-rose-700">{data.alerts.missed}</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="text-xs text-blue-700/80 mb-1">Example SMS:</div>
        <div className="text-gray-800">{data.alerts.example}</div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium text-gray-900 mb-2">Recent Alerts</div>
        <ul className="space-y-2">
          {data.alerts.recent.map((a: any) => (
            <li key={a.name} className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-3">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {a.name} <span className="text-xs text-gray-400">{a.ok}</span>
                </div>
                <div className="text-xs text-gray-500">{a.place}</div>
              </div>
              <div className="text-sm font-semibold text-emerald-600">{a.amt}</div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setTestAlert(personaHint(data))}
        className="mt-6 w-full rounded-lg bg-blue-600 text-white py-3 text-sm font-medium hover:bg-blue-700 transition active:scale-[0.98]"
      >
        Send Test Alert
      </button>

      {testAlert && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          {testAlert}
        </div>
      )}
    </section>
  );
}

function personaHint(data: ReturnType<typeof getPreset>) {
  // quick copy tweak for the “Send Test Alert” button
  if (data.cardRecs.some((r: any) => r.cat === "Flights")) {
    return "✈️ You're at SFO — Rewards Card earns extra on rideshare today.";
  }
  if (data.cardRecs.some((r: any) => r.cat.includes("Dining"))) {
    return "🍔 You're at a partner restaurant — pay with Cash Back Card for 5% back.";
  }
  if (data.cardRecs.some((r: any) => r.cat === "Gas")) {
    return "⛽ You’re at Shell — Rewards Card linked for cents off/gal.";
  }
  return "📍 You're at Costco! Use your Cash Back Card for 5% back.";
}

/* ================ SHARED PARTS ================ */

function Tab({
  name,
  active = false,
  onClick,
}: {
  name: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 transition",
        active ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50",
      ].join(" ")}
    >
      {name}
    </button>
  );
}

function ScoreCard({ score }: { score: number }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="text-sm text-gray-500">Your SoundScore</div>
      <div className="text-gray-900 font-semibold">How well you're optimizing your finances</div>

      <div className="mt-6 flex items-center gap-6">
        <CircleScore value={score} />
        <div className="flex-1 space-y-3">
          <Meter label="Perk Usage" value={22} max={25} color="bg-emerald-500" />
          <Meter label="Card Optimization" value={18} max={25} color="bg-blue-500" />
          <Meter label="Spending Awareness" value={20} max={25} color="bg-emerald-500" />
          <Meter label="Benefit Discovery" value={18} max={25} color="bg-blue-500" />
        </div>
      </div>
    </div>
  );
}

function SavingsCard({
  balance,
  autoDeposits,
}: {
  balance: string;
  autoDeposits: { title: string; date: string; amt: string }[];
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="text-sm text-gray-500">SoundGrow Savings</div>
      <div className="text-gray-900 font-semibold">High-yield savings @ 4.5% APY</div>

      <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-6 text-center">
        <div className="text-xs text-emerald-700/80">Total Balance</div>
        <div className="mt-1 text-4xl font-semibold text-emerald-700">{balance}</div>
        <div className="mt-1 grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500">This Month</div>
            <div className="font-medium text-emerald-700">Auto-deposits</div>
          </div>
          <div>
            <div className="text-gray-500">Interest</div>
            <div className="font-medium text-emerald-700">+$2.15</div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium text-gray-900">Recent Auto-Deposits</div>
        <ul className="mt-3 space-y-2">
          {autoDeposits.map((t) => (
            <li key={t.title} className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-3">
              <div>
                <div className="text-sm font-medium text-gray-900">{t.title}</div>
                <div className="text-xs text-gray-500">{t.date}</div>
              </div>
              <div className="text-sm font-semibold text-emerald-600">{t.amt}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CircleScore({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - pct / 100);
  return (
    <div className="relative h-28 w-28">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="#8B5CF6"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-semibold text-violet-700">{value}</div>
          <div className="text-xs text-gray-500">/100</div>
          <div className="mt-1 text-xs text-gray-600">Good</div>
        </div>
      </div>
    </div>
  );
}

function Meter({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="tabular-nums">
          {value}/{max}
        </span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  sub,
  violet = false,
}: {
  label: string;
  value: string;
  sub?: string;
  violet?: boolean;
}) {
  return (
    <div className={`rounded-xl p-5 ${violet ? "bg-violet-50 border border-violet-100" : "bg-emerald-50 border border-emerald-100"}`}>
      <div className={`text-xs ${violet ? "text-violet-700/80" : "text-emerald-700/80"}`}>{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${violet ? "text-violet-700" : "text-emerald-700"}`}>{value}</div>
      {sub ? <div className="text-xs text-gray-500">{sub}</div> : null}
    </div>
  );
}
