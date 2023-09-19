const { User, Quiz, Question, Level, Tag, Answer } = require('../models/index');

const mainController = {
  renderHomePage: async (req, res) => {
    try {
       const quizzes = await Quiz.findAll({
        order: [['title', 'ASC']],
        include: ['author', 'tags']
      }); 

      res.render("home", {quizzes});
    }
    catch(err){
      console.error(err);
      res.status(500).render('500');
    }
  },

  renderAllThemesPage: async (req, res) => {
    try {
      const themes = await Tag.findAll({
      include: ['quizzes']
      });

      res.render('themes', {themes})
    } catch(err){
      console.error(err);
      res.status(500).render('500');
    }

  }
};

module.exports = mainController;
