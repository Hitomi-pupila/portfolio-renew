/**
 * @jest-environment jsdom
 */
import { Facade } from '../facade';

describe('Facade', () => {
  let container;

  beforeEach(() => {
    // DOMセットアップ
    document.body.innerHTML = `
      <div class="js-facade">
        <div class="js-facade__item"
             data-src="https://example.com"
             data-loading="lazy"
             data-title="Sample Title">
        </div>
      </div>
    `;
    container = document.querySelector('.js-facade');
  });

  test('set() が iframe を正しく準備できる', () => {
    const facade = new Facade(container);
    facade.set();

    expect(facade.newItem).toBeInstanceOf(HTMLIFrameElement);
    expect(facade.newItem.getAttribute('src')).toBe('https://example.com');
    expect(facade.newItem.getAttribute('loading')).toBe('lazy');
    expect(facade.newItem.getAttribute('title')).toBe('Sample Title');
    expect(facade.newItem.className).toBe('js-facade__item');
  });

  test('replaceElement() が要素を置き換える', () => {
    const facade = new Facade(container);
    facade.set();
    facade.replaceElement();

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toBe('https://example.com');
  });

  test('init() を呼ぶと set() と bindEvent() が呼ばれる', () => {
    const facade = new Facade(container);
    const setSpy = jest.spyOn(facade, 'set');
    const bindSpy = jest.spyOn(facade, 'bindEvent');

    facade.init();

    expect(setSpy).toHaveBeenCalled();
    expect(bindSpy).toHaveBeenCalled();
  });

  test('IntersectionObserverが発火すると replaceElement が呼ばれる', () => {
    const facade = new Facade(container);
    facade.set();
    const replaceSpy = jest.spyOn(facade, 'replaceElement');

    // IntersectionObserver をモック
    const mockObserve = jest.fn();
    global.IntersectionObserver = jest.fn(function (cb) {
      this.observe = mockObserve;
      // 呼び出し直後に強制的にコールバックを呼ぶ
      cb([{ isIntersecting: true }]);
    });

    facade.bindEvent();

    expect(replaceSpy).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(container);
  });
});
