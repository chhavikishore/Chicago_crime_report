const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('./input/Crimes_-_2001_to_present.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const crimestream = fs.createWriteStream('./output/typesOfCrime.json'); // types of crime output file to write json

const violentIUCR = ['0110', '0130', '0261', '0262', '0263', '0264', '0265', '0266',
  '0271', '0272', '0273', '0274', '0275', '0281', '0291', '1753', '1754', '0312',
  '0313', '031A', '031B', '0320', '0325', '0326', '0330', '0331',
  '0334', '0337', '033A', '033B', '0340', '051A', '051B', '0520', '0530', '0550',
  '0551', '0552', '0553', '0555', '0556', '0557', '0558', '041A', '041B', '0420',
  '0430', '0450', '0451', '0452', '0453', '0461', '0462', '0479',
  '0480', '0481', '0482', '0483', '0485', '0488', '0489', '0490', '0491',
  '0492', '0493', '0495', '0496', '0497', '0498', '0510'];


const propertyIUCR = ['0610', '0620', '0630', '0650', '0810', '0820', '0840', '0841', '0842', '0843', '0850',
  '0860', '0865', '0870', '0880', '0890', '0895', '0910', '0915', '0917', '0918', '0920',
  '0925', '0927', '0928', '0930', '0935', '0937', '0938', '1010', '1020', '1025', '1090'];

const indexIUCR = violentIUCR.concat(propertyIUCR);

const crimeTypes = [{ type: 'Index crimes', count: 0 },
  { type: 'Non index crimes', count: 0 },
  { type: 'Violent crimes', count: 0 },
  { type: 'Property crimes', count: 0 }];
let rowIndex = 0;
let heading;

rl.on('line', (line) => {
  // process line here
  if (rowIndex === 0) {
    heading = line.split(',', 20); // for getting the column heading
    rowIndex += 1;
  } else {
    const row = line.split(',', 20); // to split string on basis of ","
    const year = heading.indexOf('Year');
    const iucr = heading.indexOf('IUCR');
    if (row[year] === '2015') {
      if (indexIUCR.indexOf[row[iucr] !== -1] || violentIUCR.indexOf(row[iucr]) !== -1) {
        crimeTypes.forEach((value, key) => {
          if (value.type === 'Violent crimes' || value.type === 'Index crimes') {
            // as eslint gives error in incrementing parameter value
            crimeTypes[key].count += 1;
          }
        });
      } else if (indexIUCR.indexOf[row[iucr] !== -1] || propertyIUCR.indexOf(row[iucr]) !== -1) {
        crimeTypes.forEach((value, key) => {
          if (value.type === 'Property crimes' || value.type === 'Index crimes') {
            // as eslint gives error in incrementing parameter value
            crimeTypes[key].count += 1;
          }
        });
      } else {
        crimeTypes.forEach((value, key) => {
          if (value.type === 'Non index crimes') {
            // as eslint gives error in incrementing parameter value
            crimeTypes[key].count += 1;
          }
        });
      }
    }
  }
});

rl.on('close', () => {
  crimestream.write(JSON.stringify(crimeTypes, null, 2));
});
