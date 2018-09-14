const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('./input/Crimes_-_2001_to_present.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const assaultstream = fs.createWriteStream('./output/assault.json'); // assault output file to write json
const assault = [];

// need to make year as string as in line reading the year is in string
for (let i = 2001; i <= 2016; i += 1) {
  assault.push({
    Year: i.toString(), 'no. of assault cases': 0, 'no. of arrested': 0, 'no. of not arrested': 0,
  });
}

const assaultCases = { Assault: assault };

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
    const arrest = heading.indexOf('Arrest');
    if (row[type] === 'ASSAULT' && (row[year] >= 2001 && row[year] <= 2016)) {
      for (let i = 0; i < 16; i += 1) {
        if (assaultCases.Assault[i].Year === row[year]) {
          assaultCases.Assault[i]['no. of assault cases'] += 1;
          if (row[arrest] === 'true') {
            assaultCases.Assault[i]['no. of arrested'] += 1;
          } else {
            assaultCases.Assault[i]['no. of not arrested'] += 1;
          }
        }
      }
    }
  }
});


rl.on('close', () => {
  assaultstream.write(JSON.stringify(assaultCases, null, 3));
});
