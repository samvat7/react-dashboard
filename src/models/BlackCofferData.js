import mongoose from "mongoose";

const blackCofferSchema = new mongoose.Schema({
  //example object of the schema
  //     "end_year": "",
  //     "intensity": 2,
  //     "sector": "",
  //     "topic": "",
  //     "insight": "Greenhouse gas",
  //     "url": "https://en.wikipedia.org/wiki/Greenhouse_gas",
  //     "region": "World",
  //     "start_year": "",
  //     "impact": "",
  //     "added": "July, 03 2016 05:28:48",
  //     "published": "July, 03 2016 00:00:00",
  //     "country": "",
  //     "relevance": 1,
  //     "pestle": "",
  //     "source": "Wikipedia",
  //     "title": "Earth's surface temperature could exceed historical values as early as 2047.",
  //     "likelihood": 2

    end_year: {
        type: String
    },
    intensity: {
        type: Number
    },
    sector: {
        type: String
    },
    topic: {
        type: String
    },
    insight: {
        type: String
    },
    url: {
        type: String
    },
    region: {
        type: String
    },
    start_year: {
        type: String
    },
    impact: {
        type: String
    },
    added: {
        type: String
    },
    published: {
        type: String
    },
    country: {
        type: String
    },
    relevance: {
        type: Number
    },
    pestle: {
        type: String
    },
    source: {
        type: String
    },
    title: {
        type: String
    },
    likelihood: {
        type: Number
    }
});

export const BlackCofferData = mongoose.model("BlackCofferData", blackCofferSchema);

