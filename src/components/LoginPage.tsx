import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Shield, TrendingUp, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onGoogleLogin: () => void;
}

export function LoginPage({ onGoogleLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl text-slate-900">SoundSmart</h1>
              <p className="text-sm text-slate-600">for Sound Credit Union</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-5xl text-slate-900 mb-4">
              Your Money,<br />Smarter
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Turn every dollar you save into investments. Discover unused perks. 
              Get help before problems become overwhelming.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-green-100 rounded-lg h-fit">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Micro-Investing Made Easy</h3>
                  <p className="text-slate-600">
                    Get SMS alerts when you save money and invest it with one click. 
                    Every reward, every budget surplus, every fee you avoid.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-purple-100 rounded-lg h-fit">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Unlock Hidden Perks</h3>
                  <p className="text-slate-600">
                    Discover and use thousands in credit union benefits you didn't know existed. 
                    Hotel discounts, cash back, free workshops.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-blue-100 rounded-lg h-fit">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Early Help When You Need It</h3>
                  <p className="text-slate-600">
                    AI-powered wellness checks alert us when you might need support. 
                    We reach out early with solutions, not penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login Card */}
          <div>
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your personalized dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Google Sign In */}
                <Button 
                  onClick={onGoogleLogin}
                  variant="outline" 
                  className="w-full h-12 border-2 hover:bg-slate-50"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Powered by</span>
                  </div>
                </div>

                {/* Sound CU Logo */}
                <div className="text-center py-2">
                  <p className="text-sm text-slate-600">Sound Credit Union</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Member-focused banking since 1940
                  </p>
                </div>

                {/* Security Note */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-900">
                        Your data is encrypted and secure. We never store your Sound Credit Union 
                        password. Read-only access via secure OAuth.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-center text-slate-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}