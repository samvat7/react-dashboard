// scripts/dataImportScript.js
import mongoose from "mongoose";
import { BlackCofferData } from "../src/models/BlackCofferData.js";
import { blackcofferData as data } from "../src/data/blackcofferData.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blackcoffer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import data to MongoDB



const importData = async () => {
  try {
    await BlackCofferData.create(data); // Bulk insert
    console.log("Data successfully imported to MongoDB!");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};

importData();

