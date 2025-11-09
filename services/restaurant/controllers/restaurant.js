import { logger } from "../utils/winston.js";
import Restaurant from "../models/Restaurant.js";
import { Op } from "sequelize";

// Helper: validate coordinates format
const isValidCoords = (coords) => {
    if (!coords) return true; // optional
    return typeof coords === "object" && "x" in coords && "y" in coords;
};

const isValidPhone = (phone) => /^\d{10,15}$/.test(phone);

const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerRestaurant = async (req, res) => {
    try {
        const {
            rest_name,
            rest_address,
            rest_coords,
            res_reviews,
            res_policy,
            rest_opening_time,
            rest_closing_time,
            rest_mobile,
            rest_email,
            rest_legal_name,
            rest_fssai_no,
            rest_images,
            rest_delivery,
            rest_dining,
            rest_famous_dish,
            rest_offers,
        } = req.body;

        // --- VALIDATIONS ---
        if (!rest_name || !rest_address)
            return res.status(400).json({ message: "Name and address are required" });

        if (rest_email && !isValidEmail(rest_email))
            return res.status(400).json({ message: "Invalid email format" });

        if (rest_mobile && !isValidPhone(rest_mobile))
            return res.status(400).json({ message: "Invalid phone number" });

        if (!isValidCoords(rest_coords))
            return res.status(400).json({ message: "Invalid coordinates format" });

        // Check for duplicate email
        if (rest_email) {
            const existing = await Restaurant.findOne({ where: { rest_email } });
            if (existing)
                return res.status(409).json({ message: "Email already exists" });
        }

        // --- CREATE RESTAURANT ---
        const newRestaurant = await Restaurant.create({
            rest_name,
            rest_address,
            rest_coords: rest_coords || null,
            res_reviews: res_reviews || [],
            res_policy: res_policy || "",
            rest_opening_time,
            rest_closing_time,
            rest_mobile: rest_mobile || null,
            rest_email: rest_email || null,
            rest_legal_name: rest_legal_name || "",
            rest_fssai_no: rest_fssai_no || null,
            rest_images: rest_images || [],
            rest_delivery: rest_delivery || false,
            rest_dining: rest_dining || false,
            rest_famous_dish: rest_famous_dish || "",
            rest_offers: rest_offers || [],
        });

        logger.info(`Restaurant created with ID: ${newRestaurant.id}`);
        return res.status(201).json({ message: "Restaurant registered successfully", data: newRestaurant });
    } catch (error) {
        logger.error("Error registering restaurant", error);
        return res.status(500).json({ message: "Failed to register restaurant", error: error.message });
    }
};

// GET ALL RESTAURANTS
export const getAllRestaurants = async (req, res) => {
    try {
        logger.info("Fetching restaurants");
        const restaurants = await Restaurant.findAll();
        return res.status(200).json({ success: true, message: "Fetched restaurants successfully", data: restaurants });
    } catch (error) {
        logger.error("Error fetching restaurants", error);
        return res.status(500).json({ message: "Failed to fetch restaurants", error: error.message });
    }
};

// GET RESTAURANT BY ID
export const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant)
            return res.status(404).json({ message: "Restaurant not found" });

        return res.status(200).json({ data: restaurant });
    } catch (error) {
        logger.error(`Error fetching restaurant with ID ${req.params.id}`, error);
        return res.status(500).json({ message: "Failed to fetch restaurant", error: error.message });
    }
};

// UPDATE RESTAURANT BY ID
export const updateRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant)
            return res.status(404).json({ message: "Restaurant not found" });

        const { rest_email, rest_mobile, rest_coords } = req.body;

        // Validation for updated fields
        if (rest_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rest_email))
            return res.status(400).json({ message: "Invalid email format" });

        if (rest_mobile && !/^\d{10,15}$/.test(rest_mobile))
            return res.status(400).json({ message: "Invalid phone number" });

        if (rest_coords && !isValidCoords(rest_coords))
            return res.status(400).json({ message: "Invalid coordinates format" });

        // Check for email conflict
        if (rest_email) {
            const existing = await Restaurant.findOne({ where: { rest_email, id: { [Op.ne]: id } } });
            if (existing)
                return res.status(409).json({ message: "Email already exists" });
        }

        await restaurant.update(req.body);

        logger.info(`Restaurant updated with ID: ${id}`);
        return res.status(200).json({ message: "Restaurant updated successfully", data: restaurant });
    } catch (error) {
        logger.error(`Error updating restaurant with ID ${req.params.id}`, error);
        return res.status(500).json({ message: "Failed to update restaurant", error: error.message });
    }
};

// DELETE RESTAURANT BY ID
export const deleteRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant)
            return res.status(404).json({ message: "Restaurant not found" });

        await restaurant.destroy();
        logger.info(`Restaurant deleted with ID: ${id}`);
        return res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting restaurant with ID ${req.params.id}`, error);
        return res.status(500).json({ message: "Failed to delete restaurant", error: error.message });
    }
};
