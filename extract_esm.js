import fs from 'fs';
import pdfPkg from 'pdf-parse';

const pdf = typeof pdfPkg === 'function' ? pdfPkg : (pdfPkg.default || pdfPkg.pdf);

const dataBuffer = fs.readFileSync('PIE-A2-P4-support stagiaires.pptx.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
