import express from "express";
import pool from "../db.js";

const router = express.Router();

// -------------------- GET ALL ITEMS --------------------
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM inventory ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// -------------------- ADD AN ITEM --------------------
router.post("/", async (req, res) => {
    try {
        const { name, model, condition, price, stock } = req.body;

        const result = await pool.query(
            "INSERT INTO inventory (name, model, condition, price, stock) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [name, model, condition, price, stock]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// -------------------- UPDATE AN ITEM --------------------
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, model, condition, price, stock } = req.body;

        const result = await pool.query(
            "UPDATE inventory SET name=$1, model=$2, condition=$3, price=$4, stock=$5 WHERE id=$6 RETURNING *",
            [name, model, condition, price, stock, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// -------------------- DELETE AN ITEM --------------------
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM inventory WHERE id=$1", [id]);

        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;