import { useEffect, useState } from "react";

const STEPS = [
  "Detecting facial regions…",
  "Sampling skin undertones…",
  "Mapping to seasonal palette…",
  "Calculating color harmony…",
  "Generating recommendations…",
];

export function AnalysisLoader() {

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 1.4, 100);
        const stepIndex = Math.min(Math.floor((next / 100) * STEPS.length), STEPS.length - 1);
        setStep(stepIndex);
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative h-32 w-32">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--muted)" strokeWidth="6" />
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-medium text-foreground">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="w-full space-y-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${i <= step ? "bg-accent" : "bg-muted"}`} />
            <span className={`transition-colors duration-300 ${i === step ? "text-foreground font-medium" : i < step ? "text-muted-foreground" : "text-muted-foreground/40"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
