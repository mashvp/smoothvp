export const onInit = callback => document.addEventListener('DOMContentLoaded', callback);

export const later = (callback, timeout = 10) => {
  if (timeout === 0) {
    callback();
  } else {
    setTimeout(callback, timeout);
  }
};
