export class Structure {
  constructor(element, attr={}) {
    this.id;
    this.elem = document.createElement(element);
    Object.entries(attr)
      .map(([key, val] = entry) => this.elem.setAttribute(key, val));
    this.state = {};
    this.write = false;
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

  child(components) {
    components.forEach(component => this.elem.appendChild(component.elem));
    return this;
  }

  text(t) {
    this.elem.innerText = t;
    return this;
  }

  setState(state) {
    Object.assign(this.state, state);
    return this;
  }
}

export class Main extends Structure {
  constructor() {
    super('main');
  }
}

export function renderStructure(structure, parent=document.body) {
  if (structure.write===false) {
    parent.appendChild(structure.getElem());
    structure.write=true;
  }
  return structure;
}

export class Component {
  constructor(props={}) { // props type is object
    this.storage;
    this.structure;
    this.structures=[];
    this.props = props;
  }

  render(parent) {
    if (this.structures.length !== 0) {
      this.structures.forEach((structure) => {
        renderStructure(structure, parent=parent);
      })
    } else { renderStructure(this.structure, parent=parent) }
    this.onListen();
    return this;
  }

  onListen() {
    return this;
  }
}
