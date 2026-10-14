"use client";

import { useState, type ReactNode } from "react";

/** A short quiz built only from verified article content. */
export function Quiz({ questions }: { questions: { q: string; options: string[]; answer: number; explain: ReactNode }[] }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-[4px] border border-rule bg-paper-raised p-8 text-center" aria-live="polite">
        <p className="display-xl text-f-text-accent">
          {score}/{questions.length}
        </p>
        <p className="display-sm mt-3">{score === questions.length ? "Every answer right." : score >= questions.length / 2 ? "A good reading." : "Worth another look at the chapters above."}</p>
        <button
          type="button"
          className="label mt-6 rounded-full bg-f-accent px-5 py-2 font-semibold text-white"
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="label text-ink-3">
        Question {i + 1} of {questions.length}
      </p>
      <fieldset className="mt-3">
        <legend className="display-md">{q.q}</legend>
        <div className="mt-6 grid gap-3">
          {q.options.map((o, k) => {
            const state = picked === null ? "idle" : k === q.answer ? "right" : k === picked ? "wrong" : "idle";
            return (
              <button
                key={k}
                type="button"
                disabled={picked !== null}
                onClick={() => {
                  setPicked(k);
                  if (k === q.answer) setScore((s) => s + 1);
                }}
                aria-describedby={picked !== null ? "quiz-feedback" : undefined}
                className={`flex items-center justify-between rounded-[4px] border-2 px-5 py-3.5 text-left text-[1.05rem] transition-colors ${
                  state === "right" ? "border-forest bg-forest/10" : state === "wrong" ? "border-vermilion bg-vermilion/10" : "border-rule hover:border-f-accent disabled:hover:border-rule"
                }`}
              >
                <span>{o}</span>
                {state === "right" ? <span className="label font-semibold text-forest">Correct</span> : state === "wrong" ? <span className="label font-semibold text-vermilion">Not quite</span> : null}
              </button>
            );
          })}
        </div>
      </fieldset>
      {picked !== null ? (
        <div id="quiz-feedback" className="mt-6 border-l-2 border-f-accent pl-4" aria-live="polite">
          <p className="leading-relaxed text-ink-2">{q.explain}</p>
          <button
            type="button"
            className="label mt-4 rounded-full bg-f-accent px-5 py-2 font-semibold text-white"
            onClick={() => {
              if (i === questions.length - 1) setDone(true);
              else {
                setI(i + 1);
                setPicked(null);
              }
            }}
          >
            {i === questions.length - 1 ? "See your score" : "Next question"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
