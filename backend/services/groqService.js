const Groq = require("groq-sdk");
const endent = require("endent").default;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Processes medical report documents and generates AI analysis.
 * @param {Array<{text: string}>} documents 
 * @returns {Promise<{originalDocument: string, analysis: string}>}
 */
async function processMedicalReport(documents) {
  const documentText = documents.map((doc) => doc.text).join("\n");
  console.log({ documentText });

  // Check if documentText contains medical terminology or relevant information
  const medicalKeywords = [
    "blood", "test", "diagnosis", "report", "health", "scan", "medical", 
    "doctor", "patient", "clinic", "hospital", "prescription", "treatment",
    "result", "history", "symptoms", "examination", "lab", "pathology",
    "radiology", "ultrasound", "mri", "ct scan", "ecg", "biopsy"
  ];
  const containsMedicalContent = medicalKeywords.some((keyword) =>
    documentText.toLowerCase().includes(keyword)
  );

  if (!containsMedicalContent) {
    return {
      originalDocument: documentText,
      analysis: "⚠️ **MedicAi Disclaimer**: Our system is strictly designed for medical report analysis only. The document you provided does not appear to be a medical report (e.g., blood test, lab result, scan, or clinical note). Please upload a valid medical document for analysis.",
    };
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: endent`You are a compassionate and knowledgeable medical report interpreter. 
          
          STRICT LIMITATION: You ONLY analyze medical reports, lab results, clinical notes, and health scan documents.
          
          If the provided content is NOT representing medical data, findings, or health test results, your ONLY response must be: "⚠️ This document does not appear to be a medical report. MedicAi is strictly for medical analysis."

          If it IS a medical report, follow these principles:
          - Translating medical jargon into simple, accessible language
          - Providing a holistic view of the patient's health
          - Offering supportive and constructive guidance
          - Delivering personalized, actionable health recommendations`,
        },
        {
          role: "user",
          content: endent`Analyze this medical report and create a comprehensive, patient-friendly breakdown:

          Medical Report Content:
          ${documentText}

          Please provide a detailed analysis structured as follows:

          Personalized Greeting(don't inlclude this line in response)
          - Address the patient by name
          - Acknowledge the purpose of the report

          Report Overview
          - Identify the type of medical test/report
          - Specify the key health areas examined
          - Provide context about the test's significance

          Simplified Medical Explanation
          - Break down medical terminology
          - Explain each significant finding in plain language
          - Use analogies or simple comparisons if helpful

          Health Status Assessment
          - Highlight positive indicators
          - Identify potential areas of concern
          - Quantify results in relation to standard healthy ranges

          Potential Health Implications
          - Discuss possible underlying reasons for abnormal results
          - Explain potential short-term and long-term health impacts
          - Provide context without causing unnecessary anxiety

          Personalized Improvement Recommendations
          - Suggest specific dietary modifications
          - Recommend tailored exercise routines
          - Propose lifestyle changes based on report findings
          - Include stress management techniques if relevant

          Tone: Supportive, informative, and empowering
          Language: Clear, simple, and encouraging
          Goal: Help the patient understand their health comprehensively and positively`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Extract the AI-generated analysis
    const reportAnalysis =
      chatCompletion.choices[0]?.message?.content || "Unable to process report";

    return {
      originalDocument: documentText,
      analysis: reportAnalysis,
    };
  } catch (error) {
    console.error("Error processing medical report:", error);
    throw new Error("Failed to analyze medical report");
  }
}

module.exports = { processMedicalReport };
