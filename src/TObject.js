/**
 * @author Dominic Ming
 * TObject is basic module of all 3d object
 */

import Other from 'other';

const v = Other.valid;
const vp = Other.validPlus;
const vm = Other.validMatch;

export default class TObject {
  // x,y,z is for position of object
  x = 0;
  y = 0;
  z = 0;
  // rotation of object
  rotationX = 0;
  rotationY = 0;
  rotationZ = 0;
  // scale of object
  scaleX = 1;
  scaleY = 1;
  scaleZ = 1;
  // basic 3d object property
  width = 0;
  height = 0;
  depth = 0;
  // sort is for the order of x, y, z.
  __sort = ['X', 'Y', 'Z'];
  // origin
  originX = '50%';
  originY = '50%';
  originZ = '0px';
  // __org is for transform
  __orgO = {x: '50%', y: '50%', z: '0px'};
  __orgT = {x: '-50%', y: '-50%', z: '0px'};
  __orgF = {x: 0, y: 0, z: 0};
  // basic children is a array
  parent = null;
  children = [];
  // prefix for adopt browser
  prefix = Other.prefixCheck();

  constructor(params) {
    // this is leave for more function
  }

  /**
   * Set position for object
   * @param {number} x
   * @param {number} [y]
   * @param {number} [z]
   * @returns {TObject}
   */
  position(x, y, z) {
    [this.x, this.y, this.z] = v([x,y,z],[this.x, this.y, this.z]);
    return this;
  }

  /**
   * Move object
   * @param {number} dx
   * @param {number} [dy]
   * @param {number} [dz]
   * @returns {TObject}
   */
  move(dx, dy, dz) {
    [this.x,this.y,this.z] = vp([dx, dy, dz], [this.x, this.y, this.z])
    return this;
  }

  /**
   * Rotation of object (deg)
   * @param {number} x
   * @param {number} [y]
   * @param {number} [z]
   * @returns {TObject}
   */
  rotation(x, y, z) {
    [this.rotationX, this.rotationY, this.rotationZ] = v([x,y,z],
      [this.rotationX, this.rotationY, this.rotationZ]);
    return this;
  }

  /**
   * Rotate object (deg)
   * @param {number} dx
   * @param {number} [dy]
   * @param {number} [dz]
   * @returns {TObject}
   */
  rotate(dx, dy, dz) {
    [this.rotationX, this.rotationY, this.rotationZ] = vp([dx, dy, dz],
      [this.rotationX, this.rotationY, this.rotationZ]);
    return this;
  }

  /**
   * Set scale
   * @param {number} x
   * @param {number} [y]
   * @param {number} [z]
   * @returns {TObject}
   */
  scale(x, y, z) {
    [this.scaleX, this.scaleY, this.scaleZ] = v([x, y, z],
      [this.scaleX, this.scaleY, this.scaleZ]);
    return this;
  }

  /**
   * Set size
   * @param {number} width
   * @param {number} [height]
   * @param {number} [depth]
   * @returns {TObject}
   */
  size(width, height, depth) {
    [this.width, this.height, this.depth] = vm([width, height, depth],
      [this.width, this.height, this.depth]);
    return this;
  }

  /**
   * Set origin
   * @param {number} x
   * @param {number} [y]
   * @param {number} [z]
   * @returns {TObject}
   */
  origin(x, y, z) {
    [this.originX, this.originY, this.originZ] = vm([x, y, z],
      [this.originX, this.originY, this.originZ]);
    return this;
  }

  /**
   * Set sort of x, y, z
   * @param {"X","Y","Z"} s0
   * @param {"X","Y","Z"} s1
   * @param {"X","Y","Z"} s2
   * @returns {TObject}
   */
  sort(s0, s1, s2) {
    if (arguments.length > 3) console.error('sort arguments is wrong!');
    this.__sort = [s0, s1, s2];
    return this;
  }

  /**
   * Add child to TObject
   * @param {Sprite} view
   * @returns {TObject}
   */
  addChild(view) {
    if (view.parent) view.parent.removeChild(view);
    if (view.__name !== '') {
      if (this[view.__name] !== undefined) console.log(view.__name + ' already exist!');
      this[view.__name] = view;
    }
    this.children.push(view);
    view.parent = this;
    return this;
  }

  /**
   * remove child from TObject
   * @param {Sprite} view
   * @returns {TObject}
   */
  removeChild(view) {
    for (let i = this.children.length - 1; i >= 0; i--) {
      if (this.children[i] === view) {
        if (view.__name !== '') delete this[view.__name];
        this.children.splice(i, 1);
        view.parent = null;
        return this;
      }
    }
    return this;
  }

  /**
   * remove all child form TObject
   * @returns {TObject}
   */
  removeAllChild() {
    for (let i = this.children.length - 1; i >= 0; i--) {
      let view = this.children[i];

      if (view.__name !== '') delete this[view.__name];
      view.parent = null;
    }
    this.children = [];
    return this;
  }

  /**
   * remove now object form its parent
   * @returns {TObject}
   */
  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
    return this;
  }

}
