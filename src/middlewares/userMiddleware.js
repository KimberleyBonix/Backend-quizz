const userSession = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        console.log('Utilisateur connecté : ' + req.session.user.firstname);
    } else {
        res.locals.user = null;
    }

    
    next();
    
};

module.exports = userSession;