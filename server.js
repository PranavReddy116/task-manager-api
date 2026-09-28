const express = require("express");
const errorMiddleware=require("./middleware/errorMiddleware");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes=require("./routes/taskRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected successfully",
            time: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.use("/users", userRoutes);
app.use("/tasks",taskRoutes);
app.use((req,res,next)=>{
    res.status(404).json({
        message:"route not found"
    });
});
app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});