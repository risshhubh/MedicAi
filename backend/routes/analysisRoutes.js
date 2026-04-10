const express = require('express');
const multer = require('multer');
const { LlamaParseReader } = require('@llamaindex/cloud');
const fs = require('fs/promises');
const path = require('path');
const { processMedicalReport } = require('../services/groqService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/upload
// @desc    Upload a medical document and get AI analysis via LlamaIndex & Groq
router.post('/upload', upload.single('file'), async (req, res) => {
  let tempPath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save buffer to temporary file for LlamaParse
    const filename = `upload_${Date.now()}_${req.file.originalname.replace(/\s/g, '-')}`;
    tempPath = path.join(__dirname, '../temp', filename);
    
    // Ensure temp directory exists
    await fs.mkdir(path.dirname(tempPath), { recursive: true });
    await fs.writeFile(tempPath, req.file.buffer);

    // Initialize LlamaParse
    const reader = new LlamaParseReader({ 
      apiKey: process.env.LLAMA_CLOUD_API_KEY,
      resultType: "markdown" 
    });
    
    // Process the file
    const documents = await reader.loadData(tempPath);

    // Clean up temp file
    if (tempPath) {
      await fs.unlink(tempPath).catch(err => console.error('Cleanup error:', err));
    }

    if (!documents || documents.length === 0) {
      return res.status(400).json({ message: 'No content found in the document' });
    }

    // Process the medical report through Groq Llama-3
    const analysisResult = await processMedicalReport(documents);

    res.json({
      success: true,
      insights: {
        summary: analysisResult.analysis,
      },
      extractedCharacterCount: analysisResult.originalDocument.length,
    });

  } catch (error) {
    // Cleanup on error
    if (tempPath) {
      await fs.unlink(tempPath).catch(() => {});
    }
    console.error('LlamaIndex Analysis error:', error);
    res.status(500).json({ 
      message: 'Failed to process document using high-quality parser', 
      error: error.message 
    });
  }
});

module.exports = router;
