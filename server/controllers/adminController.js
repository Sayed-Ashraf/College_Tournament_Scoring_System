const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class adminController {
    static getAlladmins = async(req, res) =>{
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const admins = await User.findAll({where: {role: "admin"}});
            res.status(200).json({ admins });
        }
        catch(err){
            console.log("Error fetching admins" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static addAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {name, email, password} = req.body;
        if (!(name && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const admin = await User.create({name, email, password: hashedPassword, role: "admin"});
            res.json("admin created successfully");
        }
        catch(err){
            console.log("Error adding admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static updateAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {name, email, password} = req.body;
        if (!(name && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        try{
            const {id} = req.params;
            const admin = await User.findOne({where: {role: "admin", id: id}});
            admin.update({name: name, email: email, password: password});
            admin.save();
            res.jsonn("admin updated successfully");
        }
        catch(err){
            console.log("Error updating admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } 
    static deleteAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const admin = await User.findOne({where: {role: "admin", id: id}});
            admin.destroy();
            admin.save();
            res.json("admin deleted successfully");
        }
        catch(err){
            console.log("Error updating admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = adminController;