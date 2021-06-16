const microseconds = require('microseconds');
const { spawn } = require('child_process');

const file = require('../../../helpers/file');

const hashArgon2CChildProcess = require('./hashArgon2CChildProcess');

(async () => {
  let count = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  await hashArgon2CChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const hashArgon2JSChildProcess = (i) => new Promise((resolve, reject) => {
    const hashArgon2JSChildProcess = spawn('node', ['./runners/argon2/runChildProcess/hashArgon2JSChildProcess.js', i]);

    hashArgon2JSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    hashArgon2JSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    hashArgon2JSChildProcess.stdout.on('close', () => {
      count++;
      if (count === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    hashArgon2JSChildProcess(0),
    hashArgon2JSChildProcess(1),
    hashArgon2JSChildProcess(2),
    hashArgon2JSChildProcess(3),
    hashArgon2JSChildProcess(4),
    hashArgon2JSChildProcess(5),
    hashArgon2JSChildProcess(6),
    // hashArgon2JSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`(argon2) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(argon2) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();