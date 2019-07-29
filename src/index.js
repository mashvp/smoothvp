import { watchViewport, unwatchViewport } from 'tornis';

import { Easing, Direction, Position } from './constants';
import {
  css,
  getPageOffset,
  horizontalToVertical,
  isChildOf,
  later,
  next,
  verticalToHorizontal,
} from './utils';

const Smoothvp = (container, content, { direction = Direction.VERTICAL } = {}) => {
  const handlers = { update: [] };
  let spacer;
  let stylesheet;

  const addEventListener = (event, handler) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
      throw new Error(`Event '${event}' is not supported`);
    }

    handlers[event].push(handler);
  };

  const removeEventListener = (event, handler) => {
    if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
      throw new Error(`Event '${event}' is not supported`);
    }

    const index = handlers[event].indexOf(handler);
    if (index !== -1) {
      handlers[event].splice(index, 1);
    }
  };

  const dispatch = event => handlers[event.type].forEach(handler => handler(event));

  const getTranslation = (y) => {
    const rounded = Math.floor(y);

    if (direction === Direction.HORIZONTAL) {
      return `translate3D(${-rounded}px, 100vh, 0) rotate(-90deg)`;
    }

    return `translate3D(0, ${-rounded}px, 0)`;
  };

  const createSpacer = (height) => {
    spacer = document.createElement('div');

    spacer.classList.add('smoothvp-spacer');
    spacer.style.height = `${height}px`;

    container.parentElement.appendChild(spacer);
  };

  const scrollToElement = (target, options = { offset: undefined, position: Position.CENTER }) => {
    const { offset, position } = options;

    if (isChildOf(target, content)) {
      if (direction === Direction.VERTICAL) {
        const { top, centerTop, bottomTop } = getPageOffset(target);
        const basePosition = ((pos) => {
          switch (pos) {
            case Position.TOP:
              return top;
            case Position.CENTER:
              return centerTop;
            case Position.BOTTOM:
              return bottomTop;
            default:
              return centerTop;
          }
        })(position);

        if (typeof offset === typeof undefined) {
          window.scrollTo(0, basePosition);
        } else {
          window.scrollTo(0, basePosition + offset);
        }
      } else {
        const hToVOffset = horizontalToVertical({
          ...options,
          spacer,
          content,
          target,
        });

        window.scrollTo(0, hToVOffset);
      }
    }
  };

  const scrollToPosition = offset => window.scrollTo(0, offset);

  const scrollTo = (
    targetOrPosition,
    options = { offset: undefined, position: Position.CENTER },
  ) => {
    if (targetOrPosition instanceof HTMLElement) {
      return scrollToElement(targetOrPosition, options);
    }

    scrollToPosition(targetOrPosition);
  };

  const handleViewportUpdate = ({ scroll, size }) => {
    if (size.changed) {
      const { width } = spacer.getBoundingClientRect();
      const { width: x, height: y } = content.getBoundingClientRect();

      const spacerSize = direction === Direction.VERTICAL ? y : x;

      spacer.style.height = `${spacerSize}px`;
      container.style.width = `${width}px`;

      if (direction === Direction.HORIZONTAL) {
        container.style.height = `${y}px`;
      }
    }

    if (scroll.changed) {
      const event = new Event('update');
      const { top } = scroll;

      if (direction === Direction.VERTICAL) {
        content.style.transform = getTranslation(top);
        event.top = top;
      } else {
        const vToHOffset = verticalToHorizontal({
          spacer,
          top,
          size,
        });

        content.style.transform = getTranslation(vToHOffset);
        event.top = top;
      }

      dispatch(event);
    }
  };

  const handleKeyboardEvent = (event) => {
    const key = event.code || event.which;

    if (key === 9 || key === 'Tab') {
      next(() => scrollToElement(document.activeElement));
    }
  };

  const applyKeyboardHandler = () => {
    document.addEventListener('keydown', handleKeyboardEvent);
  };

  const removeKeyboardHandler = () => {
    document.removeEventListener('keydown', handleKeyboardEvent);
  };

  const installStylesheet = () => {
    stylesheet = css`
      html,
      body,
      .smoothvp-container {
        overscroll-behavior: none;
      }

      .smoothvp-container {
        overflow: visible;
        position: fixed;
        top: 0;
      }

      .smoothvp-content.smoothvp-horizontal {
        width: 100vh;
        transform-origin: left top;
      }

      .smoothvp-content.smoothvp-horizontal .smoothvp-rotate {
        transform-origin: center center;
        transform: rotate(90deg);
      }
    `;
  };

  const uninstallStylesheet = () => {
    stylesheet.uninstall();
  };

  const smooth = ({ duration = 500, timingFunction = Easing.EASE_OUT_QUINT }) => {
    if (
      typeof window.orientation !== typeof undefined
      || navigator.userAgent.indexOf('IEMobile') !== -1
    ) return;

    installStylesheet();
    applyKeyboardHandler();

    later(() => {
      const { height: contentHeight, width: contentWidth } = content.getBoundingClientRect();
      const { scrollY } = window;

      createSpacer(direction === Direction.VERTICAL ? contentHeight : contentWidth);

      container.classList.add('smoothvp-container');
      container.style.height = direction === Direction.VERTICAL ? '100vh' : `${contentHeight}px`;
      container.style.width = direction === Direction.VERTICAL ? `${contentWidth}px` : '';

      content.classList.add('smoothvp-content');
      content.classList.add(`smoothvp-${direction}`);
      content.style.transform = getTranslation(scrollY);

      later(() => {
        content.style.transition = `transform ${duration}ms ${timingFunction}`;
      }, 10);

      watchViewport(handleViewportUpdate);
    });
  };

  const unsmooth = () => {
    if (
      typeof window.orientation !== typeof undefined
      || navigator.userAgent.indexOf('IEMobile') !== -1
    ) return;

    uninstallStylesheet();
    removeKeyboardHandler();

    later(() => {
      spacer.parentElement.removeChild(spacer);

      container.classList.remove('smoothvp-container');
      container.style.height = '';
      container.style.width = '';

      content.classList.remove('smoothvp-content', `smoothvp-${direction}`);
      content.style.transition = '';
      content.style.transform = '';

      unwatchViewport(handleViewportUpdate);
    });
  };

  return {
    smooth,
    start: smooth,
    unsmooth,
    stop: unsmooth,

    scrollTo,

    addEventListener,
    removeEventListener,
  };
};

Smoothvp.Easing = Easing;
Smoothvp.Direction = Direction;
Smoothvp.Position = Position;

window.Smoothvp = Smoothvp;
export default Smoothvp;
