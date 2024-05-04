const Router = require("express");
const router = new Router();
const userDataController = require("../controllers/userDataController");

router.get("/seed", userDataController.generateRandomSeed);
router.post("/data", userDataController.generateUsersData);

module.exports = router;
