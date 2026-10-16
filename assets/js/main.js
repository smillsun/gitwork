/* ==========================================================================
   Gitwork — 交互脚本
   1) 页脚年份自动更新
   2) 滚动进入视口时的渐显动画
   ========================================================================== */

(function () {
  'use strict';

  // 页脚年份
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 需要渐显的元素
  var targets = document.querySelectorAll(
    '.card, .stat, .steps li, .section-title, .section-sub'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
