/**
  File: Color.js
  Author: Mathieu Monteverde & Sathiya Kirsuhanpillai

  The Color class represents a RGBA color. It is possible to get the
  rgba(r, g, b, a) representation as a string.
*/

/**
  Constructor of a Color:
  r: red
  g: green
  b: blue
  a: alpha
*/
class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
    Get the color as a String.
  */
  asString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
