const events = require("express").Router();
// const { UPDATE } = require("sequelize/types/query-types");
// const { DELETE } = require('sequelize/types/query-types');
const db = require("../models");
const { Event, Stage, StageEvent, SetTime, Band, MeetGreet } = db;
const { Op } = require("sequelize");

// CREATE
events.post("/", async (req, res) => {
  try {
    const createdEvent = await Event.create(req.body);
    res.status(200).json(createdEvent);
  } catch (e) {
    res.status(500).json(e);
  }
});

// READ
// get all events
events.get("/", async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      order: [["date", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundEvents);
  } catch (e) {
    res.status(500).json(e);
  }
});
// get one event
events.get("/:name", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { name: req.params.name },
      atributes: { exclude: ["event_id"] },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          attributes: ["meet_start_time", "meet_end_time"],
          include: {
            model: Band,
            as: "band",
          },
        },

        {
          model: SetTime,
          as: "set_time",
          attributes: ["start_time", "end_time"],

          include: [
            { model: Band, as: "band" },
            { model: Stage, as: "stage" },
          ],
        },

        {
          model: Stage,
          as: "stage",
          attributes: { exclude: ["stage_id"] },
          through: { attributes: [] },
        },
      ],
      order: [
        [{ model: MeetGreet, as: "meet_greets" }, "meet_start_time", "ASC"],
        [{ model: SetTime, as: "set_times" }, "start_time", "ASC"],
        [{ model: Stage, as: "stages" }, "stage_name", "ASC"],
      ],
    });
    res.status(200).json(foundEvent);
  } catch (e) {
    res.status(500).json(e);
  }
});

// UPDATE
events.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.update(req.body, {
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `successfully updated ${updatedEvent} event(s)`,
    });
  } catch (err) {
    res.status(500).json(e);
  }
});

// DELETE

events.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.destroy({
      where: { event_id: req.params.id },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvent} event(s)`,
    });
  } catch (err) {
    res.status(500).json(e);
  }
});

module.exports = events;
