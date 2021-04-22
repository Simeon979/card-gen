const fs = require("fs");
const h2j = require("html-table-to-json");
const fetch = require("node-fetch");
const _ = require("lodash");

const bankPath = (a) => a.replaceAll(/[^A-Za-z]+(?!$)/g, "-").replaceAll(/[^A-Za-z-]/g, "").toLowerCase()
const prefix = 'https://www.freebinchecker.com/credit-card-bin-search/';

const banks = fs.readFileSync("sortedBanks.txt");
const bankList = banks.toString().split("\n");

const pad2 = n => {
  let sn = n + "";
  for (let i = 3 - sn.length; i > 0; i--) {
    sn = "0" + sn;
  }
  return sn
}

let codeToBank = {};
let issuerToBins = {};
let binToIssuer = {};
let networks = new Set();

let finished = false;
for (let i = 0; i < bankList.length; i++) {
  const sn = i + 1;
  const key = pad2(sn);
  
  const path = bankPath(bankList[i]);

  fetch(`${prefix}${path}-bank`)
    .then(res => res.text())
    .then(res => {
      const tables = h2j.parse(res);
      const result = tables.results[1];

      if (result) {
        try {
          const groupedResult = _.groupBy(result, (n) => n["Network Company"]);
          for (let [network, results]  of Object.entries(groupedResult)) {
            network = network.toLowerCase();
            if (!networks.has(network)) networks.add(network);
            const bins = [];
            for (let result of results) {
              binToIssuer[result.BIN] = `${key},${network}`;
              bins.push(result.BIN);
            };
            issuerToBins[`${key},${network}`] = bins;
            codeToBank[key] = bankList[i];
          }
        } catch(error) {
          console.log(error);
        }
      } else {
        console.log("no result\n\n");
        console.log(tables.results);
      }
    }).then(() => {
      if (i === bankList.length - 1) {
        finished = true;
      }
    });
}

let interval;
interval = setInterval(() => {
  if (finished) {
    fs.writeFileSync("issuerToBins.json", JSON.stringify(issuerToBins, null, 4));
    fs.writeFileSync("binToIssuers.json", JSON.stringify(binToIssuer, null, 4));
    fs.writeFileSync("codeToBank.json", JSON.stringify(codeToBank, null, 4));
    fs.writeFileSync("networks.json", JSON.stringify([...networks.values()]));
    clearInterval(interval);
  }}, 5000);
