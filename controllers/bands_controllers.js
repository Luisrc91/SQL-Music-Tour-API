const bands = require("express").Router();
// const { DELETE } = require('sequelize/types/query-types');
const db = require("../models");
const { Band, MeetGreet, SetTime, Event } = db;
const { Op } = require("sequelize");

// CREATE
// CREATE A BAND
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBand,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ
// FIND ALL BANDS
bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { name: req.params.name },
      attributes: ["name", ["available_start_time", "start_time"], "end_time"],
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          attributes: ["meet_start_time", "meet_end_time"],
          include: {
            model: Event,
            as: "event",
            attributes: { exclude: ["event_id"] },
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          attributes: ["start_time", "end_time"],
          include: {
            model: Event,
            as: "event",
            attributes: { exclude: ["event_id"] },
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
      ],
      order: [
        [
          { model: MeetGreet, as: "meet_greets" },
          { model: Event, as: "event" },
          "date",
          "DESC",
        ],
        [
          { model: SetTime, as: "set_times" },
          { model: Event, as: "event" },
          "date",
          "DESC",
        ],
      ],
    });
    res.status(200).json(foundBand);
  } catch (e) {
    res.status(500).json(e);
  }
});
// FIND A SPECIFIC BAND
bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { name: req.params.name },
      attributes: ["name", ["available_start_time", "start_time"], "end_time"],
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          attributes: ["meet_start_time", "meet_end_time"],
          include: {
            model: Event,
            as: "event",
            attributes: { exclude: ["event_id"] },
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          attributes: ["start_time", "end_time"],
          include: {
            model: Event,
            as: "event",
            attributes: { exclude: ["event_id"] },
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
      ],
      order: [
        [
          { model: MeetGreet, as: "meet_greets" },
          { model: Event, as: "event" },
          "date",
          "DESC",
        ],
        [
          { model: SetTime, as: "set_times" },
          { model: Event, as: "event" },
          "date",
          "DESC",
        ],
      ],
    });
    res.status(200).json(foundBand);
  } catch (e) {
    res.status(500).json(e);
  }
});

// UPDATE
// UPDATE A BAND
bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await Band.update(req.body, {
      where: {
        Band_id: req.params.id,
      },
    });
    res.status(200).json({
      // message: `updated band ${updatedBands}`
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

// DELETE A BAND
bands.delete("/:id", async (req, res) => {
  try {
    const deletedBands = await Band.destroy({
      where: {
        Band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = bands;
