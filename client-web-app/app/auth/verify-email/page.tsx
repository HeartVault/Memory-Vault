import React from "react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[420px] w-[420px] rounded-full bg-green-400/10 blur-[130px]" />
      </div>

  
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-green-500/20 bg-zinc-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(34,197,94,0.08)]">
        <div className="p-7">
     
          <div className="flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-400"
              >
                <path
                  d="M4 8l8 5 8-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="mt-6 text-center">
            <h1 className="text-xl font-semibold text-white">
              Verify your email
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              We just sent a verification link to your email address. <br />
              Open your inbox and click the link to activate your account.
            </p>
          </div>

       
          <div className="mt-6 rounded-xl border border-green-500/10 bg-black/30 p-4">
            <p className="text-xs text-zinc-300">
              <span className="text-green-400 font-medium">Tip:</span> If you
              don’t see it, check your <span className="text-white">Spam</span>{" "}
              or <span className="text-white">Promotions</span> folder.
            </p>
          </div>

         
          <div className="mt-6 text-center text-xs text-zinc-500">
            You can close this tab after verifying.
          </div>
        </div>

      
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
      </div>
    </div>
  );
}
