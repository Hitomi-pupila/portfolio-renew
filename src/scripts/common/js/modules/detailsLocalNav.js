import { focusable } from '/common/js/utilities/index.js';

/**
 * details要素のローカルナビ
 */
export class DetailsLocalNav {
  /**
   * @param {HTMLDetailsElement} detailsElement details要素
   */
  constructor(detailsElement) {
    this.details = detailsElement;
    this.summary = this.details.querySelector('summary');
    this.detailsFocusAble = {
      first: null,
      last: null,
    };
    this.retainFocus = this.retainFocus.bind(this);
    this.toggleFocusControl = this.toggleFocusControl.bind(this);
  }

  /**
   * 初期化
   */
  init() {
    if (!this.summary) {
      return;
    }

    const targetFocusAble = this.details.querySelectorAll(focusable);

    if (!targetFocusAble.length) {
      return;
    }

    [this.detailsFocusAble.first] = targetFocusAble;
    this.detailsFocusAble.last = targetFocusAble[targetFocusAble.length - 1];

    this.summary.addEventListener('click', this.toggleFocusControl);
  }

  /**
   * 展開状態を判定しフォーカス制御を実行
   */
  toggleFocusControl() {
    this.restrictionFocus(!this.details.open);
  }

  /**
   * keydownイベントで呼び出すフォーカス処理
   * @param {Event} event イベント
   */
  retainFocus(event) {
    if (event.key !== 'Tab') {
      return;
    }

    const activeElm = document.activeElement;

    if (event.shiftKey && activeElm === this.detailsFocusAble.first) {
      event.preventDefault();
      this.detailsFocusAble.last.focus({ preventScroll: true });
    } else if (!event.shiftKey && activeElm === this.detailsFocusAble.last) {
      event.preventDefault();
      this.detailsFocusAble.first.focus({ preventScroll: true });
    }
  }

  /**
   * フォーカス制御
   * @param {Boolean} flg keydownイベントの実行可否
   */
  restrictionFocus(flg) {
    if (flg) {
      this.detailsFocusAble.first.addEventListener('keydown', this.retainFocus);
      this.detailsFocusAble.last.addEventListener('keydown', this.retainFocus);
    } else {
      this.detailsFocusAble.first.removeEventListener('keydown', this.retainFocus);
      this.detailsFocusAble.last.removeEventListener('keydown', this.retainFocus);
    }
  }
}
