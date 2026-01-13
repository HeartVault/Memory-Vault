import React from "react";
import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[130px]" />
        <div className="absolute bottom-[-160px] left-[-120px] h-[460px] w-[460px] rounded-full bg-green-400/10 blur-[140px]" />
        <div className="absolute top-1/2 right-[-160px] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-green-500/20 bg-zinc-950/70 backdrop-blur-xl shadow-[0_0_55px_rgba(34,197,94,0.09)] overflow-hidden">
        {/* Top highlight */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-green-500/45 to-transparent" />

        <div className="p-7">
          {/* Icon */}
          <div className="flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-400"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 text-center">
            <h1 className="text-xl font-semibold text-white">
              Email verified ✅
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Your account has been successfully verified. <br />
              You can now sign in and continue.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/15 to-transparent" />

          {/* CTA */}
          <div className="mt-6">
            <Link
              href="/auth/sign-in"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_50px_rgba(34,197,94,0.22)] transition hover:brightness-110 active:scale-[0.99]"
            >
              Continue to Sign In
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>

            <p className="mt-4 text-center text-xs text-zinc-500">
              If you didn’t verify this account, you can safely ignore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
