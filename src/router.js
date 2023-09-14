const { Router } = require("express");
const mainController = require("./controllers/mainController");
const authController = require("./controllers/authController");

const router = Router();

router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", mainController.renderQuizPage);
router.get("/themes", mainController.renderAllThemesPage);

router.get('/login', authController.renderLoginPage);
router.post('/login', authController.postLogin);

router.get('/signup', authController.renderSignupPage);
router.post('/signup', authController.addNewUser);



router.use((req, res) => {
    res.status(404).render("404");
});

module.exports = router;
