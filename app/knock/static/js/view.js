export class Component {
  constructor(name, element, attr={}) {
    this.elem = document.createElement(element);
    this.elem.setAttribute("id", name);
    Object.entries(attr)
      .map(([key, val] = entry) => this.elem.setAttribute(key, val));
    this.write = false;
  }

  render(parent=document.body) {
    if (this.write===false) {
      parent.appendChild(this.elem);
      this.write=true;
    }
    return this.elem;
  }
}

export function render(component, parent=document.body) {
  if (component.write===false) {
    parent.appendChild(component.elem);
    component.write=true;
  }
  return component.elem;
}
