import mongoose from "mongoose";
import "dotenv/config";
const DB_MONGO_URI = process.env.DB_MONGO_URI || "";
const DB_MAX_RETRY = process.env.DB_MAX_RETRY || 1;
const RETRY_DELAY = 5000;
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error MongoDB: ", error);
});

const connectMongoDBWithRetry = async (retryCount = 0) => {
  try {
    await mongoose.connect(DB_MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB....");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    if (retryCount < DB_MAX_RETRY) {
      console.log("Retrying to connect to MongoDB....");
      setTimeout(() => {
        connectMongoDBWithRetry(retryCount + 1);
      }, RETRY_DELAY);
    } else {
      console.log("Max retries reached. Exiting....");
    }
  }
};

mongoose.set("debug", true);

mongoose.set("debug", { color: false });

mongoose.set("debug", { shell: true });

export { connectMongoDBWithRetry, mongoose };
