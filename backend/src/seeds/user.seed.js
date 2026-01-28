import { config } from "dotenv";
import { connectDB } from '../lib/db.js';
import User from "../models/user.model.js";

config();

const seedUsers = [
    {
        email: "manoj.dev@gmail.com",
        fullName: "Manoj Kumar",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315566/Boy_5_v21cb7.png"
    },
    {
        email: "sathyaseelan@gmail.com",
        fullName: "Sathy",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315562/Boy_4_f2jrbl.png",
    },
    {
        email: "sivasubramanian@gmail.com",
        fullName: "Siva Kolaru",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315562/Boy_2_grha7i.png",
    },
    {
        email: "vikash@gmail.com",
        fullName: "Vikash Vk",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315591/Boy_1_jx1ewl.png"
    },
    {
        email: "santhosb@gmail.com",
        fullName: "Santhos B",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315558/Boy_3_x3f9ry.png"
    },
    {
        email: "santhosandy@gmail.com",
        fullName: "Sandy",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315558/Boy_3_x3f9ry.png"
    },



    // Female Users
    {
        email: "pavi@gmail.com",
        fullName: "Pavi",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315558/Women_4_vwrtau.jpg"
    },
    {
        email: "priya@gmail.com",
        fullName: "Priya",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315559/Women_3_rqfi1o.jpg"
    },
    {
        email: "kavya@gmail.com",
        fullName: "Kavya",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315560/Women_5_mjfdcb.jpg"
    },
    {
        email: "madhu@gmail.com",
        fullName: "Madhu",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315559/Women_2_spktsq.jpg"
    },
    {
        email: "sowmi@gmail.com",
        fullName: "Sowmi",
        password: "12345678",
        profilePic: "https://res.cloudinary.com/dli6vsc04/image/upload/v1769315557/Women_1_qurbnq.jpg"
    },
];


const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.log("Error seeding database", error);
        
    }
};

// Call the function
seedDatabase();
