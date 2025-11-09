import Link from "next/link";

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#F9FBFD] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8 space-x-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">1</div>
            <span>Sign In</span>
          </div>
          <div className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">2</div>
            <span>Link Account</span>
          </div>
          <div className="h-px w-10 bg-gray-300" />
          <div className="flex items-center gap-2 opacity-50">
            <div className="h-6 w-6 rounded-full border border-gray-400 flex items-center justify-center text-xs font-bold">3</div>
            <span>Dashboard</span>
          </div>
        </div>

        {/* Welcome Header */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          Welcome, Sijin!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Link your Sound Credit Union account to unlock personalized insights.
        </p>

        {/* Access info box */}
        <div className="bg-[#F9FBFE] border border-[#D5E3FF] rounded-xl p-5 mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">What we'll access:</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>✅ Transaction History — to identify spending and savings patterns</li>
            <li>✅ Account Balances — to track your financial wellness and goals</li>
            <li>✅ Credit Card Rewards — to recommend cards for maximum benefits</li>
          </ul>
        </div>

        {/* Faux form (no event handlers) */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Sound CU Online Banking Username</label>
            <input
              type="email"
              placeholder="sijin@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Security info */}
          <div className="bg-[#F6FAFF] border border-[#D5E3FF] rounded-lg p-4 text-xs text-gray-600 leading-relaxed">
            🔒 Bank-level security with 256-bit encryption. Your credentials are encrypted and never stored.
          </div>

          {/* Continue -> Dashboard */}
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center font-medium py-3 rounded-lg hover:bg-blue-700 transition active:scale-[0.98]"
          >
            Securely Link Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Connection powered by Plaid — used by millions of users
        </p>
      </div>
    </main>
  );
}
