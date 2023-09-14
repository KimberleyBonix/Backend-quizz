const { User, Quiz, Question, Level, Tag, Answer } = require('../models/index');

const mainController = {
  renderHomePage: async (req, res) => {
    try {
       const quizzes = await Quiz.findAll({
        include: ['author', 'tags']
      }); 

      res.render("home", {quizzes});
    }
    catch {
      res.status(404)
    }
  },

  renderQuizPage: async (req, res) => {
    try {
      const id = req.params.id;

      let quiz = await Quiz.findByPk(id, {
        include: [
          'tags',
          { // questions
          association: "questions", // on inclut les questions du quiz
          include: [
            {association : 'level'},
            {association : 'propositions'},
          ] 
        }]
      });

      res.render('quiz', {quiz})
      
    } catch {
      res.status(404)
    }
  }
};

module.exports = mainController;
