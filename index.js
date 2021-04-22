const generateCard = require("./lib/generateCard");
const {validate, computeCheck} = require("./lib/luhn");
const lookupCard = require("./lib/lookupCard");

module.exports = {
    generateCard,
    validate,
    computeCheck,
    lookupCard
}