import { Router } from "express";
import usersRouter from "./users.routes";
import authRouter from "./auth.routes";
import protectedRouter from "./protected.routes";

const router = Router();

// Mount route modules
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/protected", protectedRouter);

// API info route
router.get("/", (req, res) => {
  res.json({
    message: "IntelliView API v1",
    endpoints: {
      users: "/api/users",
      auth: "/api/auth",
      protected: "/api/protected",
    },
  });
});

export default router;
