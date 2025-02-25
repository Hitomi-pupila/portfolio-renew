const config = {
  // selector
  itemSelector: '.js-facade__item',
};

/**
 * ファサード読み込み
 * @module modules/facade
 */
export class Facade {
  /**
   * @param {HTMLElement} element 機能構築の起点となるHTML要素
   */
  constructor(element) {
    this.root = element;
    this.item = null;
    this.newItem = null;
    this.className = '';
    this.src = '';
    this.loading = '';
    this.title = '';
  }

  /**
   * 初期処理
   */
  init() {
    this.set();
    this.bindEvent();
  }

  /**
   * 機能の準備・設定
   */
  set() {
    if (!this.root.querySelector(config.itemSelector)) {
      return;
    }

    this.item = this.root.querySelector(config.itemSelector);
    this.newItem = document.createElement('iframe');
    this.className = this.item.className;
    this.src = this.item.dataset.src;
    this.loading = this.item.dataset.loading;
    this.title = this.item.dataset.title;

    this.newItem.setAttribute('class', this.className);

    if (this.src !== '') {
      this.newItem.setAttribute('src', this.src);
    }

    if (this.loading !== '') {
      this.newItem.setAttribute('loading', this.loading);
    }

    if (this.title !== '') {
      this.newItem.setAttribute('title', this.title);
    }
  }

  /**
   * イベント登録
   */
  bindEvent() {
    // Intersection Observer
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.replaceElement();
        }
      });
    };

    const observer = new IntersectionObserver(callback);

    observer.observe(this.root);
  }

  // 要素差し替え
  replaceElement() {
    this.item.replaceWith(this.newItem);
  }
}
