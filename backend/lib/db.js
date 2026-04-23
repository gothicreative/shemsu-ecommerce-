import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Double-check if you named it MONGO_URI or MONGODB_URI in Vercel settings!
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error("MongoDB URI is missing from environment variables");
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MONGODB:", error.message);
        // Do NOT use process.exit(1) on Vercel
        throw error; 
    }
};