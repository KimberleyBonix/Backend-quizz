const { User } = require('../models/index');

const authController = {
    renderLoginPage: async (req, res) => {
        try {
            res.render('login')
        } catch(err){
            console.error(err);
            res.status(500).render('500');
          }
    },
    
    postLogin(req, res){      
        const {email, password} = req.body;
        console.log(email);
        const array = [email, password];
        console.log(array);
        req.session.login = array;
          
        //req.session.login = req.body.login;
        console.log(req.session.login);
        res.redirect('/');
    },

    renderSignupPage: async (req, res) => {
        try {                       
            
            res.render('signup')
            
        } catch(err){
            console.error(err);
            res.status(500).render('500');
          }
    },
    
    addNewUser: async (req, res) => {
        try {
            const {firstname, lastname, email, password} = req.body;
            
            const newUser = await User.create({firstname, lastname, email, password});        
            
            res.status(200).redirect('/signup', console.log('Utilisateur crée'));
            
            
        } catch(err){
            console.error(err);
            res.status(500).render('500');
          }
    }
};

module.exports = authController;