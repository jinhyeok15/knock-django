import { Component } from "../../view.js";

export function KeywordInput() {
  return new Component(
    'keyword-input',
    'input',
    {
      type: 'text',
      class: 'keyword-input',
      autofocus: true
    }
  );
};

export function KeywordInputButton() {
  const component = new Component(
    'keyword-input-button',
    'button',
    {
      type: 'button',
      class: 'keyword-input-button'
    }
  )
  component.elem.innerText = '입력';
  return component;
};

export function Container() {
  return new Component(
    'container',
    'div',
    {
      class: 'container'
    }
  );
}

export function KeywordBox(docId, keywordInfo) {
  const style = `left: ${keywordInfo.left}px; top: ${keywordInfo.top}px;`;
  return (new Component(
    `${docId}-keyword-${keywordInfo.id}`,
    'div',
    {
      class: 'keyword-box',
      style: style
    }
  )).text(keywordInfo.title)
  .child((new Component(
    null,
    'a',
    {
      href: '',
      class: 'keyword-clickable',
    }
  )).child((new Component(
    null,
    'span',
    {
      class: 'hyperspan'
    }
  ))));
}
