/**
 * ヒストリータイムライン
 */
export class Timeline {
  /**
   * @param {HTMLElement} element - タイムラインの要素
   * @param {IntersectionObserverInit} [options] - IntersectionObserver のオプション
   */
  constructor(element, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    this.o = Object.assign(defaultOptions, options);
    this.timeline = element;
    this.timelineList = this.timeline.querySelector('.m-timeline__list');
    this.timelineItems = this.timeline.querySelectorAll('.js-timeline__item');
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    }, this.o);

    this.timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }
}
