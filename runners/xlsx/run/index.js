(async () => {
  const xlsxC = require('./xlsxC');
  const xlsxJS = require('./xlsxJS');

  const totalC = await xlsxC();
  const totalJS = await xlsxJS();

  console.log(`(xlsx) C++ Total: ${(totalC / 1000).toFixed(2)} milliseconds`);
  console.log(`(xlsx) JS Total: ${(totalJS / 1000).toFixed(2)} milliseconds`);

  process.exit();
})();