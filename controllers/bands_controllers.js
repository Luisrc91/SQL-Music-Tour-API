const bands = require("express").Router();
// const { DELETE } = require('sequelize/types/query-types');
const db = require("../models");
const { Band, Meet_greet, Set_time, Event } = db;
const { Op } = require('sequelize');

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
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll({
        order:[['available_start_time', 'ASC']],
        where:{
            name: { 
                [Op.like]: `%${req.query.name ? req.query.name : ''}%`
            }
        }
  });
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});
// FIND A SPECIFIC BAND
bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { name: req.params.name },
      include: [
        {
        model: Meet_greet,
        as: "meet_greet",
        // attributes: { exclude: ["band_id", "event_id"] },
        include: { 
          model: Event,
          as: "event", 
          where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
        }
        },
        {
          model: Set_time,
          as: "set_times",
          // attributes: { exclude: ["band_id", "event_id"] },
          include: {
            module: "Event",
            as: "event",
            where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
          }

        },

      ]
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
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
