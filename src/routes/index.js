import express from 'express';
import { createUser, searchUsers } from '../controllers/user.controller.js';
import { createConversation, getAllConversations } from '../controllers/conversation.controller.js';

const router = express.Router();

router.post("/conversations/create", createConversation);
router.get("/conversations", getAllConversations)
router.post("/users/create", createUser);
router.get("/users/search", searchUsers);

router.get('/', function (req, res, next) {
  res.render('index');
});

export default router
