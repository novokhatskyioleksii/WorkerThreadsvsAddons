const microseconds = require('microseconds');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const file = require('../../../helpers/file');

const hashBcryptJSWorkerThreads = require('./hashBcryptJSWorkerThreads');

const threads = [];

const mainThread = () => new Promise((resolve, reject) => {
  let count = 0;

  const start = microseconds.now();
  threads.push(new Worker(__filename, { workerData: { processNumber: 0 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 1 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 2 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 3 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 4 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 5 } }));
  threads.push(new Worker(__filename, { workerData: { processNumber: 6 } }));
  // threads.push(new Worker(__filename, { workerData: { processNumber: 7 } }));

  for (let worker of threads) {
    worker.on('error', (err) => {
      console.error(err);
    });
    worker.on('message', (msg) => {
      count++;
      if (count === 7) resolve(microseconds.since(start));
    });
  }
});

(async () => {
  if (isMainThread) {
    const hashBcryptCWorkerThreads = require('./hashBcryptCWorkerThreads');

    const beforeC = microseconds.now();
    await hashBcryptCWorkerThreads();
    const afterC = beforeC + microseconds.since(beforeC);

    const totalC = afterC - beforeC;
    const totalJS = await mainThread();

    console.log(`(bcrypt) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
    console.log(`(bcrypt) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

    process.exit();
  } else {
    await hashBcryptJSWorkerThreads(workerData.processNumber);
    parentPort.postMessage(workerData.processNumber);
  }
})();