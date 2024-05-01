const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class userController {
    static getAllUsers = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const users = await User.findAll({ attributes: { exclude: ["password", "id"] } });
            res.json(users);
        }
        catch(err){
            console.log("Error in gettin users", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static getSingleUser = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const {id} = req.params;
            const user = await User.findOne({where: {id: id}});
            res.json(user);
        }
        catch(err){
            console.log("Error in gettin user", err);
            res.status(500).json({message: "internal server error"});
        }
    }
    static updateUser = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const {id} = req.params;
            const {name, email, password} = req.body;
            const user = await User.findOne({where: {id: id}});;
            user.update({name: name, email: email, password: password});
            user.save();
            res.json("user updated successfully")
        }
        catch(err){
            console.log("Error in updating user", err);
            res.status(500).json({message: "internal server error"});
        }
    }
    static deleteUser = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const user = findOne({where: {id: id}});
            user.destroy(); 
            user.save();
            res.json("user deleted successfully");
        }
        catch(err){
            console.log("Error in deleting user", err);
            res.status(500).json({message: "internal server error"});
        }
    }
    static register = async(req, res) => {
        const {name, email, password, inteam} = req.body;
        if (!(name && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = await User.create({name: name, email: email, password: hashedPassword, inTeam: inteam, currentTeamId: null});
            // const token = jwt.sign({id: user.id, name, email: user.email, password: hashedPassword, inTeam: user.inteam, currentTeamId: user.currentTeamId,}, process.env.JWT_SECRET_KEY, {expiresIn: "30d",});
            res.json({msg: "Account Created Successfully"});
        }
        catch(err){
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ error: "Email address already exists" });
              } else {
                console.error("Error creating admin user:", err);
                res.status(500).json({ error: "Internal Server Error" });
              }
        }
    }
    static login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const matchedPassword = await bcrypt.compare(password, user.password);
            if (!matchedPassword) {
                return res.status(401).json({ error: "Incorrect email or password" });
            }
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    inTeam: user.inTeam,
                    currentTeamId: user.currentTeamId,
                },
                process.env.JWT_SECRET_KEY,
            // "JWT_SECRET_KEY",
                {
                    expiresIn: "30d",
                }
            );
            res.status(200).json({
                msg: "Login Successful",
                auth: true,
                token,
            });
        } catch (err) {
            console.error("Error during Login:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
}

module.exports =  userController;