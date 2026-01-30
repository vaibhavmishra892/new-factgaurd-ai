import React from "react";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Vaibhav Mishra",
    role: "Team Lead",
    desc: "System architecture & project direction",
    image: "/photos/vaibhav.jpeg",
    linkedin: "https://www.linkedin.com/in/vaibhav-mishra-31a175295/",
  },
  {
    name: "Krish Goyal",
    role: "Backend & AI Agents",
    desc: "AI agents, data pipelines & core logic",
    image: "/photos/krish.jpeg",
    linkedin: "https://www.linkedin.com/in/krish-goyal-a0bba3306/",
  },
  {
    name: "Prakhar Katiyar",
    role: "Frontend & Deployment",
    desc: "React frontend & deployment pipeline",
    image: "/photos/prakhar.jpeg",
    linkedin: "https://www.linkedin.com/in/prakhar-katiyar-988ab4294/",
  },
  {
    name: "Tushar Bharadwaj",
    role: "UI / UX Design",
    desc: "Interface design & user experience",
    image: "/photos/tushar.jpeg",
    linkedin: "https://www.linkedin.com/in/tushar-bhardwaj-b10118377/",
  },
];

export default function AboutUs() {
  return (
    <div className="container mx-auto px-6 py-20">

      <h2 className="text-3xl font-bold text-center mb-14 body-text">
        Meet the Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {team.map((m, i) => (
          <div key={i} className="flex flex-col items-center">

            {/* FLIP CARD */}
            <div className="perspective w-full">
              <div className="flip-card">

                {/* FRONT */}
                <div className="flip-face glass-panel flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-lg font-bold body-text">
                    {m.name}
                  </h3>
                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mt-2">
                    {m.role}
                  </p>
                  <p className="body-text-muted text-sm mt-4">
                    {m.desc}
                  </p>
                </div>

                {/* BACK (PHOTO) */}
                <div className="flip-face flip-back glass-panel">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

              </div>
            </div>

            {/* LINKEDIN BELOW CARD */}
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>

          </div>
        ))}
      </div>
    </div>
  );
}
