const Event = require("../models/Event.js")
const Questions = require("../models/Questions.js");
const Participation = require("../models/Participation.js");

class eventController{
    static getAllEvents = async(req, res) => {
        try{
            const events = await Event.findAll();
            res.status(200).json(events);
        }
        catch(err){
            console.log("Error getting events", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static getEventbyPK = async(req, res) => {
        try{
            const { id }= req.params;
            const event = await Event.findByPk(id);
            const questions = await Questions.findAll({where: {eventId: event.id}});
            res.status(200).json({event, questions});
        }
        catch(err){
            console.log("Error getting event", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static createEvent = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {eventName, eventType, eventCategory, points, questions, answers} = req.body;
        if(!(eventName && eventType && eventCategory, points, questions, answers)){
            return res.status(401).json({ error: "Missing input fields" });
        }
        try{
            const newEvent = await Event.create({eventName: eventName, eventType: eventType, eventCategory: eventCategory, points: points, answers: answers});
            
            if (questions && answers) {
                await Promise.all(
                  questions.map(async (question, index) => {
                    const answer = answers[index];
                    await Questions.create({
                      eventId: newEvent.id,
                      questions: question ? question : "test",
                      answer: answer ? answer : "test",
                    });
                  })
                );
              } else {
                return res.status(400).json({ error: "Questions and answers should be provided as arrays of equal length" });
              }
        
              res.status(201).json({ message: "Event created successfully", event: newEvent });
        }
        catch(err){
            console.log("Error creating event", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static calculateResults = async(req, res) => {
        const {userId, eventId, points} = req.body;
        try{
            const participation = await Participation.create({userId: userId, eventId: eventId, points: points});
            res.status(200).json("Participation Added successfully")
        }
        catch(err){
                console.log("Error cannot calculate the results", err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
}

module.exports = eventController;