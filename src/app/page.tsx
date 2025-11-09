"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Segment =
  | "homebody"
  | "traveler"
  | "foodie"
  | "roadwarrior"
  | "student"
  | "family";

export default function Home() {
  const router = useRouter();
  const [segment, setSegment] = useState<Segment | null>(null);

  function handleContinue() {
    if (!segment) return;
    localStorage.setItem("userSegment", segment);
    router.push("/connect");
  }

  const options: {
    key: Segment;
    title: string;
    desc: string;
    emoji: string;
  }[] = [
    { key: "homebody", title: "Homebody", desc: "Mostly groceries & local spending.", emoji: "🏠" },
    { key: "traveler", title: "Traveler", desc: "Flights, hotels, rideshare often.", emoji: "✈️" },
    { key: "foodie", title: "Eats Out A Lot", desc: "Restaurants, coffee shops, delivery.", emoji: "🍽️" },
    { key: "roadwarrior", title: "Always Driving", desc: "Gas stations, road trips, maintenance.", emoji: "⛽" },
    { key: "student", title: "Student Saver", desc: "Tight budget, subscriptions, books.", emoji: "🎓" },
    { key: "family", title: "Family Planner", desc: "Groceries in bulk, kids’ activities.", emoji: "👨‍👩‍👧‍👦" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#F9FBFD] grid place-items-center px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
        {/* LEFT: Marketing copy */}
        <section className="flex-1 space-y-6 text-gray-800">
          <div>
            <div className="mb-6 text-xl font-semibold text-gray-900">
              SoundSmart <span className="text-sm text-gray-500">for Sound Credit Union</span>
            </div>

            <h1 className="text-5xl font-semibold leading-tight text-gray-900">
              Your Money, <br /> Smarter
            </h1>
            <p className="mt-4 max-w-md text-gray-600 text-lg">
              Turn every dollar you save into investments. Discover unused perks.
              Get help before problems become overwhelming.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Feature
              color="bg-[#C7F5D9]"
              icon="📈"
              title="Micro-Investing Made Easy"
              desc="Invest savings from rewards, discounts, and avoided fees — automatically."
            />
            <Feature
              color="bg-[#E8D9FF]"
              icon="💎"
              title="Unlock Hidden Perks"
              desc="Hotel discounts, cash back, free workshops — personalized by how you spend."
            />
            <Feature
              color="bg-[#DDE7FF]"
              icon="💡"
              title="Early Help When You Need It"
              desc="AI wellness checks give proactive tips before problems become penalties."
            />
          </div>
        </section>

        {/* RIGHT: Sign-in card + user type */}
        <section className="flex-1">
          <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Welcome Back</h2>
            <p className="mt-1 text-center text-gray-500">Pick your vibe to personalize your dashboard</p>

            {/* User Type Picker */}
            <div className="mt-6">
              <div className="text-sm font-medium text-gray-700 mb-2">Choose your type</div>
              <div className="grid grid-cols-1 gap-3">
                {options.map((o) => (
                  <OptionCard
                    key={o.key}
                    selected={segment === o.key}
                    onClick={() => setSegment(o.key)}
                    title={o.title}
                    desc={o.desc}
                    emoji={o.emoji}
                  />
                ))}
              </div>
            </div>

            {/* Continue button */}
            <button
              onClick={handleContinue}
              disabled={!segment}
              className={`mt-4 block w-full rounded-lg text-center py-3 text-sm font-medium transition active:scale-[0.98] ${
                segment ? "bg-[#2563EB] text-white hover:opacity-95" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue with Sound Account
            </button>

            <div className="my-6 text-center text-xs text-gray-400">Powered by</div>
            <div className="text-center text-sm font-medium text-gray-700">Sound Credit Union</div>
            <p className="text-center text-xs text-gray-400">Member-focused banking since 1940</p>

            <div className="mt-6 rounded-lg bg-[#F5F9FF] border border-[#D5E3FF] p-4 text-xs text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">ⓘ</span>
                <p>Your data is encrypted and secure. We never store your Sound Credit Union password. Read-only access via secure OAuth.</p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  color,
  title,
  desc,
}: {
  icon: string;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  desc,
  emoji,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  emoji: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        selected ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-600">{desc}</div>
        </div>
      </div>
    </button>
  );
}
