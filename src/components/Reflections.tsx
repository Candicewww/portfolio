"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock3, Cpu, Flame, HeartHandshake, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type React from "react";

type Reflection = {
  title: string;
  excerpt: string;
  date: string;
  tag: "Strategy" | "Technology" | "Content" | "Personal";
};

const reflections: Reflection[] = [
  {
    title: "大厂是路径，而非终点。",
    excerpt:
      "我始终提醒自己，真正的职业自由不是title的堆砌。而是在任何业务场景下，发现、整合、创造和规模化的能力",
    date: "2026.03",
    tag: "Personal",
  },
  {
    title: "AI是马，缰绳在人",
    excerpt:
      "不论AI发展如何，通过实操，积累经验和判断力，去判断AI的产出是否达标一定没错。我相信，人的审美、判断力和执行力，会是AI时代最值钱的能力。",
    date: "2026.02",
    tag: "Technology",
  },
  {
    title: "全球化不是简单的平移与复制",
    excerpt:
      "出海的蛮荒时代早已过去，靠信息差躺赢的逻辑不再成立。未来的增长引擎，我押注在内容（content）",
    date: "2026.01",
    tag: "Strategy",
  },
  {
    title: "我的职业愿景：Global talent",
    excerpt:
      "我倾向于把自己定义为一个持续进化的全球化人才。在未来的 3-5 年里，“AI（提效）+ 内容（叙事）+ 出海（领域）”将是我职业版图的三个关键词。在这个不确定的时代，这是我为自己选定的确定性。",
    date: "2025.12",
    tag: "Personal",
  },
];

function tagIcon(tag: Reflection["tag"]) {
  switch (tag) {
    case "Strategy":
      return <Flame className="h-4 w-4" strokeWidth={1.7} />;
    case "Technology":
      return <Cpu className="h-4 w-4" strokeWidth={1.7} />;
    case "Content":
      return <PenLine className="h-4 w-4" strokeWidth={1.7} />;
    case "Personal":
    default:
      return <HeartHandshake className="h-4 w-4" strokeWidth={1.7} />;
  }
}

export default function Reflections() {
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

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    // If user scrolls vertically, shift horizontally inside the card row.
    el.scrollLeft += e.deltaY;
  };

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = direction === "left" ? -360 : 360;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <motion.section
      id="reflections"
      {...{
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }}
      className="w-full pb-16 pt-4"
    >
      <div>
        <div className="text-xs tracking-widest text-[#333333]/60">随笔卡片</div>
        <h2 className="mt-2 font-serif text-3xl tracking-tight">
          Reflections
        </h2>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="text-xs text-[#333333]/65">Scroll → (horizontal)</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll reflections left"
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
            aria-label="Scroll reflections right"
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
      </div>

      <div className="relative mt-4">
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
          aria-label="Micro-essays, horizontally scrollable"
          onWheel={onWheel}
          className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-4 pb-2">
          {reflections.map((r, idx) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.6, delay: idx * 0.03 }}
              whileHover={{
                y: -6,
                boxShadow: "0 22px 60px rgba(0,0,0,0.12)",
              }}
              className="w-[340px] snap-start rounded-3xl border border-[#333333]/10 bg-white/35 p-6 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#333333]/15 bg-white/35 px-3 py-1 text-xs text-[#333333]/75 w-fit">
                    {tagIcon(r.tag)}
                    {r.tag}
                  </div>
                  <h3 className="font-serif text-lg leading-tight tracking-tight font-medium">
                    {r.title}
                  </h3>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#333333]/10 bg-[#F4F4F4]/50 text-[#333333]/70">
                  <Clock3 className="h-4 w-4" strokeWidth={1.7} />
                </div>
              </div>

              <p className="mt-4 text-sm font-normal leading-relaxed text-[#333333]/80">
                {r.excerpt}
              </p>

              <div className="mt-6 flex justify-end">
                <div className="grid h-9 w-9 place-items-center rounded-2xl border border-[#333333]/10 bg-[#F4F4F4]/60 text-[#333333]/70">
                  <span className="font-serif text-sm">CW</span>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

