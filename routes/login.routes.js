import { Router } from "express";
import { login, getUser, getUsers, signin, deleteUser, putUser } from "../controllers/login.controllers.js";

const router = Router();

router.post('/login/', login);
router.post('/signin/', signin); // dado que el login ya tiene un post, agregué otro para agregar pero con signin, no lo separé en otra ruta por el momento

router.put('/login/:id', putUser);
router.get('/login/', getUsers);
router.get("/login/:id", getUser);
router.delete("/login/:id", deleteUser);

export default router;


