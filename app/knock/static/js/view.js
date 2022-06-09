export class Component {
  constructor(element, attr={}) {
    this.id;
    this.elem = document.createElement(element);
    Object.entries(attr)
      .map(([key, val] = entry) => this.elem.setAttribute(key, val));
    this.write = false;
  }

  static a = (href='', attr={}) => {
    return new Component('a', Object.assign({}, {href:href}, attr));
  }

  static input = (type='', attr={}) => {
    return new Component('input', Object.assign({}, {'type':type}, attr));
  }

  static button = (type='', attr={}) => {
    return new Component('button', Object.assign({}, {'type':type}, attr));
  }

  setId(id) {
    this.elem.setAttribute('id', id);
    this.id = id;
    return this;
  }

  getElem() {
    const e = document.getElementById(this.id);
    if (e === null) {
      return this.elem;
    } else {
      return e;
    }
  }

  setCls(cls) {
    this.elem.setAttribute('class', cls);
    return this;
  }

  child(component) {
    this.elem.appendChild(component.elem);
    return this;
  }

  nextNode(component) {
    this.elem.after(component.elem);
    return this;
  }

  text(t) {
    this.elem.innerText = t;
    return this;
  }
}

export function renderComponent(component, parent=document.body) {
  if (component.write===false) {
    parent.appendChild(component.getElem());
    component.write=true;
  }
  return component;
}

export class ComponentView {
  constructor(props={}) { // props type is object
    this.storage;
    this.structure;
    this.props = props;
  }

  render(parent) {
    this.structure
      .map(comp => renderComponent(comp, parent=parent));
    this.onListen();
    return this;
  }

  onListen() {
    return this;
  }
}
