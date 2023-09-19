const bcrypt = require('bcrypt');
const Joi = require('joi');

const { User } = require('../models/index');

const authController = {
    renderLoginPage: async (req, res) => {
        try {
            res.render('login')
        } 
        catch(err){
            console.error(err);
            res.status(500).render('500');
        }
    },
    
    postLogin: async (req, res) => {      
        const {email, password} = req.body;        
        
        const userFound = await User.findOne({
            where: { email } 
        });

        //! SOMETHING IS WRONG HERE
        // Need to check if userFound existe first, then compare password
        const validPassword = bcrypt.compareSync(password, userFound.password);

        if(!userFound || !validPassword){
            res.render('login', {
                error: "Email ou mot de passe incorrect."
            })
        } 
        else {
            req.session.user = userFound;
            req.session.password = null;
        
            res.redirect(`/profile/u${req.session.user.id}`);
        }
        

    },

    renderSignupPage: async (req, res) => {
        try {                     
            res.render('signup')
        } 
        catch(err){
            console.error(err);
            res.status(500).render('500');
        }
    },
    
    addNewUser: async (req, res) => {
        try {
            let { firstname, lastname, email, password } = req.body;
        
            password = bcrypt.hashSync(password, 10);

            const validationSchema = Joi.object({
                firstname: Joi.string().trim().min(2).max(30).required(),
                lastname: Joi.string().trim().min(2).max(30).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(1).required(),
                confirmation: Joi.ref('password'),
            });

            const { error } = validationSchema.validate(req.body);

            if(error){
                res.status(401).render('signup', {errorMessage: error.details[0].message})
            } 
            
            await User.create({firstname, lastname, email, password});        
            
            res.redirect('/login');
        } 
        catch(err){
            console.error(err);
            res.status(500).render('500');
        }
    }
};

module.exports = authController;