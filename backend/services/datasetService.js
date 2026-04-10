const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'med_datasets', 'Medicine_Details.csv');
const GUIDE_PATH = path.join(__dirname, '..', 'med_datasets', 'Health_Guide.csv');

/**
 * Perform a keyword search on the medical dataset.
 * @param {string} query The user question.
 * @returns {string} Context extracted from the dataset.
 */
exports.searchDataset = async (query) => {
  try {
    const files = [DATA_PATH, GUIDE_PATH];
    const results = [];
    const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
    if (keywords.length === 0) return '';

    for (const filePath of files) {
      if (!fs.existsSync(filePath)) continue;

      const data = fs.readFileSync(filePath, 'utf-8');
      const lines = data.split('\n');
      const isGuide = filePath.includes('Health_Guide');

      for (let i = 1; i < lines.length && results.length < 10; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const lowerLine = line.toLowerCase();
        const matchScore = keywords.reduce((score, kw) => score + (lowerLine.includes(kw) ? 1 : 0), 0);
        
        if (matchScore > 0) {
          const parts = line.split(',');
          let contextLine = '';
          if (isGuide) {
            contextLine = `Ailment: ${parts[0]}\nCause: ${parts[1]}\nPrecaution: ${parts[2]}\nHome Remedy: ${parts[3]}`;
          } else {
            contextLine = `Medicine: ${parts[0]}\nComposition: ${parts[1]}\nUses: ${parts[2]}\nSide Effects: ${parts[3]}\nManufacturer: ${parts[5] || 'N/A'}`;
          }
          results.push({ contextLine, score: matchScore });
        }
      }
    }

    // Sort and format
    results.sort((a, b) => b.score - a.score);
    const finalContext = results.slice(0, 5).map(res => res.contextLine + '\n---').join('\n');

    return finalContext ? `Related Dataset Entries:\n${finalContext}` : '';
  } catch (error) {
    console.error('Dataset search error:', error);
    return '';
  }
};
