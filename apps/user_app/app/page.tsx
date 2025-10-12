'use client';

import {
  Wallet,
  ArrowUpCircle,
  ArrowRightLeft,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import { Button } from "../components/Button";
import TypingLine from "../components/TyppingLine";
import {  useSession } from "next-auth/react";
import { Footer } from "../components/Footer";

export default function Page() {
  // const session = await getServerSession(authOptions);
  // if (session?.user) redirect('/dashboard');
  // else redirect('/api/auth/signin');
  const session = useSession();
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 to-indigo-100/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Section */}
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300 bg-blue-100/50">
                <Wallet className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Digital Wallet Solution
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Cashly
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Send money instantly, add funds effortlessly. Your digital
                wallet for modern life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <TypingLine
                  text="Your money, your control."
                  speed={60}
                  loop
                  className="text-lg font-medium text-blue-700"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Instant transfers</span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl flex items-center justify-center text-blue-600 font-semibold text-xl">
                <p>Digital Wallet Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything you need in a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                digital wallet
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience seamless money management with powerful features
              designed for your convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={ArrowUpCircle}
              title="Add Money"
              description="Easily add funds to your wallet from any bank account or card. Fast, secure, and hassle-free deposits whenever you need them."
            />
            <FeatureCard
              icon={ArrowRightLeft}
              title="Person to Person Transfer"
              description="Send money to friends and family instantly. Just enter their phone number or email and the amount – done in seconds."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                {
                  icon: Shield,
                  title: "Secure",
                  text: "Bank-grade encryption protects your money",
                },
                {
                  icon: Zap,
                  title: "Instant",
                  text: "Transfers complete in seconds",
                },
                {
                  icon: Users,
                  title: "Trusted",
                  text: "Millions of users worldwide",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <div key={i}>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {title}
                  </h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to simplify your finances?
          </h2>
          <p className="text-lg text-gray-600">
            Join millions who trust{" "}
            <span className="text-blue-600 font-semibold">Cashly</span> for
            their everyday transactions.
          </p>
    <Button
      href={session.data?.user ? "/dashboard" : "/signup"}
    >
      {session.data?.user ? "Go to Dashboard" : "Get Started"}
    </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
