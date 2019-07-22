# Smoothvp

A native JavaScript scroll inertia smoothing library.
Pronounced "Smooth up".

## Installation

With npm

```sh
npm i @mashvp/smoothvp
```

With yarn

```sh
yarn add @mashvp/smoothvp
```

## Usage

- ES6: Import the default Smoothvp function
- 1998 script tag: You can use the global `window.Smoothvp` function

### Smoothvp#smooth

Given the HTML structure:

```html
<body>
  <main id="container">
    <section id="content">
      <p>Some content...</p>
    </section>
  </main>
</body>
```

Use `smooth` to initialize the library on your container. Smoothvp works for both vertical and horizontal layouts.

```js
import Smoothvp from '@mashvp/smoothvp';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const content = document.getElementById('content');

  const smoothvp = Smoothvp(container, content, {
    direction: Smoothvp.Direction.VERTICAL,
  });

  smoothvp.smooth({
    duration: 500,
    timingFunction: Smoothvp.Easing.EASE_OUT_CUBIC,
  });
});
```

Note: As of today, the horizontal mode rotates your layout, and allows you to add the `smoothvp-rotate` class on the elements you want to rotate back. This works better with regular grid layouts, but will not work for everyone.

### Smoothvp#scrollTo

Use `scrollTo` to programmatically scroll to a specific point or element in your page.

```js
// Scroll to a specific point in the page
smoothvp.scrollTo(512);

// Scroll to an element (centered in viewport by default)
const element = document.querySelector('...');
smoothvp.scrollTo(element);

// Scroll to an element, aligned to the top of the viewport, with an offset of -70.
// The TOP and BOTTOM alignments align to the left and right in horizontal mode.
// If your site has a floating navbar, you can use the offset value to dodge it.
smoothvp.scrollTo(element, { position: Smoothvp.Position.TOP, offset: -70 });
```

### Smoothvp#unsmooth

Call the `unsmooth` function on your Smoothvp instance to disable smoothing.

### Options

#### duration

Duration of the smoothing effect, in milliseconds. Defaults to 700ms.

#### timingFunction

The CSS timing function to use for the smoothing effect. Any builtin CSS function or cubic-bezier can be used.

### Constants

#### Easings

Smoothvp provides builtin easing helpers, available under `Smoothvp.Easing`.

| Name           | Corresponding value                     |
| -------------- | --------------------------------------- |
| EASE_OUT_SINE  | cubic-bezier(0.39, 0.575, 0.565, 1)     |
| EASE_OUT_CUBIC | cubic-bezier(0.215, 0.61, 0.355, 1)     |
| EASE_OUT_QUINT | cubic-bezier(0.23, 1, 0.32, 1)          |
| EASE_OUT_CIRC  | cubic-bezier(0.075, 0.82, 0.165, 1)     |
| EASE_OUT_QUAD  | cubic-bezier(0.25, 0.46, 0.45, 0.94)    |
| EASE_OUT_QUART | cubic-bezier(0.165, 0.84, 0.44, 1)      |
| EASE_OUT_EXPO  | cubic-bezier(0.19, 1, 0.22, 1)          |
| EASE_OUT_BACK  | cubic-bezier(0.175, 0.885, 0.32, 1.275) |

## Events

You can listen to the `update` event to get the scroll position on every update.

```js
import Smoothvp from '@mashvp/smoothvp';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const content = document.getElementById('content');

  const smoothvp = Smoothvp(container, content);
  smoothvp.smooth();

  smoothvp.addEventListener('update', event => {
    const { top } = event;

    console.log(top);
  });
});
```

You can also use `removeEventListener` like on any HTML element.

## Credits

- [Robb Owen](https://github.com/robb0wen) and his awesome library [Tornis](https://github.com/robb0wen/tornis).
- [Victor Timsit](https://github.com/vtimsit) for his [SmoothScroll.js](https://github.com/vtimsit/SmoothScroll.js) demo, on which Smoothvp is largely based.
