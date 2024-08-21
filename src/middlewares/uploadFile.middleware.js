import "dotenv/config";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import apiReturn from "../utils/apiReturn.util.js";

const uploadFileMiddleware = async (req, res, next) => {
  try {
    upload.array("files")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        const apiReturnMessage = apiReturn.error(
          400,
          "Multer error: " + err.message
        );
        return res.status(apiReturnMessage.error.code).send(apiReturnMessage);
      }
      next();
    });
  } catch (error) {
    console.error("Route error:", error);
    return res.status(500).send("Something went wrong");
  }
};

export { uploadFileMiddleware };
