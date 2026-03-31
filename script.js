const accordionGroups = document.querySelectorAll("[data-accordion]");

for (const group of accordionGroups) {
  const items = group.querySelectorAll(".accordion-item");

  const syncPanelState = (item, shouldOpen) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");

    if (!trigger || !panel) return;

    item.classList.toggle("is-open", shouldOpen);
    trigger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    panel.style.maxHeight = shouldOpen ? `${panel.scrollHeight}px` : "0px";
  };

  for (const item of items) {
    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) continue;

    trigger.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      for (const otherItem of items) {
        syncPanelState(otherItem, false);
      }

      syncPanelState(item, willOpen);
    });
  }

  // Ensure initial open panels have proper height
  for (const item of items) {
    syncPanelState(item, item.classList.contains("is-open"));
  }
}

const reveals = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  reveals.forEach((element) => element.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((element) => revealObserver.observe(element));
}
