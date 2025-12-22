import { Router } from "express";
import usersRouter from "./users.routes";

const router = Router();

// Mount route modules
router.use("/users", usersRouter);

// API info route
router.get("/", (req, res) => {
  res.json({
    message: "IntelliView API v1",
    endpoints: {
      users: "/api/users",
      // Add more endpoints as they are created
    },
  });
});

export default router;
