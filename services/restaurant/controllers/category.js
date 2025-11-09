import { logger } from "../utils/winston.js";
import Category from "../models/category.js";
import Restaurant from "../models/Restaurant.js";
import { Op } from "sequelize";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
    try {
        const { restaurant_id, category_name } = req.body;

        if (!restaurant_id || !category_name)
            return res.status(400).json({ message: "Restaurant ID and category name are required" });

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant)
            return res.status(404).json({ message: "Restaurant not found" });

        // Prevent duplicate category for same restaurant
        const existing = await Category.findOne({ where: { restaurant_id, category_name } });
        if (existing)
            return res.status(409).json({ message: "Category already exists for this restaurant" });

        const category = await Category.create({ restaurant_id, category_name });
        logger.info(`Category created with ID: ${category.id}`);
        return res.status(201).json({ message: "Category created successfully", data: category });
    } catch (error) {
        logger.error("Error creating category", error);
        return res.status(500).json({ message: "Failed to create category", error: error.message });
    }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ include: Restaurant });
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        logger.error("Error fetching categories", error);
        return res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
};

// UPDATE CATEGORY
export const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category)
            return res.status(404).json({ message: "Category not found" });

        const { category_name } = req.body;

        if (!category_name)
            return res.status(400).json({ message: "Category name is required" });

        // Prevent duplicate
        const existing = await Category.findOne({
            where: { category_name, restaurant_id: category.restaurant_id, id: { [Op.ne]: id } }
        });
        if (existing)
            return res.status(409).json({ message: "Category already exists for this restaurant" });

        await category.update({ category_name });
        logger.info(`Category updated with ID: ${id}`);
        return res.status(200).json({ message: "Category updated successfully", data: category });
    } catch (error) {
        logger.error("Error updating category", error);
        return res.status(500).json({ message: "Failed to update category", error: error.message });
    }
};

// DELETE CATEGORY
export const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category)
            return res.status(404).json({ message: "Category not found" });

        await category.destroy();
        logger.info(`Category deleted with ID: ${id}`);
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        logger.error("Error deleting category", error);
        return res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
};
