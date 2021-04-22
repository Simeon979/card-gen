const networkList = require("./networkList.json");
const bankList = require("./issuerToBins.json");
const {computeCheck,validate} = require("./luhn");

/**
 * Generate a valid card either randomly or according to  supplied options 
 * 
 * If startsWith is provided as an option, endsWith, includeSequence, network and issuer are ignored
 * If endsWith is provided, includeSequence, network and issuer are ignored
 * If includeSequence is provided, network and issuer are ignored
 * network and issuer can both be provided, or be present independently
 * @param {object} option options to fine tune the generated card
 * @param {string | number} option.startsWith  a sequence of digit between 1 - 10 in length to start the generated card with
 * @param {string | number} option.endsWith  a sequence of digit between 1 - 10 in length to end` the generated card with
 * @param {string | number} option.includeSequence a sequence of digit between 1 - 10 in length to end` the generated card with
 * @param {string} option.network the network of the card to generate
 * @param {string} option.issuer the issuer code of the generated card
 * @param {boolean} option.verve Generate a verve credit card
 */
const generateCard = (option) => {
    let card = "";

    const options = normalizeOptions(option);
    if (options.startsWith) {
        if (options.startsWith.length > 10) throw new Error("startsWith must consist of between 1 and 10 digits");
        if (!parseInt(options.startsWith, 10)) throw new Error("startsWith must consist of digits only");
        card += options.startsWith;
    } else if (options.includeSequence) {
        if (options.includeSequence.length > 10) throw new Error("includeSequence must consist of between 1 and 10 digits");
        if (!parseInt(options.includeSequence, 10)) throw new Error("includeSequence must consist of digits only");
        card += options.includeSequence;
    } else if (options.endsWith) {
        if (options.endsWith.length > 10) throw new Error("endsWith must consist of between 1 and 10 digits");
        if (!parseInt(options.endsWith, 10)) throw new Error("endsWith must consist of digits only");
        card += options.endsWith;
    } else if (options.network) {
        const networkIndicator = networkList[options.network.toLowerCase()];
        if (!networkIndicator) throw new Error("unrecognized network");
        card += networkIndicator;

        if (options.issuer) {
            const issuerIndicators = bankList[`${options.issuer},${options.network}`];
            if (!issuerIndicators) throw new Error("issuer not defined for network"); 
            card += (pickOne(issuerIndicators)).slice(1); //remove the first number since it contains the network indicator
        }
    } else if (options.issuer) {
        // issuer, but no network: try available networks randomly till we find any that the issuer is defined for
        // if none are found throw error
        let networks = shuffle(Object.keys(networkList));
        
        const found = networks.find(network => !!bankList[`${options.issuer},${network}`])
        if (found) {
            const issuerIndicator = pickOne(bankList[`${options.issuer},${found}`]);

            card += `${issuerIndicator}`;
        } else throw new Error("unrecognized issuer")
    }

    const lengthWithoutCheck = options.verve ? 18 : 15;
    const remainingDigitLength = lengthWithoutCheck - card.length;

    if (remainingDigitLength < 0) throw new Error("Fatal error, please contact the library author") // wtf!

    const remainingDigits = randN(remainingDigitLength);

    if (options.endsWith) {
        card = remainingDigits + card;
        for (let i = 0; i <= 9; i++) {
            const permutation = `${i}${card}`;
            if (validate(permutation)) {
                card = permutation; 
                break;
            }
        }
    } else if (options.includeSequence) {
        const [padLeft, padRight] = generatePadding(remainingDigits);
        card = `${padLeft}${card}${padRight}`;
        const checkDigit = computeCheck(card);
        card += checkDigit;
    } else {
        card += remainingDigits;
        const checkDigit = computeCheck(card);
        card += checkDigit;
    }
    
    

    return card;
}


const randN = (n) => {
    let result = "";

    for (let i = 0; i < n; i++) {
        let digit = Math.floor(Math.random() * 10);
        result += `${digit}`
    }
    return result;
}

const shuffle = (arr) => {
    const copy = [...arr];
    let result = [];
    for (let i = arr.length; i > 0; i--) {
        result = result.concat(copy.splice(Math.floor(Math.random() * i), 1));
    }
    return result;
}

const pickOne = (arr) => {
    console.log(arr);
    return arr[Math.floor(Math.random() * arr.length)];
}

const generatePadding = (remainingDigits) => {
    const partition = Math.floor(Math.random() * remainingDigits.length);
    return [remainingDigits.slice(0, partition), remainingDigits.slice(partition)];
}

const normalizeOptions = (options) => {
    const result = {};
    if (options.startsWith) result.startsWith = options.startsWith + "";
    if (options.network) result.network = options.network + "";
    if (options.issuer) result.issuer = options.issuer + "";
    if (options.endsWith) result.endsWith = options.endsWith + "";
    if (options.verve) result.verve = !!options.verve;
    if (options.includeSequence) result.includeSequence = options.includeSequence + "";
    return result;
}

module.exports = generateCard;