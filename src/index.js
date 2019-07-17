import { watchViewport, unwatchViewport } from 'tornis';

import { later } from './utils';

export const Easing = {
  EASE_OUT_SINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  EASE_OUT_QUINT: 'cubic-bezier(0.23, 1, 0.32, 1)',
  EASE_OUT_CIRC: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  EASE_OUT_QUAD: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  EASE_OUT_EXPO: 'cubic-bezier(0.19, 1, 0.22, 1)',
  EASE_OUT_BACK: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

const Smoothvp = (container, content, { direction = 'vertical' } = {}) => {
  const handlers = { update: [] };
  let spacer;

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
    if (direction === 'horizontal') {
      return `translate3D(${-y}px, 100vh, 0) rotate(-90deg)`;
    }

    return `translate3D(0, ${-y}px, 0)`;
  };

  const createSpacer = (height) => {
    spacer = document.createElement('div');

    spacer.classList.add('smoothvp-spacer');
    spacer.style.height = `${height}px`;

    container.parentElement.appendChild(spacer);
  };

  const handleViewportUpdate = ({ scroll, size }) => {
    if (scroll.changed) {
      const event = new Event('update');
      const { top } = scroll;

      if (direction === 'vertical') {
        content.style.transform = getTranslation(top);
        event.top = top;
      } else {
        const { height: spacerHeight } = spacer.getBoundingClientRect();
        const percent = top / (spacerHeight - size.y);
        const diff = window.innerHeight - window.innerWidth;

        content.style.transform = getTranslation(top + diff * percent);
        event.top = top;
      }

      dispatch(event);
    }

    if (size.changed) {
      const { width } = spacer.getBoundingClientRect();
      const { width: x, height: y } = content.getBoundingClientRect();

      const spacerSize = direction === 'vertical' ? y : x;

      spacer.style.height = `${spacerSize}px`;
      container.style.width = `${width}px`;
    }
  };

  const applyTabFix = () => {
    document.addEventListener('keydown', (event) => {
      const key = event.code || event.which;

      if (key === 9 || key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    });
  };

  const smooth = ({ duration = 500, timingFunction = Easing.EASE_OUT_QUINT }) => {
    if (
      typeof window.orientation !== typeof undefined
      || navigator.userAgent.indexOf('IEMobile') !== -1
    ) return;

    applyTabFix();

    later(() => {
      const { height: contentHeight, width: contentWidth } = content.getBoundingClientRect();
      const { scrollY } = window;

      createSpacer(direction === 'vertical' ? contentHeight : contentWidth);

      container.style.overflow = 'hidden';
      container.style.position = 'fixed';
      container.style.height = direction === 'vertical' ? '100vh' : `${contentHeight}px`;
      container.style.width = direction === 'vertical' ? `${contentWidth}px` : '';

      if (direction === 'horizontal') {
        content.style.transformOrigin = 'left top';
        content.style.width = '100vh';

        const children = Array.from(content.querySelectorAll('*'));

        children.forEach((child) => {
          if (child.classList.contains('smoothvp-rotate')) {
            child.style.transformOrigin = 'center';
            child.style.transform = 'rotate(90deg)';
          }
        });
      }

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

    later(() => {
      spacer.parentElement.removeChild(spacer);

      container.style.overflow = '';
      container.style.position = '';
      container.style.height = '';
      container.style.width = '';

      content.style.transform = '';
      content.style.transition = '';

      unwatchViewport(handleViewportUpdate);
    });
  };

  return {
    smooth,
    unsmooth,
    addEventListener,
    removeEventListener,
  };
};

Smoothvp.Easing = {
  EASE_OUT_SINE: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  EASE_OUT_QUINT: 'cubic-bezier(0.23, 1, 0.32, 1)',
  EASE_OUT_CIRC: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  EASE_OUT_QUAD: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  EASE_OUT_EXPO: 'cubic-bezier(0.19, 1, 0.22, 1)',
  EASE_OUT_BACK: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

window.Smoothvp = Smoothvp;
export default Smoothvp;
