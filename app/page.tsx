"use client";

import { useState, type FormEvent } from "react";
import SpecView from "@/components/SpecView";
import type { Spec } from "@/lib/types";

// Step 1: 입력 내용과 관계없이 화면 확인용 예시를 보여줍니다.
const mockSpec: Spec = {
  product_name: "팀메이트",
  one_liner: "해커톤에 함께 참가할 팀원을 찾는 서비스",
  problem: "해커톤 직전에 팀을 구하지 못해 참가를 포기한다.",
  target_users: [
    { persona: "처음 참가하는 대학생", pain: "함께할 팀원을 어디서 찾아야 할지 모른다." },
    { persona: "팀원을 찾는 팀장", pain: "팀에 필요한 역할을 가진 사람을 찾기 어렵다." },
  ],
  core_features: [
    { name: "프로필 카드 작성", description: "이름, 역할, 사용 가능한 기술을 입력한다.", priority: "P0" },
    { name: "역할별 팀원 찾기", description: "필요한 역할로 프로필 목록을 좁혀 본다.", priority: "P0" },
    { name: "팀 참가 요청", description: "함께하고 싶은 팀에 참가 요청을 보낸다.", priority: "P0" },
    { name: "팀 채팅", description: "팀원끼리 대화한다. 기본 기능을 완성한 뒤 추가한다.", priority: "P1" },
  ],
  user_flow: ["프로필을 작성한다.", "필요한 역할을 선택한다.", "프로필 목록을 확인한다.", "팀 참가 요청을 보낸다."],
  screens: [{ name: "프로필 작성", purpose: "내 역할과 기술을 등록한다." }, { name: "팀원 목록", purpose: "팀원을 찾고 참가 요청을 보낸다." }],
  data_model: [{ table: "profiles", columns: ["id uuid", "name text", "role text", "stack text"] }, { table: "requests", columns: ["id uuid", "profile_id uuid", "team_id uuid", "status text"] }],
  api_endpoints: [{ method: "GET", path: "/api/profiles", description: "역할별 프로필을 조회한다." }, { method: "POST", path: "/api/requests", description: "팀 참가 요청을 저장한다." }],
  out_of_scope: ["결제", "실시간 알림", "고급 추천 알고리즘"],
  risks: ["처음에는 등록된 프로필이 적을 수 있다.", "24시간 안에 채팅까지 구현하기 어려울 수 있다."],
  first_prompt: "docs/PRD.md를 읽고 P0인 프로필 카드 작성 화면부터 만들어 줘. 먼저 계획을 보여 줘.",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [spec, setSpec] = useState<Spec | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setSpec(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSpec(mockSpec);
    setIsLoading(false);
  }

  const inputStyle = "mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-14">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">PRD 메이커</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">아이디어를 해커톤에서 만들 수 있는 계획으로.</p>
        </div>
        <a href="/specs" aria-disabled="true" onClick={(event) => event.preventDefault()} title="목록은 Step 3에서 연결합니다" className="text-sm text-[var(--muted)]">내 PRD 목록 (준비 중)</a>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <label className="block text-sm font-medium">
          아이디어 이름
          <input name="title" required maxLength={100} placeholder="해커톤 팀원 매칭 서비스" className={inputStyle} />
        </label>
        <label className="block text-sm font-medium">
          해결하려는 문제
          <textarea name="problem" required maxLength={1000} rows={3} placeholder="해커톤 직전에 팀을 구하지 못해 참가를 포기해요" className={inputStyle} />
        </label>
        <label className="block text-sm font-medium">
          타깃 유저 <span className="font-normal text-[var(--muted)]">(선택)</span>
          <input name="target" placeholder="해커톤에 처음 참가하는 대학생" className={inputStyle} />
        </label>
        <label className="block text-sm font-medium">
          개발 기간
          <select name="timeframe" className={inputStyle} defaultValue="해커톤 24시간">
            <option>해커톤 24시간</option><option>1주</option><option>1달</option>
          </select>
        </label>
        <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 font-medium text-[var(--card)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-wait disabled:opacity-60">
          {isLoading ? "PRD 작성 중... (10~30초)" : "PRD 만들기"}
        </button>
        <p className="text-xs leading-5 text-[var(--muted)]">지금은 화면 확인 단계예요. 입력 내용과 관계없이 1초 뒤 같은 예시 PRD가 표시돼요.</p>
      </form>

      <div aria-live="polite" aria-busy={isLoading} className="mt-8">
        {isLoading && <p role="status" className="text-sm text-[var(--muted)]">PRD를 준비하고 있어요...</p>}
        {spec && <SpecView spec={spec} />}
      </div>
    </main>
  );
}
