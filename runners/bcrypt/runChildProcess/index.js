const microseconds = require('microseconds');
const { spawn } = require('child_process');

const file = require('../../../helpers/file');

const hashBcryptCChildProcess = require('./hashBcryptCChildProcess');

(async () => {
  const i = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  hashBcryptCChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const hashBcryptJSChildProcess = (i) => new Promise((resolve, reject) => {
    const hashBcryptJSChildProcess = spawn('node', ['./runners/bcrypt/runChildProcess/hashBcryptJSChildProcess.js', i]);

    hashBcryptJSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    hashBcryptJSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    hashBcryptJSChildProcess.stdout.on('close', () => {
      i++;
      if (i === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    hashBcryptJSChildProcess(0),
    hashBcryptJSChildProcess(1),
    hashBcryptJSChildProcess(2),
    hashBcryptJSChildProcess(3),
    hashBcryptJSChildProcess(4),
    hashBcryptJSChildProcess(5),
    hashBcryptJSChildProcess(6),
    // hashBcryptJSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();