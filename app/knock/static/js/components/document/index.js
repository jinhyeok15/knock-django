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
