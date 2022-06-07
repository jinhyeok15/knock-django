export class Component {
  constructor(name, element, attr={}) {
    this.elem = document.createElement(element);
    if (name!==null){
      this.elem.setAttribute("id", name);
    }
    Object.entries(attr)
      .map(([key, val] = entry) => this.elem.setAttribute(key, val));
    this.write = false;
    this.render();
  }

  child(component) {
    this.elem.appendChild(component.elem);
    return this;
  }

  text(t) {
    this.elem.innerText = t;
    return this;
  }

  render() {}
}

export function render(component, parent=document.body) {
  if (component.write===false) {
    parent.appendChild(component.elem);
    component.write=true;
  }
  return component.elem;
}
