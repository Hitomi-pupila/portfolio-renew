/**
 * フェードイン
 */
export class FadeIn {
  /**
   * @param {HTMLElement} element - フェードインの要素
   * @param {IntersectionObserverInit} [options] - IntersectionObserver のオプション
   */
  constructor(element, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    this.o = Object.assign(defaultOptions, options);
    this.element = element;
  }

  /**
   * 対象要素の監視する
   * @private
   * @returns {void}
   */
  init() {
    /**
     * IntersectionObserverのインスタンス
     * @type {IntersectionObserver}
     */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.fadeIn();
        }
      });
    }, this.o);

    observer.observe(this.element);
  }

  fadeIn() {
    this.element.classList.add('is-fadeIn');
  }
}
