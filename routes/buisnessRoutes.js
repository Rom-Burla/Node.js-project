//                                                                                           בס"ד

const { Router } = require("express");
const router = Router();
const buisnessController = require("../controllers/buisnessController");

// localhost:3000/buisness-card
router.post("/", buisnessController.card_post);

// localhost:3000/buisness-card/user/token
router.get("/user/token", buisnessController.card_by_token);

// localhost:3000/buisness-card/user/:id
router.get("/user/:id", buisnessController.card_by_user_id);

// localhost:3000/buisness-card/:id
router.get("/:id", buisnessController.card_get_by_id);

// localhost:3000/buisness-card/:id
router.put("/:id", buisnessController.card_update_by_id);

// localhost:3000/buisness-card/:id
router.delete("/:id", buisnessController.card_delete_by_id);

module.exports = router;
