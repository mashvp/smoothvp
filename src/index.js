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

const Smoothvp = (container, content) => {
  let hitbox;

  const getTranslation = y => `translate3D(0, ${-y}px, 0)`;

  const createHitbox = (height) => {
    hitbox = document.createElement('div');

    hitbox.classList.add('smoothvp-hitbox');
    hitbox.style.height = `${height}px`;

    container.parentElement.appendChild(hitbox);
  };

  const handleViewportUpdate = ({ scroll, size }) => {
    if (scroll.changed) {
      const { top } = scroll;

      content.style.transform = getTranslation(top);
    }

    if (size.changed) {
      const { width } = hitbox.getBoundingClientRect();
      const y = content.offsetHeight;

      hitbox.style.height = `${y}px`;
      container.style.width = `${width}px`;
    }
  };

  const smooth = ({ duration = 500, timingFunction = Easing.EASE_OUT_QUINT }) => {
    later(() => {
      const { width } = container.getBoundingClientRect();
      const { height } = content.getBoundingClientRect();
      const { scrollY } = window;

      createHitbox(height);

      container.style.overflow = 'hidden';
      container.style.position = 'fixed';
      container.style.height = '100vh';
      container.style.width = `${width}px`;

      content.style.transform = getTranslation(scrollY);
      later(() => {
        content.style.transition = `transform ${duration}ms ${timingFunction}`;
      }, scrollY !== 0 ? 10 : 0);

      watchViewport(handleViewportUpdate);
    });
  };

  const unsmooth = () => {
    later(() => {
      hitbox.parentElement.removeChild(hitbox);

      container.style.overflow = '';
      container.style.position = '';
      container.style.height = '';
      container.style.width = '';

      content.style.transform = '';
      content.style.transition = '';

      unwatchViewport(handleViewportUpdate);
    });
  };

  return { smooth, unsmooth };
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
