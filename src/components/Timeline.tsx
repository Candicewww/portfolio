"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Sparkles } from "lucide-react";
import { useMemo } from "react";

type CareerStop = {
  company: string;
  dateRange: string;
  roleType: "Full-time" | "Internship";
  role: string;
  summary: string;
};

const stops: CareerStop[] = [
  {
    company: "Amazon | 亚马逊广告",
    dateRange: "2025.02 — 2026.01",
    roleType: "Full-time",
    role: "SMB Seller incubation",
    summary:
      "体验了和大厂不同的做事风格。不论是亚马逊还是TikTok，有相同的业务困境：最好“讲故事”的SMB，最难做。如何用最少的人力撬动最大的增长？我认为落脚点在：如何使用自动化工具实现行业经验的规模化复制。",
  },
  {
    company: "AliExpress | 阿里巴巴·速卖通",
    dateRange: "2024.06 — 2025.02",
    roleType: "Full-time",
    role: "Global Affiliate Marketing",
    summary: "短暂但”收获颇丰“的经历。不仅是职场选择，更是人生选择。",
  },
  {
    company: "TikTok for Business | 字节跳动",
    dateRange: "2022.02 — 2024.06",
    roleType: "Full-time",
    role: "Ad Ecosystem&Growth",
    summary:
      "我的”原生职场“。不仅是我的出海商业化启蒙”母校“，奠定了我对行业的基础认知、培养了我的职业素养，更给了我广阔的舞台自我发展。",
  },
  {
    company: "TikTok (User Growth) | 用户增长",
    dateRange: "2021.06 — 2021.11",
    roleType: "Internship",
    role: "Fission Growth (JP/TH)",
    summary:
      "在 TikTok 出海增长最猛的阶段加入。第一次从 0 到 1 观察日本、泰国市场的裂变增长，锚定了“出海”的职业主线。",
  },
  {
    company: "Youku | 阿里巴巴·优酷",
    dateRange: "2020.06 — 2020.09",
    roleType: "Internship",
    role: "Content Ops",
    summary:
      "探索内容生产和分发的上下游。上一环是达人，下一环是分发效率。",
  },
  {
    company: "Douyin | 字节跳动·抖音",
    dateRange: "2019.06 — 2020.09",
    roleType: "Internship",
    role: "Creator Commerce Ops",
    summary:
      "商业化的认知雏形。站在美妆达人运营的第一线，亲眼目睹了内容到变现的惊人效率，理解了电商是内容生态的超级变现杠杆。",
  },
  {
    company: "Penguin Tutoring | 腾讯·企鹅辅导",
    dateRange: "2018.09 — 2019.03",
    roleType: "Internship",
    role: "Short-video Content Growth",
    summary:
      "第一段大厂实习，从做内容起步。体验上了随时点开app都是”99+“的快感。",
  },
];

function companyInitials(company: string) {
  const trimmed = company.replace(/[^A-Za-z0-9]+/g, " ").trim();
  if (!trimmed) return "•";
  const parts = trimmed.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

function LogoBadge({ company }: { company: string }) {
  const initials = companyInitials(company);
  // Deterministic, brand-like colors without external assets.
  const hash = Array.from(company).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const hue = hash % 360;
  return (
    <div
      className="grid h-12 w-12 place-items-center rounded-2xl border border-[#333333]/10 bg-white/40 backdrop-blur"
      style={{
        background: `radial-gradient(circle at 30% 20%, hsla(${hue}, 70%, 80%, 0.9), rgba(244,244,244,0.1) 55%, rgba(255,255,255,0.0) 72%), rgba(255,255,255,0.35)`,
      }}
      aria-hidden="true"
    >
      <span className="font-serif text-sm tracking-tight text-[#333333] opacity-90">
        {initials}
      </span>
    </div>
  );
}

export default function Timeline() {
  const ariaLabel = useMemo(() => "Experience timeline, vertical layout", []);

  return (
    <motion.section
      id="experience"
      {...{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }}
      className="w-full pb-12 pt-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-widest text-[#333333]/60">职场经历</div>
          <h2 className="mt-2 font-serif text-3xl tracking-tight">
            Not just a career path, but a journey of continuous reconstruction.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#333333]/75">
            每一次尝试，都是一次自我迭代
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#333333]/70">
          <Sparkles className="h-4 w-4" strokeWidth={1.7} />
          High-signal timeline
        </div>
      </div>

      <div
        role="region"
        aria-label={ariaLabel}
        className="mt-8"
      >
        <div className="space-y-6">
          {stops.map((stop, idx) => (
            <motion.article
              key={stop.company + stop.dateRange}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: idx * 0.03 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr] sm:items-start"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono text-[#333333]/55">{stop.dateRange}</div>
                <div
                  className={[
                    "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs",
                    stop.roleType === "Full-time"
                      ? "border-[#333333]/20 bg-[#333333] text-[#F4F4F4] font-semibold"
                      : "border-[#333333]/15 bg-white/35 text-[#333333]/70",
                  ].join(" ")}
                >
                  {stop.roleType === "Full-time" ? (
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.7} />
                  ) : (
                    <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.7} />
                  )}
                  {stop.roleType}
                </div>
              </div>

              <div
                className={[
                  "rounded-3xl border p-5 backdrop-blur",
                  stop.roleType === "Full-time"
                    ? "border-[#333333]/15 bg-white/45"
                    : "border-[#333333]/10 bg-white/35",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <LogoBadge company={stop.company} />
                    <div>
                      <h3 className="font-serif text-xl tracking-tight">
                        {stop.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-[#333333]/70">
                        {stop.role}
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  className={[
                    "mt-4 text-sm font-normal leading-relaxed",
                    stop.roleType === "Full-time"
                      ? "text-[#333333]/85"
                      : "text-[#333333]/80",
                  ].join(" ")}
                >
                  {stop.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

