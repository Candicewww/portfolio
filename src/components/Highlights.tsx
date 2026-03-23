"use client";

import { motion } from "framer-motion";
import { DollarSign, LineChart, ShieldCheck, TrendingUp, Users } from "lucide-react";
import type React from "react";

type Highlight = {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
};

const highlights: Highlight[] = [
  {
    icon: <TrendingUp className="h-5 w-5" strokeWidth={1.7} />,
    value: "ROI 300%↑",
    label: "Performance Lift",
    hint: "从实验到规模化的杠杆效应。",
  },
  {
    icon: <DollarSign className="h-5 w-5" strokeWidth={1.7} />,
    value: "Managed $100M+ Budget",
    label: "Budget Stewardship",
    hint: "资源配置的可解释、可复盘。",
  },
  {
    icon: <LineChart className="h-5 w-5" strokeWidth={1.7} />,
    value: "Multi-market Playbooks",
    label: "Global Execution",
    hint: "同一套方法论，适配不同文化语境。",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />,
    value: "Cross-team Alignment",
    label: "Operational Empathy",
    hint: "让组织更愿意把事做对并坚持下去。",
  },
];

export default function Highlights() {
  return (
    <motion.section
      id="kpi"
      {...{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }}
      className="mx-auto max-w-6xl px-6 pb-14 pt-6 sm:px-10"
    >
      <div className="rounded-3xl border border-[#333333]/10 bg-[#333333] p-6 text-[#F5F5DC] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs text-[#F5F5DC]/70">KPI Highlights</div>
            <h2 className="mt-2 font-serif text-3xl tracking-tight text-[#F5F5DC]">
              High-contrast signals, low-noise storytelling.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F5DC]/80">
              数据是骨架，叙事是皮肤。指标不冷，指标在引导更好的选择。
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#F5F5DC]/70">
            <Users className="h-4 w-4" strokeWidth={1.7} />
            Built for clarity under pressure
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, idx) => (
            <motion.div
              key={h.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="rounded-2xl border border-[#F5F5DC]/15 bg-[#333333]/10 p-5 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F5F5DC]/10">
                  {h.icon}
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#F5F5DC]/70">{h.label}</div>
                  <div className="mt-1 font-serif text-xl tracking-tight text-[#F5F5DC]">
                    {h.value}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm leading-relaxed text-[#F5F5DC]/80">
                {h.hint}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

