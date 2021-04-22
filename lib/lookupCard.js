const binList = require("./binToIssuers.json");
const bankList = require("./codeToBank.json");
const networkList = require("./networkList.json");

const _ = require("lodash");

/**
 * Look up information about the BIN of a card and returns an object containing the  network and an optional issuer if found or undefined if not found
 * @param {string | number} bin the card  to lookup
 * @returns { {network: string, issuer: string} | undefined } 
 */
const lookupCard = (bin) => {
    const binString = bin + "";
    const result = _.find(binList, (value, key) => binString.startsWith(key));
    if (!result) {
        const network = _.findKey(networkList, value => binString.startsWith(value));
        if (network) return {network};

        return network;
    }
    
    const [issuer, network] = result.split(",");
    const issuerName = bankList[issuer];

    return {issuer: issuerName, network}
}

module.exports = lookupCard;