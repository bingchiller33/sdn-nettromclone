import express from "express";
import categoriesController from "../../controllers/categoriesController/index.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/all_catergories", categoriesController.getAllCategories);

export default categoriesRouter;
