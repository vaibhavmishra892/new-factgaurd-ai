import React from "react";

export default function HowItWorks() {
  return (
    <div className="container mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-cyan-400 mb-4">
          How It Works
        </h1>
        <p className="max-w-3xl body-text-muted text-lg">
          FactGuard operates through a coordinated multi-agent AI workflow that
          verifies claims using real-time intelligence, trusted data sources,
          and transparent reasoning.
        </p>
      </div>

      {/* STEPS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* PLANNER */}
        <div className="glass-panel p-8 hover:translate-y-[-4px] transition-all duration-300">
          <span className="text-purple-400 font-bold text-lg block mb-3">
            1. Planner Agent
          </span>
          <p className="body-text-muted leading-relaxed">
            Decomposes your claim into structured, verifiable facts and
            formulates effective search queries to guide the verification
            process.
          </p>
        </div>

        {/* EXECUTOR */}
        <div className="glass-panel p-8 hover:translate-y-[-4px] transition-all duration-300">
          <span className="text-purple-400 font-bold text-lg block mb-3">
            2. Executor Agent
          </span>
          <p className="body-text-muted leading-relaxed">
            Scours the web, trusted databases, and real-time APIs to gather
            relevant evidence from multiple authoritative sources.
          </p>
        </div>

        {/* EVALUATOR */}
        <div className="glass-panel p-8 hover:translate-y-[-4px] transition-all duration-300">
          <span className="text-purple-400 font-bold text-lg block mb-3">
            3. Evaluator Agent
          </span>
          <p className="body-text-muted leading-relaxed">
            Synthesizes all collected data to generate a final verdict,
            confidence score, and a clear, human-readable explanation.
          </p>
        </div>

      </div>

      {/* FOOT NOTE */}
      <div className="mt-20 max-w-4xl">
        <h2 className="text-2xl font-bold body-text mb-4">
          Why This Matters
        </h2>
        <p className="body-text-muted leading-relaxed">
          By distributing intelligence across specialized agents, FactGuard
          ensures faster verification, higher accuracy, and transparent
          reasoning — empowering users to trust information in an era of
          misinformation.
        </p>
      </div>

    </div>
  );
}
