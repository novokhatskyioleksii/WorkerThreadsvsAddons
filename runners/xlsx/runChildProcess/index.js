const microseconds = require('microseconds');
const { spawn } = require('child_process');

const xlsxCChildProcess = require('./xlsxCChildProcess');

(async () => {
  let count = 0;
  let beforeC;
  let afterC;
  let beforeJS;
  let afterJS;

  beforeC = microseconds.now();
  await xlsxCChildProcess();
  afterC = beforeC + microseconds.since(beforeC);

  const xlsxJSChildProcess = (i) => new Promise((resolve, reject) => {
    const xlsxJSChildProcess = spawn('node', ['./runners/xlsx/runChildProcess/xlsxJSChildProcess.js', i]);

    xlsxJSChildProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    xlsxJSChildProcess.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    xlsxJSChildProcess.stdout.on('close', () => {
      count++;
      if (count === 7) afterJS = beforeJS + microseconds.since(beforeJS);
      resolve();
    });
  });
  beforeJS = microseconds.now();
  await Promise.all([
    xlsxJSChildProcess(0),
    xlsxJSChildProcess(1),
    xlsxJSChildProcess(2),
    xlsxJSChildProcess(3),
    xlsxJSChildProcess(4),
    xlsxJSChildProcess(5),
    xlsxJSChildProcess(6),
    // xlsxJSChildProcess(7),
  ]);

  const totalC = afterC - beforeC;
  const totalJS = afterJS - beforeJS;

  console.log(`(xlsx) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(xlsx) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();