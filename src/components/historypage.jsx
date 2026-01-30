import React from "react";
import { X, Trash2 } from "lucide-react";

export default function HistoryPage({ history, clearHistory, deleteItem }) {
  return (
    <main className="container mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold body-text">
          Verification History
        </h1>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {history.length === 0 && (
        <p className="body-text-muted text-center">
          No verification history available.
        </p>
      )}

      {/* HISTORY LIST */}
      <div className="space-y-3">
        {history.map((item, index) => (
          <div
            key={index}
            className="glass-panel px-4 py-3 flex items-center justify-between group hover:bg-white/5 transition"
          >
            <div>
              <p className="body-text text-sm font-medium">
                {item.text}
              </p>
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${
                  item.status === "VERIFIED"
                    ? "text-emerald-400"
                    : item.status === "CONTRADICTED"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* DELETE ON HOVER */}
            <button
              onClick={() => deleteItem(index)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition"
              title="Delete"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

    </main>
  );
}
