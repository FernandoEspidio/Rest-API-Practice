import "dotenv/config"
import cors from "cors";
import express from "express"
import indexRoutes from "./routes/index.routes.js"
import itemsRoutes from "./routes/items.routes.js"
import loginRoutes from "./routes/login.routes.js"
import morgan from "morgan";
import { connectDB } from "./utils/mongodb.js";
import items2Routes from "./routes/items2.routes.js"

const app = express();

connectDB();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items2Routes);
app.use(loginRoutes);

app.listen(5500, () => {
  console.log('Servidor ejecutándose en http://localhost:5500');
});

/*
import express from "express"
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(indexRoutes);

app.listen(5000, console.log("http://localhost:5000"));
*/