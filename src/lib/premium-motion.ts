// Client-only premium motion: Lenis smooth scroll + GSAP ScrollTrigger reveals,
// SplitType text stagger, magnetic buttons, 3D tilt, mouse parallax.
// Non-invasive: targets existing elements via generic selectors. No layout,
// color, or structural changes. Respects prefers-reduced-motion.

import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

let installed = false;
const cleanupFns: Array<() => void> = [];

type PremiumWindow = Window & {
  __pmApply?: () => void;
};

async function install() {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const [{ default: Lenis }, gsapMod, stMod, splitMod] = await Promise.all([
    import("lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("split-type"),
  ]);
  const gsap = gsapMod.gsap ?? gsapMod.default;
  const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
  const SplitType = splitMod.default ?? splitMod;
  gsap.registerPlugin(ScrollTrigger);

  // Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  cleanupFns.push(() => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  });

  const ease = "power3.out";

  const applyToRoute = () => {
    // kill previous ScrollTriggers before re-running per route
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // 1) Reveal: fade + slide up on section content blocks
    const revealTargets = document.querySelectorAll<HTMLElement>(
      "section > div, section > .glass-panel, footer > div",
    );
    revealTargets.forEach((el) => {
      if (el.dataset.pmRevealed) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40, force3D: true },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
      el.dataset.pmRevealed = "1";
    });

    // 2) Staggered text reveal for large headings
    const headings = document.querySelectorAll<HTMLElement>("h1, h2");
    headings.forEach((h) => {
      if (h.dataset.pmSplit) return;
      try {
        // Remember gold-gradient nodes so we can restore fill after SplitType wraps chars.
        const goldNodes = Array.from(h.querySelectorAll<HTMLElement>(".text-gold-gradient"));
        const split = new SplitType(h, { types: "words,chars" });

        // Re-apply gradient clip on every generated char/word inside gold spans.
        // Without this, color:transparent inherits and the words disappear.
        goldNodes.forEach((node) => {
          node.querySelectorAll<HTMLElement>(".char").forEach((part) => {
            part.classList.add("text-gold-gradient");
          });
        });

        gsap.from(split.chars ?? [], {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease,
          stagger: 0.02,
          scrollTrigger: { trigger: h, start: "top 90%", once: true },
        });
        h.dataset.pmSplit = "1";
      } catch (error) {
        void error;
      }
    });

    // 3) Scroll-triggered image scale/zoom
    const imgs = document.querySelectorAll<HTMLImageElement>("img");
    imgs.forEach((img) => {
      if (img.dataset.pmImg) return;
      img.style.willChange = "transform";
      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.4,
          ease,
          scrollTrigger: { trigger: img, start: "top 92%", once: true },
        },
      );
      img.dataset.pmImg = "1";
    });

    // 4) 3D tilt on hover for glass cards
    const tiltEls = document.querySelectorAll<HTMLElement>(".glass-panel");
    tiltEls.forEach((el) => {
      if (el.dataset.pmTilt) return;
      el.style.transformStyle = "preserve-3d";
      el.style.perspective = "800px";
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          rotateX: -py * 6,
          rotateY: px * 8,
          transformPerspective: 800,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
      el.dataset.pmTilt = "1";
    });

    // 5) Magnetic buttons — pill-shaped CTAs
    const magnets = document.querySelectorAll<HTMLElement>("a.rounded-full, button.rounded-full");
    magnets.forEach((el) => {
      if (el.dataset.pmMag) return;
      const strength = 0.25;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
      el.dataset.pmMag = "1";
    });

    // 6) Mouse parallax on hero imagery
    const parallax = document.querySelectorAll<HTMLElement>("section img, [data-parallax]");
    const scrollParallax = document.querySelectorAll<HTMLElement>("[data-parallax]");
    scrollParallax.forEach((el, i) => {
      if (el.dataset.pmScrollParallax) return;
      const rawSpeed = Number.parseFloat(el.dataset.parallaxSpeed ?? "");
      const speed = Number.isFinite(rawSpeed) ? rawSpeed : 0.12 + (i % 4) * 0.04;
      const distance = Math.max(12, Math.min(60, speed * 180));
      gsap.fromTo(
        el,
        { y: -distance * 0.35 },
        {
          y: distance * 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      el.dataset.pmScrollParallax = "1";
    });
    const onWinMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      parallax.forEach((el, i) => {
        const depth = 6 + (i % 3) * 4;
        gsap.to(el, {
          x: dx * depth,
          y: dy * depth,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };
    window.addEventListener("mousemove", onWinMove, { passive: true });
    cleanupFns.push(() => window.removeEventListener("mousemove", onWinMove));

    ScrollTrigger.refresh();
  };

  applyToRoute();
  // Re-apply after route change
  (window as PremiumWindow).__pmApply = applyToRoute;
}

export function usePremiumMotion() {
  const location = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!installed) {
      installed = true;
      install();
    } else {
      // Re-run selectors for new route content
      requestAnimationFrame(() => {
        (window as PremiumWindow).__pmApply?.();
      });
    }
  }, [location]);

  useEffect(() => {
    return () => {
      // full teardown only on unmount of the app
      if (cleanupFns.length && typeof window !== "undefined") {
        // keep installed across route changes; no-op here
      }
    };
  }, []);
}
