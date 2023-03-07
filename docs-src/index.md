---
layout: page.11ty.cjs
title: <eco-index> ⌲ Home
---

# &lt;eco-index>

`<eco-index>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<eco-index>` is just an HTML element. You can it anywhere you can use HTML!

```html
<eco-index></eco-index>
```

  </div>
  <div>

<eco-index></eco-index>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<eco-index>` can be configured with attributed in plain HTML.

```html
<eco-index name="HTML"></eco-index>
```

  </div>
  <div>

<eco-index name="HTML"></eco-index>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<eco-index>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;eco-index&gt;</h2>
    <eco-index .name=${name}></eco-index>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;eco-index&gt;</h2>
<eco-index name="lit-html"></eco-index>

  </div>
</section>
