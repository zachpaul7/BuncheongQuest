"use client";

import { useEffect, useMemo, useState } from "react";
import { getProgress } from "@/lib/progress";
import { genVerificationCode } from "@/lib/verify";
import { useRouter } from "next/navigation";

export default function Reward() {
  const router = useRouter();
  const [progress, setProgress] = useState<boolean[]>(Array(7).fill(false));
  const cleared = useMemo(() => progress.filter(Boolean).length, [progress]);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const p = getProgress();
    if (p.filter(Boolean).length !== 7) {
      router.replace("/");
      return;
    }
    setProgress(p);
    (async () => setCode(await genVerificationCode()))();
  }, [router]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 select-none text-5xl animate-confetti">
          🎉
        </div>
        <h1 className="mt-4 text-2xl font-extrabold">미션 완료!</h1>
        <p className="mt-2 text-sm text-gray-600">수고했네. 보상 수령 ㄱ</p>

        <div className="mt-4 rounded-xl bg-sky-50 p-4">
          <div className="text-sm text-gray-600">진행도</div>
          <div className="text-xl font-bold text-sky-700">{cleared}/7</div>
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-4 text-left">
          <div className="text-xs text-gray-500">검증 코드</div>
          <div className="mt-1 font-mono text-lg">{code || "..."}</div>
          <div className="mt-2 text-xs text-gray-500">
            * 오늘 날짜와 기기 힌트로 생성됨. 당일만 유효 취급 권장.
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-3 text-sm text-gray-700">
          캡처해서 관리자에게 보여주세요.
        </div>
      </div>
    </main>
  );
}
