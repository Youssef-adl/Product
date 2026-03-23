const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('PIE-A2-P4-support stagiaires.pptx.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
