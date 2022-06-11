/**
 * Structure is concept of block that is built by HTMLElements.
 */
export class Structure {
  /**
   * this.elem: make element if Structure initialized.
   * If you want to get element that is already constructed, use a method this.getElem()
   * 
   * this.id: get id attribute from HTMLElement.
   * 
   * this.state: set state by using this.setState().
   * 
   * this.write: true if Structure is already render.
   * @param {HTMLElement} element 
   * @param {object} attr element attributors
   */
  constructor(element, attr={}) {
    this.elem = document.createElement(element);
    Object.entries(attr)
      .map(([key, val] = entry) => this.elem.setAttribute(key, val));
    this.id;
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

  /**
   * use to make structure's child. return -> this
   * @param {Structure|Array<Structure>} components 
   * @returns {Structure} this
   */
  child(components) {
    if (Array.isArray(components))
      components.forEach(component => this.elem.appendChild(component.elem));
    else this.elem.appendChild(components.elem);
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

/**
 * 
 * @param {Structure} structure 
 * @param {undefined|Structure} parent 
 * @returns {Structure}
 */
export function renderStructure(structure, parent=undefined) {
  let elem;
  if (typeof parent==='undefined') {elem = document.body}
  else if (parent.constructor.name === 'Structure') {elem = parent.getElem()}
  else {throw new Error(`Parent type must be undefined|Structure. -> ${typeof parent}`)}

  if (structure.write===false) {
    elem.appendChild(structure.getElem());
    structure.write=true;
  }
  return structure;
}

/**
 * Component is used to render view, it is core concept to implement SPA application.
 */
export class Component {
  /**
   * this.storage: use storage
   * 
   * this.structure: structure
   * @param {object} props 
   */
  constructor(props={}) {
    this.storage;
    this.structure;
    this.props = props;
  }

  /**
   * 
   * @param {Component} parent 
   * @returns this
   */
  render(parent) {
    renderStructure(this.structure, parent=parent);
    this.onListen();
    return this;
  }

  onListen() {
    return this;
  }
}
