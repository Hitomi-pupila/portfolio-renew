const config = {
  // selector
  itemSelector: '.js-current__item',
  childListSelector: '.js-current__childList',
  linkSelector: '.js-current__link',
};

/**
 * カレント
 */
export class Current {
  /**
   * @param {HTMLElement} rootElement ルートとなる要素
   */
  constructor(rootElement) {
    this.root = rootElement;
    this.linkItems = this.root.querySelectorAll(config.linkSelector);
    this.adjustUrlPath = this.adjustPath(location.pathname);
    this.currentLink = null;
  }

  /**
   * 初期化
   */
  init() {
    this.getCurrentTarget();

    if (!this.currentLink) {
      return;
    }

    this.replaceLinkWithHighlight();
    this.hideChildDirectories();
  }

  /**
   * 末尾のスラッシュやindex.htmlが含まれている場合は削除
   * @param {String} path URL or リンクのパス
   * @returns
   */
  adjustPath(path) {
    return path.replace(/\/index\.html$/, '').replace(/(?<pathname>.+)\/$/u, (_, p1) =>
      p1);
  }

  /**
   * リンクとURLを比較し、完全一致する要素を取得
   */
  getCurrentTarget() {
    for (const linkItem of this.linkItems) {
      const href = linkItem.getAttribute('href');
      const adjustHref = this.adjustPath(href);

      if (adjustHref === this.adjustUrlPath) {
        this.currentLink = linkItem;
      }
    }
  }

  /**
   * カレント適用
   */
  replaceLinkWithHighlight() {
    this.currentLink.replaceWith((() => {
      const newElement = document.createElement('em');
      newElement.textContent = this.currentLink.textContent;
      newElement.setAttribute('aria-current', 'page');

      return newElement;
    })());
  }

  /**
   * カレントリンク以外のリンクアイテムで、
   * 子ディレクトリ要素がある場合、それを非表示にする。
   */
  hideChildDirectories() {
    const listItems = this.root.querySelectorAll(config.itemSelector);

    for (const listItem of listItems) {
      const containCurrent = listItem.querySelector('[aria-current="page"]');

      if (!containCurrent) {
        const childList = listItem.querySelector(config.childListSelector);

        if (childList) {
          childList.hidden = true;
        }
      }
    }
  }
}
