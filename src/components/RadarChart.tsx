"use client";

import { motion } from "framer-motion";
import {
  Dot,
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMemo, useState } from "react";
import type { SVGAttributes } from "react";

const metrics = [
  { zh: "叙事/表达能力", en: "Narrative Crafting", score: 8.5 },
  { zh: "跨部门协作", en: "Organizational Empathy", score: 7.0 },
  { zh: "数据逻辑", en: "Data Logic", score: 7.0 },
  { zh: "广告技术理解力", en: "AdTech Acumen", score: 7.5 },
  { zh: "增长策略", en: "Growth Strategy", score: 7.5 },
] as const;

function RadarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const descriptions: Record<string, string> = {
    "Narrative Crafting": "将复杂的逻辑简单表达",
    "Growth Strategy": "全球广告增长策略",
    "AdTech Acumen": "喜欢研究广告背后的Why&How",
    "Data Logic": "数据逻辑和可视化",
    "Organizational Empathy": "拉资源推项目",
  };

  return (
    <div className="rounded-2xl border border-[#333333]/10 bg-white/80 px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur">
      <div className="text-xs text-[#333333]/70">Category</div>
      <div className="mt-1 font-serif text-sm leading-tight text-[#333333]">
        {label}
      </div>
      <div className="mt-2 text-xs text-[#333333]/75">
        {label ? descriptions[label] ?? "" : ""}
      </div>
    </div>
  );
}

export default function SkillRadar() {
  const [mounted] = useState(() => typeof window !== "undefined");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const chartData = useMemo(() => {
    return metrics.map((m) => ({
      subject: m.en,
      subjectZh: m.zh,
      score: m.score,
    }));
  }, []);
  const activeIndex = activeSubject
    ? chartData.findIndex((d) => d.subject === activeSubject)
    : -1;

  const renderAngleTick = (props: {
    payload?: { value?: string };
    x?: string | number;
    y?: string | number;
    textAnchor?: SVGAttributes<SVGTextElement>["textAnchor"];
  }) => {
    const label = props.payload?.value;
    const item = chartData.find((d) => d.subject === label);
    const x = props.x == null ? null : Number(props.x);
    const y = props.y == null ? null : Number(props.y);
    if (!item || x == null || y == null) return null;

    const isActive = item.subject === activeSubject;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <text
          textAnchor={typeof props.textAnchor === "string" ? props.textAnchor : "middle"}
          fill={isActive ? "#3f3f3f" : "#616161"}
          className="font-sans"
          style={{ transition: "fill 160ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <tspan x={0} dy={0} fontSize={13} fontWeight={isActive ? 700 : 600}>
            {item.subjectZh}
          </tspan>
          <tspan x={0} dy={15} fontSize={12} fontWeight={isActive ? 600 : 500}>
            {item.subject}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <motion.section
      id="skills"
      {...{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }}
      className="w-full pb-12 pt-2"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-widest text-[#333333]/60">技能雷达</div>
          <h2 className="mt-2 font-serif text-3xl tracking-tight">
            Skill Radar
          </h2>
        </div>
        <div className="text-xs text-[#333333]/65">
          Hover for detail
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#333333]/10 bg-white/35 p-4 backdrop-blur sm:p-6">
        <div className="mt-2 h-[380px] w-full sm:h-[430px]">
          {!mounted ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-[#333333]/10 bg-white/35 text-xs text-[#333333]/65">
              Preparing radar…
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.96, opacity: 0.5 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsRadarChart
                  data={chartData}
                  margin={{ top: 26, right: 24, left: 24, bottom: 24 }}
                  outerRadius="92%"
                  onMouseMove={(state) => {
                    const label = (state as { activeLabel?: string } | undefined)
                      ?.activeLabel;
                    setActiveSubject(label ?? null);
                  }}
                  onMouseLeave={() => setActiveSubject(null)}
                >
                  <defs>
                    <radialGradient id="radarGradient" cx="50%" cy="50%" r="72%">
                      <stop offset="0%" stopColor="#333333" stopOpacity={0.02} />
                      <stop offset="70%" stopColor="#333333" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#333333" stopOpacity={0.28} />
                    </radialGradient>
                  </defs>
                  <PolarGrid
                    stroke="#333333"
                    strokeOpacity={0.08}
                    strokeWidth={0.8}
                    radialLines={false}
                  />
                  {activeIndex >= 0 ? (
                    <PolarGrid
                      stroke="#333333"
                      strokeOpacity={0.22}
                      strokeWidth={1.15}
                      radialLines
                      polarAngles={[(activeIndex * 360) / chartData.length]}
                      polarRadius={[]}
                    />
                  ) : null}
                  <PolarRadiusAxis
                    domain={[0, 9.5]}
                    tick={false}
                    axisLine={false}
                    tickCount={5}
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={renderAngleTick}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<RadarTooltip />} />
                  <Radar
                    name="Capability"
                    dataKey="score"
                    stroke="#333333"
                    strokeWidth={2.8}
                    fill="url(#radarGradient)"
                    fillOpacity={1}
                    dot={(dotProps) => {
                      const subject = (dotProps.payload as { subject?: string } | undefined)
                        ?.subject;
                      const isActive = subject != null && subject === activeSubject;
                      return (
                        <Dot
                          cx={dotProps.cx}
                          cy={dotProps.cy}
                          r={isActive ? 4.2 : 3.2}
                          fill={isActive ? "#2f2f2f" : "#333333"}
                          stroke="#ffffff"
                          strokeWidth={isActive ? 1.35 : 1}
                          style={{
                            transition:
                              "r 160ms cubic-bezier(0.22, 1, 0.36, 1), fill 160ms cubic-bezier(0.22, 1, 0.36, 1), stroke-width 160ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      );
                    }}
                    isAnimationActive
                    animationDuration={1100}
                  />
                </RechartsRadarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

