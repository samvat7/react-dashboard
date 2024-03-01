import mongoose from "mongoose";
import {BlackCofferData} from "../models/BlackCofferData";

export var blackCofferData = [];

export default class DataRetriever {
    async getBlackCofferData() {
        try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/blackcoffer`);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
        db.once('open', function(){
            console.log('Successfully connected to the database');
        });
        const data = await BlackCofferData.find({});
        console.log(data);
        return data;
        }
        catch (error) {
            console.log(error);
        }
    }
}


