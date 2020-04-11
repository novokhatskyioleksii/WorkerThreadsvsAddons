const fs = require('fs');

const index = fs.readFileSync('./helpers/file/strings.json');
const json = JSON.parse(index);

module.exports = json.strings;