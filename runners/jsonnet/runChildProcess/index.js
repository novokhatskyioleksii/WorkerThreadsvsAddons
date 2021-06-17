const microseconds = require('microseconds');
const { spawn } = require('child_process');

const jsonnetCChildProcess = require('./jsonnetCChildProcess');

(async () => {
  let count = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  jsonnetCChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const jsonnetJSChildProcess = (i) => new Promise((resolve, reject) => {
    const jsonnetJSChildProcess = spawn('node', ['./runners/jsonnet/runChildProcess/jsonnetJSChildProcess.js', i]);

    jsonnetJSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    jsonnetJSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    jsonnetJSChildProcess.stdout.on('close', () => {
      count++;
      if (count === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    jsonnetJSChildProcess(0),
    jsonnetJSChildProcess(1),
    jsonnetJSChildProcess(2),
    jsonnetJSChildProcess(3),
    jsonnetJSChildProcess(4),
    jsonnetJSChildProcess(5),
    jsonnetJSChildProcess(6),
    // jsonnetJSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`(jsonnet) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(jsonnet) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();