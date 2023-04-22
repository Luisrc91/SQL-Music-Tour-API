// const meet_greet = require("express").Router();
// // const { UPDATE } = require("sequelize/types/query-types");
// // const { DELETE } = require('sequelize/types/query-types');
// const db = require("../models");
// const { Meet_greet } = db;
// const { Op } = require("sequelize");

// // CREATE
// meet_greet.post("/", async (req, res) => {
//   try {
//    const createdMeet_greet = await Meet_greet.create(req.body);
// 		res.status(200).json(createdMeet_greet);
//   } catch (e) {
//     res.statusCode(500).json(e);
//   }
// });

// // // READ
// // get all events
// meet_greet.get('/', async (req, res) => {
// 	try {
// 		const foundMeet_greet = await Meet_greet.findAll();
// 		res.status(200).json(foundMeet_greet);
// 	} catch (e) {
// 		res.status(500).json(e);
// 	}
// });
// // get one event
// meet_greet.get("/:id", async (req, res) => {
//   try {
//     const foundMeet_greet = await Meet_greet.findOne({
//       where: { meet_greet_id: req.params.id },
//     });
//     res.status(200).json(foundMeet_greet);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// // UPDATE
// events.put("/:id", async(req, res)=>{
//   try {
//     const updatedEvent = await Event.update(req.body, {
//       where: {
//         event_id: req.params.id,
//       },
//     });
//     res.status(200).json({
//       message: `successfully updated ${updatedEvent} event(s)`,
//     });
//   } catch (err) {
//     res.status(500).json(e);
//   }
// })


// // DELETE

// events.delete('/:id', async (req, res) => {
//   try{
//     const deletedEvent = await Event.destroy({
//       where: {event_id: req.params.id},
//     });
//     res.status(200).json({
//       message: `Successfully deleted ${deletedEvent} event(s)`,

//     });
//   } catch(err){
//     res.status(500).json(e);
//   }
// });

// module.exports = events;
