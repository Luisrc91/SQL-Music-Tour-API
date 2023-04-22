const stage = require("express").Router();
const db = require("../models");
const { Stage, Event, Stage_event } = db;
const { Op } = require('sequelize');

// CREATE
stage.post('/', async (req, res) => {
  try {
      const newStage = await Stage.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new stage',
          data: newStage
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// READ
// get stages
stage.get('/', async (req, res) => {
  try {
      const foundStages = await Stage.findAll({
          where: {
              stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
          }
      })
      res.status(200).json(foundStages)
  } catch (error) {
      res.status(500).json(error)
  }
})
// get one stage
stage.get("/:name", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_name: req.params.name },
      include: { 
        model: Event,
        as: 'events',
        through: Stage_event

    }});
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
stage.put("/:id", async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stage_name: req.params.id,
      },
    });
    res.status(200).json({
      // message: `updated band ${updatedBands}`
      message: `Successfully updated ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE

stage.delete("/:id", async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = stage;
