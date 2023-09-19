const Joi = require('joi');
const { User } = require('../models/index');

const userController = {
    renderProfilePage: async (req, res) => {
        const {id} = req.params;
        const userConnected = await User.findOne({
            where: {id},
            include: ['quizzes']
        })

        res.render('profile', {user: userConnected})
    },

    editProfile: async (req, res) => {
        const {id} = req.params;
        const {firstname, lastname, email } = req.body;
        
        const validationSchema = Joi.object({
            firstname: Joi.string().trim().min(2).max(30),
            lastname: Joi.string().trim().min(2).max(30),
            email: Joi.string().email()
        });

        const { error } = validationSchema.validate(req.body);

        if(error){
            res.status(401).render('profile', {errorMessage: error.details[0].message})
        } 
        
        await User.update({firstname, lastname, email}, { where: {id} }); 

        res.redirect(`/profile/u${req.session.user.id}`)
    },


    renderPasswordPage: async (req, res) => {

        res.render('password');
    },

    changePassword: async (req, res) => {
        
        res.redirect(`/profile/u${req.session.user.id}`);
    },

    deleteAccount: (req, res) => {
        
    },

    logOut: (req, res) => {
        req.session.user = null;
        res.redirect('/');
    }


};

module.exports = userController;