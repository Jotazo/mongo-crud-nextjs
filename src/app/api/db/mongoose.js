import { connect, connection } from "mongoose";

const DB_URI = process.env.MONGO_URI;

const conn = {
  isConnected: false,
};

let db;

if (!conn.isConnected) {
  db = await connect(DB_URI);
  connection.on("connected", () => {
    console.log("Mongoose is connected");
    conn.isConnected = db.connections[0].readyState;
  });

  connection.on("error", (err) => {
    console.log("Mongoose connection error", err);
  });
}
