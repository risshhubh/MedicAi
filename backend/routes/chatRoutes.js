const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { searchDataset } = require('../services/datasetService');
const Chat = require('../models/Chat');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { LlamaParseReader } = require('@llamaindex/cloud');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const upload = multer({ storage: multer.memoryStorage() });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post('/chat', protect, upload.single('file'), async (req, res) => {
  let tempPath = null;
  try {
    const { message, userId } = req.body;
    const file = req.file;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Save User message
    if (userId) {
      await Chat.create({
        user: userId,
        role: 'user',
        content: message
      });
    }

    // 1. Process Uploaded File if exists
    let documentContext = '';
    if (file) {
      try {
        const filename = `chat_${Date.now()}_${file.originalname.replace(/\s/g, '-')}`;
        tempPath = path.join(os.tmpdir(), filename);
        await fs.writeFile(tempPath, file.buffer);

        const reader = new LlamaParseReader({ 
          apiKey: process.env.LLAMA_CLOUD_API_KEY,
          resultType: "markdown" 
        });
        const documents = await reader.loadData(tempPath);
        documentContext = documents.map(doc => doc.text).join('\n');
        
        // Cleanup
        await fs.unlink(tempPath).catch(() => {});
      } catch (err) {
        console.error('File parsing error:', err);
      }
    }

    // 2. Get context from dataset (RAG)
    const context = await searchDataset(message);

    // 2. Build Prompt
    const prompt = `
You are MedicAi, a clinical neural assistant.
Use the following medical dataset context AND/OR the user's uploaded clinical report to answer the user's question. 

DATABASE CONTEXT:
${context || 'No specific dataset matches found.'}

UPLOADED CLINICAL REPORT:
${documentContext || 'No document uploaded.'}

USER QUESTION:
${message}

If a report is provided, prioritize specific readings from the report. If no dataset match is found, use your general medical knowledge but mention it. ALWAYS suggest consulting a doctor.
    `.trim();

    // 3. Call Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    
    const reply = chatCompletion.choices[0].message.content;

    // Save Assistant reply
    if (userId) {
      await Chat.create({
        user: userId,
        role: 'assistant',
        content: reply
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

router.get('/history/:userId', protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Chat.find({ user: userId })
      .sort({ timestamp: 1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.delete('/chat/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
