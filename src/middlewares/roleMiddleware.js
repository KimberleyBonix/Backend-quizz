const roleMiddleware = {
    member: (req, res, next) => {
        if(!req.session.user) {
            res.redirect('/login')
        }
        next();
    },
    
    admin: (req, res, next) => {
        if(req.session.user.role === 'admin') {
            next();
        } else {
            res.status(403).render('403')
        }
    }

};

module.exports = roleMiddleware;