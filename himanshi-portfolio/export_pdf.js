const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const bin = fs.existsSync(chromePath) ? chromePath : edgePath;

const htmlFile = path.resolve(__dirname, 'portfolio_pdf.html');
const pdfFile = path.resolve(__dirname, 'Himanshi_Rajput_Portfolio.pdf');

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfFile}`,
  `file:///${htmlFile.replace(/\\/g, '/')}`
];

console.log(`Using binary: ${bin}`);
console.log(`Generating PDF to: ${pdfFile}`);

execFile(bin, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Execution error:', error);
    process.exit(1);
  }
  console.log('STDOUT:', stdout);
  console.log('STDERR:', stderr);
  if (fs.existsSync(pdfFile)) {
    const stats = fs.statSync(pdfFile);
    console.log(`SUCCESS! PDF Generated: ${pdfFile} (${stats.size} bytes)`);
  } else {
    console.error('PDF file was not created');
    process.exit(1);
  }
});
