/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {EcoIndex} from '../eco-index.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('eco-index', () => {
  test('is defined', () => {
    const el = document.createElement('eco-index');
    assert.instanceOf(el, EcoIndex);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<eco-index></eco-index>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<eco-index name="Test"></eco-index>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<eco-index></eco-index>`)) as EcoIndex;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<eco-index></eco-index>`)) as EcoIndex;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
