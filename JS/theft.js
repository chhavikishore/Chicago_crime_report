const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('../CSV/Crimes_-_2001_to_present.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const theftstream = fs.createWriteStream('theft.json'); // theft output file to write json
const theft = [];

// when we fetch line the year is in string , make year in string
for (let i = 2001; i < 2017; i += 1) {
  theft.push({ Year: i.toString(), 'OVER $500': 0, '$500 AND UNDER': 0 });
}

let rowIndex = 0;
let heading; let row;

rl.on('line', (line) => {
  // process line here
  if (rowIndex === 0) {
    heading = line.split(',', 20); // for getting the column heading
    rowIndex += 1;
  } else {
    row = line.split(',', 20); // to split string on basis of ","
    const type = heading.indexOf('Primary Type');
    const year = heading.indexOf('Year');
    const desc = heading.indexOf('Description');
    if (row[type] === 'THEFT' && (row[year] >= 2001 && row[year] <= 2016)) {
      for (let i = 0; i < 16; i + 1) {
        if (theft[i].Year === row[year]) {
          if (row[desc] === 'OVER $500') {
            theft[i]['OVER $500'] += 1;
          } else if (row[desc] === '$500 AND UNDER') {
            theft[i]['$500 AND UNDER'] += 1;
          }
        }
      }
    }
  }
});


rl.on('close', () => {
  theftstream.write(JSON.stringify(theft, null, 2));
});
