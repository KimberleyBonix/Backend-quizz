const { User } = require('../models/index');

const adminController = {
    renderAdminPage : async (req, res) => {
        res.render('admin')
    }

}

module.exports = adminController;