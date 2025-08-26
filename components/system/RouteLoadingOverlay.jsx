"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(
    () => `${pathname}?${searchParams?.toString() || ""}`,
    [pathname, searchParams]
  );

  const [visible, setVisible] = useState(false);
  const startedAtRef = useRef(0);
  const hideTimerRef = useRef(null);
  const MIN_VISIBLE_MS = 700;

  const start = () => {
    startedAtRef.current = performance.now();
    setVisible(true);
  };

  const finish = () => {
    const elapsed = performance.now() - startedAtRef.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setVisible(false), wait);
  };

  // Show on initial load/reload
  useEffect(() => {
    const maybeStart = () => {
      if (document.readyState !== "complete") start();
    };
    const onLoad = () => finish();

    maybeStart();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Show on internal link clicks
  useEffect(() => {
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      const download = anchor.getAttribute("download");
      if (!href || download || target === "_blank") return;
      if (href.startsWith("#") || /^(mailto:|tel:)/i.test(href)) return;

      const isInternal = href.startsWith("/") && !href.startsWith("//");
      if (!isInternal) return;

      start();
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Show on back/forward
  useEffect(() => {
    const onPop = () => start();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // When the route actually changes, finish
  useEffect(() => {
    if (!visible) return;
    finish();
  }, [routeKey, visible]);

  // Programmatic API if you ever need it
  useEffect(() => {
    window.__routeLoader = { start, stop: () => setVisible(false) };
    return () => {
      delete window.__routeLoader;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.28 } }}
        >
          {/* Backdrop: cream + vignette + grain */}
          <div className="absolute inset-0 bg-[#F7F3ED] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(90,80,68,0.06),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.12] grain-move pointer-events-none" />
          </div>

          {/* Glass badge */}
          <motion.div
            className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-[28px] bg-white/70 backdrop-blur-md shadow-[0_12px_60px_rgba(27,23,18,0.20)] border border-white/60"
            initial={{ scale: 0.96, y: 4 }}
            animate={{
              scale: 1,
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.25 } }}
          >
            {/* conic sweep frame */}
            <div className="absolute inset-[18px] rounded-[22px] bg-[#F0E8DF]">
              <div className="absolute inset-0 rounded-[22px] overflow-hidden">
                <div className="absolute inset-0 bg-conic-sweep animate-rot-slow opacity-90" />
                <div className="absolute inset-[6px] bg-white rounded-[18px]" />
              </div>
            </div>

            {/* gradient ring with animated dash */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 200 200"
              width="100%"
              height="100%"
              aria-hidden
            >
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5A5044" />
                  <stop offset="100%" stopColor="#A08F79" />
                </linearGradient>
                <mask id="dashMask">
                  <circle
                    cx="100"
                    cy="100"
                    r="74"
                    stroke="white"
                    strokeWidth="10"
                    strokeDasharray="120 400"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-520"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </mask>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="74"
                stroke="#E9E2D8"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r="74"
                stroke="url(#ringGrad)"
                strokeWidth="10"
                mask="url(#dashMask)"
              />
            </svg>

            {/* logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Site logo"
                className="h-16 w-auto"
              />
            </div>

            {/* shine */}
            <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
              <div className="absolute -inset-y-4 -left-1/3 w-1/3 rotate-[20deg] bg-white/35 blur-[6px] animate-shine" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
