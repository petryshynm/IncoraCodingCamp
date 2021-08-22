import { wrapErrors } from "../utilities/utils";

class Validation {
    static isNumber = wrapErrors((number, comparator) => {
        if (typeof number === 'number' && !isNaN(number)) {
            if (number > comparator) return number
            else {
                throw new RangeError(`Number ${number} must be greater than ${comparator}`)
            }
        } else {
            throw new TypeError('Element must be a number.');
        }
    });
    static isDate = wrapErrors((date) => {
        if (date => new Date() && date instanceof Date && !isNaN(date.valueOf())) {
            return date
        } else throw new Error('Invalid Date value');
    })
    static isArray = wrapErrors((array) => {
        if (Array.isArray(array)) {
            return array
        } else throw new Error('Invalid Array');
    })
    static isName = (name) => {
        return /^[a-яА-яa-zA-ZіІЇїЄєґҐ ]{2,20}$/.test(name)
    }
}

export { Validation };