const db = require('../db/db_connection');
const validateRequest = (jsonReq) => {
  return jsonReq && jsonReq.quizId && jsonReq.questionId;
};

// Exporting the doService function
exports.doService = async (req) => {
  const jsonReq = req.data; // Extract data from the request object
  LOG.info(`Received assign question request data: ${JSON.stringify(jsonReq)}`);

  if (!validateRequest(jsonReq)) { // Validate the request
      LOG.error(`Bad assign question request ${jsonReq ? JSON.stringify(jsonReq) : "null"}.`);
      return { data: 'Done', message: ' request ok' };
  } else {
      const { quizId, questionId } = jsonReq;

      // Find the question by questionId
      const question = questions.find(q => q.id === questionId);

      if (!question) {
          LOG.error(`Question with id ${questionId} not found.`);
          return { data: CONSTANTS.FALSE_RESULT, message: `Question with id ${questionId} not found.` };
      }

      // Assign the question to the quiz (mock operation)
      question.quizId = quizId;

      LOG.info(`Question ${questionId} assigned to quiz ${quizId}`);
      return { data: CONSTANTS.TRUE_RESULT, question };
  }
};/*const express = require('express');
const router = express.Router();
const db = require('../db/db_connection');

// Placeholder code for assigning questions
router.post('/assignQuestion', (req, res) => {
  // Logic for assigning questions to users
  res.status(200).json({ message: 'Questions assigned successfully' });
});

module.exports = router;
*/