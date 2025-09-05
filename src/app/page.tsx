"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProgress, resetProgress } from "@/lib/progress";

const ids = ["QR1", "QR2", "QR3", "QR4", "QR5", "QR6", "QR7"];

export default function Home() {
  const [progress, setProgress] = useState<boolean[]>(Array(7).fill(false));

  useEffect(() => {
    setProgress(getProgress());
  }, []);
  const cleared = useMemo(() => progress.filter(Boolean).length, [progress]);
  const allClear = cleared === 7;

  return (
    <main className="px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">분청도자기 미션 챌린지</h1>
        <p className="text-sm text-gray-600">
          QR 탐험 + 퀴즈로 스탬프 7개 모아 보상 받기
        </p>
      </header>

      <section className="mb-4 rounded-xl bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm">진행도</div>
          <div className="text-sm font-semibold">{cleared}/7</div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
          <div
            className="h-2 bg-sky-500 transition-all"
            style={{ width: `${(cleared / 7) * 100}%` }}
          />
        </div>
      </section>

      <section className="rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-semibold">스탬프 랠리</h2>
        <div className="grid grid-cols-3 gap-3">
          {ids.map((id, i) => {
            const ok = progress[i];
            return (
              <Link
                key={id}
                href={`/qr/${id}`}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm ${
                  ok
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                } active:animate-pop`}
              >
                <div className="text-xs text-gray-500">{id}</div>
                <div className="mt-1 text-base font-bold">
                  {ok ? "클리어" : "도전"}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/reward"
            className={`rounded-lg px-4 py-2 text-center text-white ${
              allClear ? "bg-sky-600" : "bg-gray-400"
            } `}
          >
            보상 페이지
          </Link>
          <button
            onClick={() => {
              resetProgress();
              setProgress(getProgress());
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-600"
          >
            진행도 초기화
          </button>
        </div>
      </section>

      <footer className="mt-6 text-center text-xs text-gray-400">
        네트워크 없어도 작동. 캡처 인증 가능.
      </footer>
    </main>
  );
}
