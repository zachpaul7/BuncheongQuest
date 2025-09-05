"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProgress, setCleared } from "@/lib/progress";
import { getQuizById } from "@/lib/quiz";

type Q = {
  q: string;
  choices: string[];
  answerIndex: number;
};

export default function QRQuizPage() {
  const { id } = useParams<{ id: string }>(); // "QR1" ...
  const router = useRouter();
  const quiz = useMemo(() => getQuizById(String(id)), [id]);
  const [selected, setSelected] = useState<number[]>(
    Array(quiz.questions.length).fill(-1)
  );
  const [result, setResult] = useState<"idle" | "ok" | "no">("idle");

  useEffect(() => {
    // 이미 클리어면 안내
    const idx = quiz.index;
    if (getProgress()[idx]) {
      // 이미 클리어
    }
  }, [quiz]);

  const check = () => {
    const allAnswered = selected.every((v) => v >= 0);
    if (!allAnswered) {
      setResult("no");
      return;
    }
    const ok = quiz.questions.every(
      (q: Q, i: number) => q.answerIndex === selected[i]
    );
    if (ok) {
      setCleared(quiz.index, true);
      setResult("ok");
      setTimeout(() => router.push("/"), 700);
    } else {
      setResult("no");
    }
  };

  return (
    <main className="px-4 py-6">
      <button
        onClick={() => router.back()}
        className="mb-3 text-sm text-sky-600"
      >
        ← 뒤로
      </button>
      <h1 className="text-xl font-bold">{id} 미션</h1>
      <p className="mt-1 text-sm text-gray-600">{quiz.title}</p>

      <div className="mt-4 space-y-4">
        {quiz.questions.map((q: Q, qi: number) => (
          <div key={qi} className="rounded-xl bg-white p-4 shadow">
            <div className="font-medium">
              {qi + 1}. {q.q}
            </div>
            <div className="mt-3 space-y-2">
              {q.choices.map((c, ci) => {
                const active = selected[qi] === ci;
                return (
                  <button
                    key={ci}
                    onClick={() =>
                      setSelected((prev) => {
                        const n = [...prev];
                        n[qi] = ci;
                        return n;
                      })
                    }
                    className={`w-full rounded-lg border px-3 py-2 text-left ${
                      active
                        ? "border-sky-500 bg-sky-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6">
        <button
          onClick={check}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 text-white"
        >
          제출하기
        </button>
        {result === "ok" && (
          <p className="mt-2 text-center text-green-600">
            정답! 스탬프 획득 🎉
          </p>
        )}
        {result === "no" && (
          <p className="mt-2 text-center text-red-600">
            오답이 있어. 다시 체크 ㄱ
          </p>
        )}
      </div>
    </main>
  );
}
