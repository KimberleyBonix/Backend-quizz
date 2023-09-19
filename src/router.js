const { Router } = require("express");
const router = Router();

const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const adminController = require('./controllers/adminController');

const roleMiddleware = require('./middlewares/roleMiddleware');

// Main pages
router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", quizController.renderQuizPage);
router.get("/themes", mainController.renderAllThemesPage);

// Authentification pages
router.get('/signup', authController.renderSignupPage);
router.post('/signup', authController.addNewUser);

router.get('/login', authController.renderLoginPage);
router.post('/login', authController.postLogin);

// User pages
router.get('/profile/u:id', roleMiddleware.member, userController.renderProfilePage);
router.post('/profile/u:id', roleMiddleware.member, userController.editProfile);

router.get('/profile/u:id/editpassword', roleMiddleware.member, userController.renderPasswordPage)
router.post('/profile/u:id/editpassword', roleMiddleware.member, userController.changePassword);

router.get('/logout', userController.logOut);

// Admin pages
router.get('/admin', roleMiddleware.admin, adminController.renderAdminPage);


router.use((req, res) => {
    res.status(404).render("404");
});

module.exports = router;
