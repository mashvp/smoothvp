import { Position } from './constants';

export const onInit = callback => document.addEventListener('DOMContentLoaded', callback);

export const later = (callback, timeout = 10) => {
  if (timeout === 0) {
    callback();
  } else {
    setTimeout(callback, timeout);
  }
};

export const next = callback => requestAnimationFrame(callback);

export const isChildOf = (element, targetParent) => {
  let current = element;

  while (current) {
    if (current === targetParent) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
};

export const verticalToHorizontal = ({ spacer, top, size }) => {
  const { height: spacerHeight } = spacer.getBoundingClientRect();

  const percent = top / (spacerHeight - size.y);

  return (spacerHeight - size.x) * percent;
};

export const horizontalToVertical = ({
  offset, position, spacer, content, target,
}) => {
  const { height: spacerHeight } = spacer.getBoundingClientRect();
  const { left: contentLeft } = content.getBoundingClientRect();
  const { left: targetLeft, width: targetWidth } = target.getBoundingClientRect();

  const targetTop = Math.floor(targetLeft + Math.abs(contentLeft));
  const targetCenter = targetTop - (window.innerWidth / 2 - targetWidth / 2);
  const targetBottom = targetTop - window.innerWidth + targetWidth;

  const targetOffset = ((pos) => {
    switch (pos) {
      case Position.TOP:
        return targetTop;
      case Position.CENTER:
        return targetCenter;
      case Position.BOTTOM:
        return targetBottom;
      default:
        return targetCenter;
    }
  })(position);

  const percent = (targetOffset + offset) / (spacerHeight - window.innerWidth);
  const scrollTop = percent * (spacerHeight - window.innerHeight);

  return scrollTop;
};

export const getPageOffset = (element) => {
  const {
    left, top, width, height,
  } = element.getBoundingClientRect();

  return {
    left: left + window.scrollY,
    top: top + window.scrollY,
    centerLeft: left + window.scrollY - (window.innerWidth - width) / 2,
    centerTop: top + window.scrollY - (window.innerHeight - height) / 2,
    bottomLeft: left + window.scrollY - window.innerWidth + width,
    bottomTop: top + window.scrollY - window.innerHeight + height,
    width,
    height,
  };
};

export const css = (strings, ...values) => {
  if (document.getElementById('smoothvp-styles')) return;

  const style = document.createElement('style');
  const cssContent = strings.map((string, i) => string + values[i]).join('');

  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'smoothvp-styles');

  document.head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = cssContent;
  } else {
    style.appendChild(document.createTextNode(cssContent));
  }

  const uninstall = () => style.parentElement.removeChild(style);

  return { style, uninstall };
};
