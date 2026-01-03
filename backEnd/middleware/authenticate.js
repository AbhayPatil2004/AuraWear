import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";

function handelUserAuthentication(req, res, next) {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json(
        new ApiResponse(401, {}, "Unauthorized: Please login first")
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json(
      new ApiResponse(401, {}, "Invalid or expired token")
    );
  }
}

export { handelUserAuthentication };
