import { logger } from "../utils/winston.js";
import Subcategory from "../models/Subcategory.js";
import Category from "../models/category.js";
import { Op } from "sequelize";

// CREATE SUBCATEGORY
export const createSubcategory = async (req, res) => {
    try {
        const { category_id, subcategory_name } = req.body;

        if (!category_id || !subcategory_name)
            return res.status(400).json({ message: "Category ID and subcategory name are required" });

        const category = await Category.findByPk(category_id);
        if (!category)
            return res.status(404).json({ message: "Category not found" });
        
        const existing = await Subcategory.findOne({ where: { category_id, subcategory_name } });
        if (existing)
            return res.status(409).json({ message: "Subcategory already exists for this category" });

        const subcategory = await Subcategory.create({ category_id, subcategory_name });
        logger.info(`Subcategory created with ID: ${subcategory.id}`);
        return res.status(201).json({ message: "Subcategory created successfully", data: subcategory });
    } catch (error) {
        logger.error("Error creating subcategory", error);
        return res.status(500).json({ message: "Failed to create subcategory", error: error.message });
    }
};

// GET ALL SUBCATEGORIES
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll({ include: Category });
        return res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        logger.error("Error fetching subcategories", error);
        return res.status(500).json({ message: "Failed to fetch subcategories", error: error.message });
    }
};

// UPDATE SUBCATEGORY
export const updateSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findByPk(id);
        if (!subcategory)
            return res.status(404).json({ message: "Subcategory not found" });

        const { subcategory_name } = req.body;
        if (!subcategory_name)
            return res.status(400).json({ message: "Subcategory name is required" });

        // Prevent duplicate
        const existing = await Subcategory.findOne({
            where: { subcategory_name, category_id: subcategory.category_id, id: { [Op.ne]: id } }
        });
        if (existing)
            return res.status(409).json({ message: "Subcategory already exists for this category" });

        await subcategory.update({ subcategory_name });
        logger.info(`Subcategory updated with ID: ${id}`);
        return res.status(200).json({ message: "Subcategory updated successfully", data: subcategory });
    } catch (error) {
        logger.error("Error updating subcategory", error);
        return res.status(500).json({ message: "Failed to update subcategory", error: error.message });
    }
};

// DELETE SUBCATEGORY
export const deleteSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findByPk(id);
        if (!subcategory)
            return res.status(404).json({ message: "Subcategory not found" });

        await subcategory.destroy();
        logger.info(`Subcategory deleted with ID: ${id}`);
        return res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        logger.error("Error deleting subcategory", error);
        return res.status(500).json({ message: "Failed to delete subcategory", error: error.message });
    }
};
