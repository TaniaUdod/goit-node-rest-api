import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `Database connection successful. Name: ${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
