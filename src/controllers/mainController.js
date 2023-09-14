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
    
  }
};

module.exports = mainController;
