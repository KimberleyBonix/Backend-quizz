const Joi = require('joi');
const bcrypt = require('bcrypt');
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
        let { oldPassword, newPassword, confirmNewPassword } = req.body;
    
        const userFound = await User.findOne({
            where: {id: req.session.user.id }
        });
        
        const confirmIdentity = bcrypt.compareSync(oldPassword, userFound.password);

        if(confirmIdentity){
            newPassword = bcrypt.hashSync(newPassword, 10);
            confirmNewPassword = bcrypt.hashSync(confirmNewPassword, 10);
            
            const validationSchema = Joi.object({
                oldPassword: Joi.string().min(1).required(),
                newPassword: Joi.string().min(1).not(Joi.ref('oldPassword')),
                confirmNewPassword: Joi.ref('newPassword'),
            });

            const { error } = validationSchema.validate(req.body);

            if(error){
                res.render('password', {errorMessage: error.details[0].message})
            } 

            await User.update({password: newPassword}, { where: {id: req.session.user.id } });
            req.session.user.password = null;

            res.status(201).render('profile', {updatePassword: `Votre mdp a été modifié`});
        } 
        

        else {
            res.status(404).render('password', {errorMessage: 'Votre ancien ancien mdp correspond pas'})
        }

    },

    deleteAccount: (req, res) => {
        
    },

    logOut: (req, res) => {
        req.session.user = null;
        res.redirect('/');
    }


};

module.exports = userController;