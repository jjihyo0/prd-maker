import type { ReactNode } from "react";
import type { Spec } from "@/lib/types";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-3"><h3 className="text-sm font-semibold text-[var(--muted)]">{title}</h3>{children}</section>;
}

function Items({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
}

export default function SpecView({ spec }: { spec: Spec }) {
  return (
    <article className="min-w-0 space-y-7 break-words rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm leading-6 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)] pb-5">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs text-[var(--muted)]">예시 PRD</p>
          <h2 className="text-2xl font-semibold">{spec.product_name}</h2>
          <p className="mt-2 text-[var(--muted)]">{spec.one_liner}</p>
        </div>
        <button disabled title="복사 기능은 이후 단계에서 연결합니다" className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] disabled:cursor-not-allowed">마크다운 복사 (준비 중)</button>
      </header>
      <Section title="문제"><p>{spec.problem}</p></Section>
      <Section title="타깃 유저"><ul className="space-y-3">{spec.target_users.map((user, index) => <li key={index}><p className="font-medium">{user.persona}</p><p className="text-[var(--muted)]">{user.pain}</p></li>)}</ul></Section>
      <Section title="핵심 기능"><ul className="space-y-4">{spec.core_features.map((feature, index) => <li key={index}><div className="flex items-center gap-2"><span className={feature.priority === "P0" ? "rounded bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-[var(--card)]" : "rounded bg-[var(--border)] px-2 py-0.5 text-xs font-medium text-[var(--muted)]"}>{feature.priority}</span><span className="font-medium">{feature.name}</span></div><p className="mt-1 text-[var(--muted)]">{feature.description}</p></li>)}</ul></Section>
      <Section title="유저 플로우"><ol className="list-decimal space-y-2 pl-5">{spec.user_flow.map((step, index) => <li key={index}>{step}</li>)}</ol></Section>
      <Section title="화면"><ul className="space-y-2">{spec.screens.map((screen, index) => <li key={index}><span className="font-medium">{screen.name}</span> · {screen.purpose}</li>)}</ul></Section>
      <Section title="데이터 모델 / API"><div className="space-y-4 font-mono text-xs">{spec.data_model.map((model, index) => <div key={index}><p className="font-semibold">{model.table}</p><p className="mt-1 text-[var(--muted)]">{model.columns.join(", ")}</p></div>)}{spec.api_endpoints.map((endpoint, index) => <div key={index}><p className="font-semibold">{endpoint.method} {endpoint.path}</p><p className="text-[var(--muted)]">{endpoint.description}</p></div>)}</div></Section>
      <Section title="이번에 안 하는 것"><Items items={spec.out_of_scope} /></Section>
      <Section title="리스크"><Items items={spec.risks} /></Section>
      <Section title="첫 프롬프트"><p className="whitespace-pre-wrap rounded-xl bg-[var(--bg)] p-4 font-mono text-xs">{spec.first_prompt}</p></Section>
    </article>
  );
}
