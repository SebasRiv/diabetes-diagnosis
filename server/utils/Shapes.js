// Se crean las figuras para las graficas de las varaibles difusas
class Shape {
    constructor(x0, x1, x2, x3) {
        Object.defineProperty(this, 'x0', {
            value: x0,
            writable: false
        });
        Object.defineProperty(this, 'x1', {
            value: x1,
            writable: false
        });
        Object.defineProperty(this, 'x2', {
            value: x2,
            writable: false
        });
        Object.defineProperty(this, 'x3', {
            value: x3,
            writable: false
        });
    }
}

class Trapezoid extends Shape {

    fuzzify(val) {
        let result = 0;
        const x = val;

        if (x <= this.x0) {
            /**
             * Si es menor que a es 0
             */
            result = 0;
        } else if (x >= this.x3) {
            /**
             * Si es mayor a d es 0
             */
            result = 0;
        } else if ((x >= this.x1) && (x <= this.x2)) {
            /**
             * Si esta entre b y c el valor es 1
             */
            result = 1;
        } else if ((x > this.x0) && (x < this.x1)) {
            /**
             * Si esta entre a y b aplica esta formula: (x-a)/(b-a)
             */
            result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
        } else {
            /**
             * Si esta entre c y d aplica esta formula: (d-x)/(d-c)
             */
            result = (-x / (this.x3 - this.x2)) + (this.x3 / (this.x3 - this.x2));
        }
        return result;
    }
}

class Triangle extends Shape {

    fuzzify(x) {
        let result = 0;

        if (x <= this.x0) {
            /**
             * Si es menor que a es 0
             */
            result = 0;
        } else if (x >= this.x2) {
            /**
             * Si es mayor a c es 0
             */
            result = 0;
        } else if ((x > this.x0) && (x <= this.x1)) {
            /**
             * Si esta entre a y b se aplica la formula: (x-a)/(b-a)
             */
            result = (x - this.x0) / (this.x1 - this.x0);
        } else if ((x > this.x1) && (x < this.x2)) {
            /**
             * Si esta entre b y c se aplica la formula:(c-x)/(c-b)
             */
            result = (this.x2 - x) / (this.x2 - this.x1);
        }
        return result;
    }
}

module.exports = {
    Trapezoid, 
    Triangle
};