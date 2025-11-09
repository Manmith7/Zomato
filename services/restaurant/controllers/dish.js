import { logger } from "../utils/winston.js";
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/category.js";
import Subcategory from "../models/Subcategory.js";

// CREATE DISH
export const createDish = async (req, res) => {
    try {
        const { restaurant_id, category_id, subcategory_id, dish_name, price, is_veg, description } = req.body;

        if (!restaurant_id || !category_id || !dish_name)
            return res.status(400).json({ message: "Restaurant, category, and dish name are required" });

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        const category = await Category.findByPk(category_id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        let subcategory = null;
        if (subcategory_id) {
            subcategory = await Subcategory.findByPk(subcategory_id);
            if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });
        }

        const dish = await Dish.create({
            restaurant_id,
            category_id,
            subcategory_id: subcategory_id || null,
            dish_name,
            price: price || 0,
            is_veg: is_veg ?? true,
            description: description || ""
        });

        logger.info(`Dish created with ID: ${dish.id}`);
        return res.status(201).json({ message: "Dish created successfully", data: dish });
    } catch (error) {
        logger.error("Error creating dish", error);
        return res.status(500).json({ message: "Failed to create dish", error: error.message });
    }
};

// GET ALL DISHES
export const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll({ include: [Restaurant, Category, Subcategory] });
        return res.status(200).json({ success: true, data: dishes });
    } catch (error) {
        logger.error("Error fetching dishes", error);
        return res.status(500).json({ message: "Failed to fetch dishes", error: error.message });
    }
};

// UPDATE DISH
export const updateDishById = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findByPk(id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });

        await dish.update(req.body);
        logger.info(`Dish updated with ID: ${id}`);
        return res.status(200).json({ message: "Dish updated successfully", data: dish });
    } catch (error) {
        logger.error("Error updating dish", error);
        return res.status(500).json({ message: "Failed to update dish", error: error.message });
    }
};

// DELETE DISH
export const deleteDishById = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findByPk(id);
        if (!dish) return res.status(404).json({ message: "Dish not found" });

        await dish.destroy();
        logger.info(`Dish deleted with ID: ${id}`);
        return res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        logger.error("Error deleting dish", error);
        return res.status(500).json({ message: "Failed to delete dish", error: error.message });
    }
};
