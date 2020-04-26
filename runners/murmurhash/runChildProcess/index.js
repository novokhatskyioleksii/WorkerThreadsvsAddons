const microseconds = require('microseconds');
const { spawn } = require('child_process');

const file = require('../../../helpers/file');

const hash128x64CChildProcess = require('./hash128x64CChildProcess');

(async () => {
  const i = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  hash128x64CChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const hash128x64JSChildProcess = (i) => new Promise((resolve, reject) => {
    const hash128x64JSChildProcess = spawn('node', ['./runners/murmurhash/runChildProcess/hash128x64JSChildProcess.js', i]);

    hash128x64JSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    hash128x64JSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    hash128x64JSChildProcess.stdout.on('close', () => {
      i++;
      if (i === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    hash128x64JSChildProcess(0),
    hash128x64JSChildProcess(1),
    hash128x64JSChildProcess(2),
    hash128x64JSChildProcess(3),
    hash128x64JSChildProcess(4),
    hash128x64JSChildProcess(5),
    hash128x64JSChildProcess(6),
    // hash128x64JSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`(murmurhash) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(murmurhash) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();