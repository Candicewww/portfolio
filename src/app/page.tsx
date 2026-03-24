"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, WheelEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RadarChart from "@/components/RadarChart";
import Reflections from "@/components/Reflections";
import Timeline from "@/components/Timeline";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
};

const CONTACT_EMAIL = "canwong2810@gmail.com";

function Keycap({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg border border-[#333333]/20 bg-white/45 px-2 text-xs font-semibold text-[#333333] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      {children}
    </span>
  );
}

const workScenes = [
  {
    role: "Speaker at H5 Gaming Summit",
    caption: "在红海中寻找裂缝",
    src: "/images/work-h5-v2.png",
  },
  {
    role: "Speaker at Seller conference",
    caption: "离一线客户越近，离“伪”需求越远",
    src: "/images/work-aliexpress.png",
  },
  {
    role: "SAC workshop at Chengdu bootcamp",
    caption: "小小展位也是有效渠道",
    src: "/images/work-amazon.png",
  },
];

const aiProjects = [
  {
    title: "Cross-Cultural Context Polisher 职场英语润色工具",
    scenario: "职场英文沟通中，希望快速用AI润色英文表达。",
  },
  {
    title: "Amazon Ad tool kit (in dev)",
    scenario:
      "一个可以帮助亚马逊卖家从0开始搭建广告的工具包：优化商品LIsting，搭建关键词库，设计广告结构，分析广告数据",
  },
];

function WorkParallaxStack() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);
  const clickFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (clickFeedbackTimer.current) clearTimeout(clickFeedbackTimer.current);
    };
  }, []);

  const desktopStack = [
    { x: -38, y: 10, rotate: -5, width: 340, height: 210, z: 40 },
    { x: 0, y: 74, rotate: 0, width: 360, height: 220, z: 30 },
    { x: 42, y: 146, rotate: 5, width: 340, height: 210, z: 10 },
  ];
  const desktopBento = [
    { x: -175, y: 16, rotate: 0, width: 380, height: 300, z: 40 },
    { x: 188, y: 16, rotate: 1.5, width: 240, height: 140, z: 30 },
    { x: 188, y: 176, rotate: -1.5, width: 240, height: 140, z: 30 },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onMouseEnter={() => {
        if (!isMobile) setExpanded(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setExpanded(false);
      }}
      onClick={() => {
        if (!isMobile) setExpanded((v) => !v);
      }}
    >
      <div className={isMobile ? "space-y-4" : "relative h-[340px]"}>
      {workScenes.map((scene, idx) => {
        const mode = expanded ? desktopBento[idx] : desktopStack[idx];
        const isExpanded = expanded || isMobile;

        return (
          <motion.div
            key={scene.caption}
            layout
            className={isMobile ? "relative" : "absolute left-1/2 top-0 -translate-x-1/2"}
            style={{
              zIndex: isMobile ? "auto" : focusedCardIndex === idx ? 120 : mode.z,
            }}
          >
            <motion.div
              layout
              animate={{
                x: isMobile ? 0 : mode.x,
                y: isMobile ? 0 : mode.y,
                rotate: isMobile ? 0 : mode.rotate,
                width: isMobile ? "100%" : mode.width,
                height: isMobile ? "auto" : mode.height,
                scale: clickedCardIndex === idx ? 1.02 : 1,
              }}
              transition={{
                x: { type: "spring", stiffness: 140, damping: 24 },
                y: { type: "spring", stiffness: 140, damping: 24 },
                rotate: { type: "spring", stiffness: 140, damping: 24 },
                width: { type: "spring", stiffness: 140, damping: 24 },
                height: { type: "spring", stiffness: 140, damping: 24 },
                scale: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
              }}
              className="group"
              onClick={(e) => {
                // Keep container click from overriding "clicked card to top" behavior.
                e.stopPropagation();
                setFocusedCardIndex(idx);
                setClickedCardIndex(idx);
                if (clickFeedbackTimer.current) clearTimeout(clickFeedbackTimer.current);
                clickFeedbackTimer.current = setTimeout(() => setClickedCardIndex(null), 160);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Bring ${scene.role} card to front`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFocusedCardIndex(idx);
                  setClickedCardIndex(idx);
                  if (clickFeedbackTimer.current) clearTimeout(clickFeedbackTimer.current);
                  clickFeedbackTimer.current = setTimeout(
                    () => setClickedCardIndex(null),
                    160,
                  );
                }
              }}
            >
              <div
                className={[
                  "relative mx-auto rounded-3xl border border-[#333333]/10 bg-white/35 p-3 backdrop-blur",
                  clickedCardIndex === idx ? "ring-2 ring-[#333333]/20" : "",
                  isExpanded
                    ? "shadow-xl"
                    : "shadow-[0_28px_90px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl aspect-[5/4] bg-gradient-to-br from-[#333333]/10 via-[#F4F4F4] to-[#333333]/5",
                    "transition-all duration-300",
                  ].join(" ")}
                >
                  <Image
                    src={scene.src}
                    alt={scene.role}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100" />
                  <div className="absolute inset-0 transition-all duration-300 group-hover:blur-[0.2px] group-hover:brightness-90" />
                </div>

                <div
                  className={[
                    "pointer-events-none absolute left-4 right-4 top-4 rounded-2xl border border-[#333333]/10 bg-[#F4F4F4]/90 px-4 py-3 backdrop-blur",
                    "transition-all duration-300",
                    isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  ].join(" ")}
                >
                  <div className="font-serif text-base leading-tight tracking-tight text-[#333333]">
                    {scene.caption}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}

function AILabSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const atLeft = el.scrollLeft <= 0;
      const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      setCanScrollLeft(!atLeft);
      setCanScrollRight(!atRight);
    };

    const onResize = () => updateScrollState();
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", onResize);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.scrollLeft += e.deltaY;
  };

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = direction === "left" ? -390 : 390;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <motion.section
      id="ai-lab"
      {...{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }}
      className="w-full pb-14 pt-4"
    >
      <div>
        <div className="text-xs tracking-widest text-[#333333]/60">AI实验室</div>
        <h2 className="mt-2 font-serif text-3xl tracking-tight">
          The Lab: Vibe Coding &amp; Automation
        </h2>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Scroll AI projects left"
          aria-disabled={!canScrollLeft}
          tabIndex={canScrollLeft ? 0 : -1}
          onClick={() => scrollByCard("left")}
          className={[
            "grid h-8 w-8 place-items-center rounded-full border border-[#333333]/20 bg-white/45 text-[#333333] transition-colors hover:bg-white/70",
            canScrollLeft ? "" : "pointer-events-none opacity-40",
          ].join(" ")}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Scroll AI projects right"
          aria-disabled={!canScrollRight}
          tabIndex={canScrollRight ? 0 : -1}
          onClick={() => scrollByCard("right")}
          className={[
            "grid h-8 w-8 place-items-center rounded-full border border-[#333333]/20 bg-white/45 text-[#333333] transition-colors hover:bg-white/70",
            canScrollRight ? "" : "pointer-events-none opacity-40",
          ].join(" ")}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="relative mt-6">
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute bottom-4 left-0 top-0 z-10 w-10 bg-gradient-to-r from-[#F4F4F4] to-transparent transition-opacity duration-200",
            canScrollLeft ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute bottom-4 right-0 top-0 z-10 w-10 bg-gradient-to-l from-[#F4F4F4] to-transparent transition-opacity duration-200",
            canScrollRight ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div
          ref={scrollerRef}
          role="region"
          aria-label="AI projects, horizontally scrollable"
          onWheel={onWheel}
          className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-4 pb-1">
          {aiProjects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.04 }}
              whileHover={{ y: -4, boxShadow: "0 20px 55px rgba(0,0,0,0.12)" }}
              className="w-[380px] rounded-3xl border border-[#333333]/10 bg-white/40 p-6 backdrop-blur"
            >
              <div className="inline-flex items-center rounded-full border border-[#333333]/15 bg-white/45 px-3 py-1 text-xs text-[#333333]/75">
                Project {idx + 1}
              </div>
              <h3 className="mt-4 font-serif text-xl leading-tight tracking-tight font-medium">
                {project.title}
              </h3>
              <p className="mt-4 text-sm font-normal leading-relaxed text-[#333333]/80">
                需求场景：{project.scenario}
              </p>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;

    async function copy() {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        setCopied(true);
      } catch {
        // Fallback for older browsers / restricted environments
        const el = document.createElement("textarea");
        el.value = CONTACT_EMAIL;
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
      }

      if (t) clearTimeout(t);
      t = setTimeout(() => setCopied(false), 1400);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c" || e.key === "C") copy();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#333333]">
      <main id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:px-10">
        <motion.section
          {...reveal}
          className="relative pb-16 pt-6"
        >
          <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-2">
              <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
                Exploring. Reconstructing. Evolving.
                <br />
                探索，重构，前行。
              </h1>
              <p className="mt-8 text-base leading-relaxed text-[#333333]/75 sm:text-lg">
                A Global Growth Strategist with Big Tech roots and an AI-driven mindset.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#333333] px-5 py-3 text-sm font-medium text-[#F4F4F4] shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-transform hover:scale-[1.01]"
                  href="#experience"
                >
                  职场经历{" "}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#333333]/15 bg-white/45 px-5 py-3 text-sm font-medium text-[#333333] transition-colors hover:bg-white/65"
                  href="#ai-lab"
                >
                  AI项目{" "}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#333333]/15 bg-white/35 px-5 py-3 text-sm font-medium text-[#333333] transition-colors hover:bg-white/55"
                  href="#reflections"
                >
                  随笔卡片{" "}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="relative h-[190px] w-[190px] overflow-hidden rounded-full border border-[#333333]/15 bg-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
                    <Image
                      src="/images/headshot.png"
                      alt="Candice Wong portrait"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full border border-[#333333]/15 bg-white/70 backdrop-blur">
                    <BadgeCheck className="h-5 w-5 text-[#333333]" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <div className="font-serif text-2xl tracking-tight">
                    &gt;&gt; Candice Wong
                  </div>
                  <div className="mt-1 text-xs text-[#333333]/70">
                    Global Growth · AdTech Strategy · AI Crafting
                  </div>
                </div>

                <div className="mt-6 w-full max-w-md rounded-2xl border border-[#333333]/10 bg-white/35 p-4 text-center backdrop-blur">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Keycap>C</Keycap>
                    <button
                      type="button"
                      className="font-medium text-[#333333] hover:text-[#333333]/80 transition-colors"
                      onClick={() => {
                        // Trigger copy with a click too (same logic as keypress)
                        navigator.clipboard
                          .writeText(CONTACT_EMAIL)
                          .then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1400);
                          })
                          .catch(() => {
                            // No-op: keypress fallback is handled in the effect.
                          });
                      }}
                      aria-label="Press C to copy email"
                    >
                      Press C to copy email
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-[#333333]/60">
                    {copied ? "Email copied" : CONTACT_EMAIL}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* WORK - stacked devices */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative py-10"
        >
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <div className="text-xs tracking-widest text-[#333333]/60">职场碎片</div>
              <h2 className="mt-2 font-serif text-3xl tracking-tight">
                Moments Along the Way
              </h2>
            </div>

            <div className="lg:col-span-3">
              <WorkParallaxStack />
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCE - vertical timeline */}
        <div className="pt-8 sm:pt-10">
          <Timeline />
        </div>

        {/* SKILLS - minimalist radar */}
        <RadarChart />

        {/* AI LAB - horizontal cards */}
        <AILabSection />

        {/* REFLECTIONS - horizontal micro-essays */}
        <Reflections />

        <footer className="mt-10 border-t border-[#333333]/10 pt-8 text-sm text-[#333333]/70">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                className="hover:text-[#333333] transition-colors"
                href="https://www.linkedin.com/in/candice-wong-2950a9296"
                target="_blank"
                rel="noreferrer"
              >
                linkedin：www.linkedin.com/in/candice-wong-2950a9296
              </a>
            </div>
            <Link
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-[#333333]/15 bg-white/35 px-4 py-2 text-sm text-[#333333] transition-colors hover:bg-white/55"
            >
              Back to top <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
