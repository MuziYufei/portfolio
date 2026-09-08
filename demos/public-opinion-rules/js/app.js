/**
 * 《群眾意見》基礎玩法演示應用入口 (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化 7 步玩法演示控制器
  new SlideController();

  const reportHeight = () => {
    window.parent.postMessage({
      type: 'public-opinion-rules-height',
      height: document.documentElement.scrollHeight
    }, '*');
  };

  reportHeight();
  window.addEventListener('load', reportHeight);
  window.addEventListener('resize', reportHeight);
  if ('ResizeObserver' in window) new ResizeObserver(reportHeight).observe(document.body);
});
