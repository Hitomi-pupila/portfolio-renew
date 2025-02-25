const config = {
  // selector
  listSelector: '.js-tabPanel__list',
  listItemSelector: '.js-tabPanel__listItem',
  linkSelector: '.js-tabPanel__link',
  contentSelector: '.js-tabPanel__content',
};

/**
 * タブパネル
 * @module modules/tabPanel
 */
export class TabPanel {
  /**
   * @param {HTMLElement} element 機能構築の起点となるHTML要素
   */
  constructor(element) {
    this.root = element;
    this.list = null;
    this.listItem = null;
    this.link = null;
    this.content = null;
    this.idPrefix = '';
    this.recentNumber = 0;
    this.anotherList = null;
    this.anotherListItem = null;
    this.anotherLink = null;
  }

  /**
   * 初期処理
   */
  init() {
    this.setSelector();
    this.setA11y();
    this.bindEvent();
    this.syncHashTab();
    this.showPanel(this.recentNumber);
  }

  /**
   * 機能の準備・設定
   */
  setSelector() {
    this.list = this.root.querySelector(config.listSelector);
    this.listItem = this.list.querySelectorAll(config.listItemSelector);
    this.link = this.list.querySelectorAll(config.linkSelector);
    this.content = this.root.querySelectorAll(config.contentSelector);
  }

  /**
   * アクセシビリティ設定
   */
  setA11y() {
    const tabLists = this.root.querySelectorAll(config.listSelector);

    this.idPrefix = `js-tabPanel-${Math.random().toString().substring(2)}`;

    this.list.setAttribute('role', 'tablist');

    this.listItem.forEach((listItem) => {
      listItem.setAttribute('role', 'presentation');
    });

    this.link.forEach((link, index) => {
      link.setAttribute('role', 'tab');
      link.setAttribute('aria-controls', `${this.idPrefix}-tabpanel${index}`);
      link.setAttribute('id', `${this.idPrefix}-tab${index}`);
    });

    this.content.forEach((content, index) => {
      content.setAttribute('role', 'tabpanel');
      content.setAttribute('aria-labelledby', `${this.idPrefix}-tab${index}`);
      content.setAttribute('id', `${this.idPrefix}-tabpanel${index}`);
      content.setAttribute('tabindex', '0');
    });

    if (tabLists.length === 2) {
      this.controlBottomTab(tabLists[1]);
    }
  }

  /**
   * 2つ目のタブのアクセシビリティ設定
   */
  setA11yAnotherTab() {
    this.anotherList.setAttribute('role', 'tablist');

    this.anotherListItem.forEach((listItem) => {
      listItem.setAttribute('role', 'presentation');
    });

    this.anotherLink.forEach((link, index) => {
      link.setAttribute('role', 'tab');
      link.setAttribute('aria-controls', `${this.idPrefix}-tabpanel${index}`);
    });

    this.anotherLink[this.recentNumber].setAttribute('aria-selected', 'true');
  }

  /**
   * イベント登録
   */
  bindEvent() {
    this.link.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); // アンカーリンクのハッシュを伝搬させない

        if (index !== this.recentNumber) {
          this.recentNumber = index;
          this.showPanel(index);
        }
      });

      link.addEventListener('keydown', this.keyCtrl);
    });
  }

  /**
   * パネルを表示
   * @param {number} current 表示するパネルのインデックス
   */
  showPanel(current) {
    // 一旦全部閉じる
    this.hidePanel();

    this.link[current].setAttribute('aria-selected', 'true');
    this.content[current].hidden = false;

    if (this.anotherLink) {
      this.anotherLink[current].setAttribute('aria-selected', 'true');
    }
  }

  /**
   * パネルを非表示
   */
  hidePanel() {
    this.link.forEach((link) => {
      link.setAttribute('aria-selected', 'false');
    });

    this.content.forEach((content) => {
      content.hidden = true;
    });

    if (this.anotherLink) {
      this.anotherLink.forEach((link) => {
        link.setAttribute('aria-selected', 'false');
      });
    }
  }

  /**
   * ハッシュに対応するタブを同期
   */
  syncHashTab() {
    const { hash } = location;

    if (hash) {
      const index = Array.from(this.link).findIndex((link) =>
        link.hash === hash);

      if (index !== -1) {
        this.recentNumber = index;
        this.scroll(this.link[index]);
        this.link[index].focus();
      }
    }
  }

  /**
   * スムーススクロール
   */

  scroll(hashTab) {
    const localNavBtn = document.querySelector('.l-navLocal__button');
    const hashTabOffset = hashTab.getBoundingClientRect().top;

    if (!localNavBtn) {
      window.scrollTo({
        top: hashTabOffset,
        behavior: 'smooth',
      });
    } else {
      const localNavHeight = localNavBtn.offsetHeight;
      const targetOffset = hashTabOffset - localNavHeight;

      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth',
      });
    }
  }

  /**
   * タブのキーボード操作
   */
  keyCtrl(event) {
    /**
     * @param {KeyboardEvent} event - キーボードイベント
     */
    const { key, currentTarget } = event;
    let target;
    let next;
    let prev;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      next = currentTarget.parentNode.nextElementSibling;

      if (next) {
        target = next.querySelector(config.linkSelector);
      } else {
        target = currentTarget.parentNode.parentNode.firstElementChild.querySelector(config.linkSelector);
      }
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      prev = currentTarget.parentNode.previousElementSibling;

      if (prev) {
        target = prev.querySelector(config.linkSelector);
      } else {
        target = currentTarget.parentNode.parentNode.lastElementChild.querySelector(config.linkSelector);
      }
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowDown') {
      event.preventDefault();
      target.focus();
    }
  }

  /**
   * 2つ目のタブを制御
   * @param {NodeList} anotherList - 別のタブの要素のリスト
   */
  controlBottomTab(anotherList) {
    this.anotherList = anotherList;
    this.anotherListItem = this.anotherList.querySelectorAll(config.listItemSelector);
    this.anotherLink = this.anotherList.querySelectorAll(config.linkSelector);

    this.setA11yAnotherTab();
    this.bindEventAnotherTab();
  }

  /**
   * 2つ目のタブのイベント登録
   */
  bindEventAnotherTab() {
    this.anotherLink.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); // アンカーリンクのハッシュを伝搬させない

        if (index !== this.recentNumber) {
          this.recentNumber = index;
          this.showPanel(index);
        }

        this.link[index].scrollIntoView({ behavior: 'smooth',
          block: 'start' });

        this.link[index].focus();
      });

      link.addEventListener('keydown', (event) => {
        this.keyCtrl(event, event.currentTarget);
      });
    });
  }
}
