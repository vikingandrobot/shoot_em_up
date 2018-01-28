/**
  Class to represent cartesian vectors.
*/
class CartesianVector {
  /**
    Constructor to build the vector.
    x: x coordinate
    y: y coordinate
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
    Sum to CartesianVector objects.
    other: The CartesianVector to sum to the current vector
    return: this
  */
  add(other) {
    this.x += other.x;
    this.y += other.y;

    return this;
  }

  /**
    Substracts another CartesianVector
    other: the other
    return: this
  */
  substract(other) {
    this.x -= other.x;
    this.y -= other.y;

    return this;
  }

  /**
    Convert a CartesianVector to a PolarVector.
    return: a new PolarVector equivalent to this CartesianVector
  */
  toPolar() {
    const magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
    let angle = 0;
    if (magnitude !== 0) {
      angle = Math.acos(this.x / magnitude);
    }
    if (this.y < 0) {
      angle = -angle;
    }

    return new PolarVector(angle, magnitude);
  }

  /**
    Copy a CartesianVector.
    return: a new CartesianVector object, with same coordinates
  */
  copy() {
    return new CartesianVector(this.x, this.y);
  }

  /**
    Calculate the distance between to CartesianVector objects. The distance
    between the two vectors is calculated based on the (x, y) coordinate points.
    Parameters:
      other: an other CartesianVector vector
    return: the distance between the two vectors
  */
  distance(other) {
    const x = this.x - other.x;
    const y = this.y - other.y;
    return Math.sqrt((x * x) + (y * y));
  }

  /**
    Normalize the CartesianVector. After a call to this method, the vector
    will have a length of 1.
  */
  normalize() {
    const normalizeVector = this.toPolar.magnitude(1).toCartesian();
    this.x = normalizeVector.x;
    this.y = normalizeVector.y;

    return this;
  }
}

/**
  Class that represents polar vectors.
*/
class PolarVector {
  /**
    Constructor to build a PolarVector.
    angle: the angle
    radius: the radius
  */
  constructor(angle, radius) {
    this.angle = angle;
    this.radius = radius;
  }

  /**
    Converts a PolarVector to a CartesianVector.
    return: a new CartesianVector
  */
  toCartesian() {
    const x = this.radius * Math.cos(this.angle);
    const y = this.radius * Math.sin(this.angle);

    return new CartesianVector(x, y);
  }

  /**
    Scale a PolarVector
    ratio: the ratio
    return: this
  */
  scale(ratio) {
    this.radius *= ratio;

    return this;
  }


  /**
    Set the radius of the PolarVector
    magn: the new magnitude
    return: this
  */
  magnitude(magn) {
    this.radius = magn;

    return this;
  }

  /**
    Rotate by an angle (radian).
    angle: the amount by which to rotate
    return: this
  */
  rotate(angle) {
    this.angle += angle;

    return this;
  }

  /**
    Invert a PolarVector (direction)
    return: this
  */
  invert() {
    this.angle += Math.PI;

    return this;
  }

  /**
    Copy a PolarVector.
    return: a new PolarVector with same angle and same radius
  */
  copy() {
    return new PolarVector(this.angle, this.radius);
  }
}
