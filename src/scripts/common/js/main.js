import { Facade } from '/common/js/modules/facade.js';
import { TabPanel } from '/common/js/modules/tabPanel.js';
import { HamburgerMenu } from '/common/js/modules/hamburgerMenu.js';
import { Timeline } from '/common/js/modules/timeline.js';
import { FadeIn } from '/common/js/modules/fadeIn.js';
import { Current } from '/common/js/modules/current.js';
import { DetailsLocalNav } from '/common/js/modules/detailsLocalNav.js';

/* ファサード */
(() => {
  const facadeItems = document.querySelectorAll('.js-facade');

  if (facadeItems.length === 0) {
    return;
  }

  for (const facadeItem of facadeItems) {
    const instance = new Facade(facadeItem);

    instance.init();
  }
})();

/* タブ */
(() => {
  const tabPanel = document.querySelectorAll('.js-tabPanel');

  for (const item of tabPanel) {
    const tab = new TabPanel(item);

    tab.init();
  }
})();


/* ハンバーガーメニュー */
(() => {
  const hambergerRoot = document.querySelector('.js-hamburger');

  if (hambergerRoot) {
    const hamburgerMenu = new HamburgerMenu(hambergerRoot);

    hamburgerMenu.init();
  }
})();

/* タイムライン */
(() => {
  const timelineRoot = document.querySelector('.js-timeline');

  if (timelineRoot) {
    const timeline = new Timeline(timelineRoot, {
      rootMargin: '-35% 0px',
    });

    timeline.init();
  }
})();

/* フェードイン */
(() => {
  const fadeInItem = document.querySelectorAll('.js-fadeIn');

  for (const item of fadeInItem) {
    const fadeIn = new FadeIn(item, {
      rootMargin: '-15%',
    });

    fadeIn.init();
  }
})();

/** カレント */
(() => {
  const currentRoot = document.querySelectorAll('.js-current');

  for (const item of currentRoot) {
    const current = new Current(item);
    current.init();
  }
})();

/** details要素のローカルナビ */
(() => {
  const detailsLocalNavElement = document.querySelectorAll('.js-detailsLocalNav');

  for (const item of detailsLocalNavElement) {
    const detailsLocalNav = new DetailsLocalNav(item);
    detailsLocalNav.init();
  }
})();
