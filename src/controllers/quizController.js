const { User, Quiz, Question, Level, Tag, Answer } = require('../models/index');


const quizController = {

  renderQuizPage: async (req, res) => {
    try {
      if(!req.session.user){
        res.status(401).render('401')
      }
      
      const id = req.params.id;
      if (isNaN(id)) { return next();}

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
      
    } catch(err){
      console.error(err);
      res.status(500).render('500');
    }
  },
}

module.exports = quizController;