/**
 * Compute the check digit of a number according to the Luhn algorithm
 * @param {string | number} card the sequence of number to generate a check digit for according to the Luhn algorithm
 * @returns {number} the check digit
 */
const computeCheck = (card) => {
    const digits = card + '';
    let total = 0;
    for (let i = digits.length - 1; i >= 0; i -= 2) {
        let digit = parseInt(digits[i], 10);
        let adj = i === 0 ? 0 : parseInt(digits[i-1], 10);
        if (isNaN(digit) || isNaN(adj)) throw new Error("Argument is not valid number");

        const x2 = digit * 2;
        if (x2 > 9) total += adj + x2 - 9;
        else total += x2 + adj;
    }

    return (total * 9) % 10;
}

/**
 * Validate that a number passes the Luhn check algorithm
 * @param {string | number} card the sequence of number to validate
 * @returns {boolean} the validity of provided number
 */
const validate = (card) => {
    const digits = card + '';
    if (digits.length === 0) throw new Error("Input cannot be empty");

    const check = computeCheck(digits.slice(0, digits.length - 1));

    return check === parseInt(digits.slice(-1), 10);
}

module.exports = { computeCheck, validate }