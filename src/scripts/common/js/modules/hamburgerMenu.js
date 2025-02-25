/**
 * ハンバーガーメニュー
 */
export class HamburgerMenu {
  /**
   * @constructor
   * @param {HTMLDetailsElement} element - ハンバーガーメニューのルート
   */
  constructor(element) {
    this.menu = element;
    this.btn = this.menu.querySelector('.js-hamburger__button');
    this.btnTextEl = this.menu.querySelector('.js-hamburger__buttonText');
    this.btnText = {
      open: 'Menu',
      close: 'Close',
    };
    this.body = document.body;
    this.overflowClass = 'is-overflow-hidden';
    this.inertTarget = '.l-breadcrumb, .top-main, .l-main, .l-footer';
  }

  init() {
    this.bindEvent();
  }

  /**
   * ハンバーガーメニューボタンにイベントリスナーをバインド
   */
  bindEvent() {
    this.btn.addEventListener('click', this.toggleMenu.bind(this));
  }

  /**
   * メニューの状態を切り替える
   */
  toggleMenu() {
    const isOpen = this.menu.hasAttribute('open');

    if (!isOpen) {
      this.addOverflow();
      this.closeText();
      this.addInert();
    } else {
      this.removeOverflow();
      this.openText();
      this.removeInert();
    }
  }

  /**
   * bodyスクロール固定
   */
  addOverflow() {
    this.body.classList.add(this.overflowClass);
  }

  /**
   * bodyスクロール固定解除
   */
  removeOverflow() {
    this.body.classList.remove(this.overflowClass);
  }

  /**
   * テキストをmenuに変更
   */
  openText() {
    this.btnTextEl.textContent = this.btnText.open;
  }

  /**
   * テキストをcloseに変更
   */
  closeText() {
    this.btnTextEl.textContent = this.btnText.close;
  }

  /**
   * メニュー外のタブキーを無効化
   */
  addInert() {
    const items = document.querySelectorAll(this.inertTarget);
    items.forEach((item) => {
      item.inert = true;
    });
  }

  /**
   * メニュー外のタブキーを有効化
   */
  removeInert() {
    const items = document.querySelectorAll(this.inertTarget);
    items.forEach((item) => {
      item.inert = false;
    });
  }
}
