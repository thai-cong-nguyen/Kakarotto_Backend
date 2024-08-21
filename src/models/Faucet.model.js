import mongoose from "mongoose";

const { Schema } = mongoose;

const faucetSchema = new Schema({
  network: String,
  quantity: Number,
  address: String,
  block: Boolean,
  latestFaucet: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const FaucetModel = mongoose.model("Faucet", faucetSchema);

export default FaucetModel;
