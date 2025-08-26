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
  const hideTimerRef = useRef(/** @type {any} */ (null));
  const killTimerRef = useRef(/** @type {any} */ (null));

  const MIN_VISIBLE_MS = 700;
  const KILL_SWITCH_MS = 4000;

  const bootUp = () => document.getElementById("boot-route-loader") != null;

  const normalizePathSearch = (url) => {
    let p = url.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    const s = url.search || "";
    return p + s;
  };

  const start = () => {
    if (bootUp()) return;
    startedAtRef.current = performance.now();
    setVisible(true);

    clearTimeout(killTimerRef.current);
    killTimerRef.current = setTimeout(() => setVisible(false), KILL_SWITCH_MS);
  };

  const finish = () => {
    const elapsed = performance.now() - startedAtRef.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setVisible(false), wait);
  };

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

      const a = /** @type {HTMLAnchorElement|null} */ (e.target.closest?.("a"));
      if (!a) return;

      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      const download = a.getAttribute("download");
      if (!href || download || target === "_blank") return;
      if (href.startsWith("#") || /^(mailto:|tel:)/i.test(href)) return;

      const isInternal = href.startsWith("/") && !href.startsWith("//");
      if (!isInternal) return;

      const cur = new URL(window.location.href);
      const next = new URL(href, window.location.origin);
      if (normalizePathSearch(cur) === normalizePathSearch(next)) return;

      start();
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    const onPop = () => start();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!visible) return;
    finish();
  }, [routeKey]);

  useEffect(() => {
    return () => {
      clearTimeout(hideTimerRef.current);
      clearTimeout(killTimerRef.current);
    };
  }, []);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.28 } }}
        >
          <div className="absolute inset-0 bg-[#F7F3ED] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(90,80,68,0.06),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.12] grain-move pointer-events-none" />
          </div>

          <motion.div
            className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-[28px]"
            initial={{ scale: 0.96, y: 4 }}
            animate={{
              scale: 1,
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.25 } }}
          >
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

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Site logo"
                className="h-16 w-auto"
              />
            </div>

            <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
              <div className="absolute -inset-y-4 -left-1/3 w-1/3 rotate-[20deg] bg-white/35 blur-[6px] animate-shine" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
