const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'learn', 'api');

// Targets
const langs = ['en'];
const targets = [
  { course: 'html', types: ['quiz.json'] },
  { course: 'css', types: ['quiz.json'] },
  { course: 'python', types: ['quiz.json', 'practice.json', 'attachments.json', 'assignments.json'] }
];

let extractedStrings = new Set();
let fileCount = 0;

// Function to find all files recursively
function walkSync(currentDirPath, callback) {
  if (!fs.existsSync(currentDirPath)) return;
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

function extractFromObject(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(item => extractFromObject(item));
  } else if (obj !== null && typeof obj === 'object') {
    // Specifically target english fields from schemas
    if (obj.prompt) extractedStrings.add(obj.prompt);
    if (obj.label) extractedStrings.add(obj.label);
    
    if (obj.explanations) {
      if (obj.explanations.overview) extractedStrings.add(obj.explanations.overview);
      if (obj.explanations.byOptionId) {
        for (const key in obj.explanations.byOptionId) {
          extractedStrings.add(obj.explanations.byOptionId[key]);
        }
      }
    }
    // For practices/assignments, common text fields:
    if (obj.question) extractedStrings.add(obj.question);
    if (obj.instruction) extractedStrings.add(obj.instruction);
    if (obj.hint) extractedStrings.add(obj.hint);
    if (obj.content) extractedStrings.add(obj.content);
    
    // recursion
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        extractFromObject(obj[key]);
      }
    }
  }
}

// 1. Format ALL json files everywhere in learn/api
walkSync(baseDir, (filePath) => {
  if (filePath.endsWith('.json')) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      const data = JSON.parse(content);
      // This stringify removes the unnecessary enters, formats to 2 spaces
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      fileCount++;
    } catch (e) {
      console.error(`Error formatting ${filePath}:`, e.message);
    }
  }
});
console.log(`Formatted ${fileCount} JSON files.`);

// 2. Extract strings from specific files
langs.forEach(lang => {
  const langDir = path.join(baseDir, lang, 'course');
  if (!fs.existsSync(langDir)) return;
  
  fs.readdirSync(langDir).forEach(courseDir => {
    const coursePath = path.join(langDir, courseDir);
    const stat = fs.statSync(coursePath);
    if (!stat.isDirectory()) return;
    
    targets.forEach(target => {
      // check if courseDir matches target.course (e.g. html-basics matches html)
      if (courseDir.toLowerCase().includes(target.course.toLowerCase())) {
        walkSync(coursePath, (filePath) => {
          const fileName = path.basename(filePath);
          if (target.types.includes(fileName)) {
            try {
              let content = fs.readFileSync(filePath, 'utf8');
              if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
              }
              const data = JSON.parse(content);
              extractFromObject(data);
            } catch (e) {
              console.error(`Error reading ${filePath} for extraction:`, e.message);
            }
          }
        });
      }
    });
  });
});

const output = {};
Array.from(extractedStrings).sort().forEach(str => {
  if (typeof str === 'string' && str.trim().length > 0) {
    output[str] = "";
  }
});

fs.writeFileSync(path.join(__dirname, 'to_translate.json'), JSON.stringify(output, null, 2));
console.log(`Extracted ${Object.keys(output).length} unique strings to to_translate.json`);
