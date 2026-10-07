const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get("/events", async (req, res) => {
    try{
        const koncertek = await database.koncertek();
        res.status(200).json({
            message: "ez jo",
            results: koncertek
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "nem jo"
        });
    }
});

router.post("/events", async (req, res) => {
    try{
        const koncertek = await database.ujkoncert(req.body.fellepo_nev, req.body.datum, req.body.jegy_ar, req.body.helyszin_id);
        res.status(200).json({
            message: "ez jo"
        });
    }catch(error){
        res.status(500).json({
            message: "nem jo"
        });
    }
});

router.delete("/events:id", async (req, res) => {
    try{
        const koncertek = await database.koncertTorles();
        res.status(200).json({
            message: "ez jo",
            results: koncertek
        });
    }catch(error){
        res.status(500).json({
            message: "nem jo"
        });
    }
});

router.get("/venues", async (req, res) => {
    try{
        const koncertek = await database.helyszinek();
        res.status(200).json({
            message: "ez jo",
            results: koncertek
        });
    }catch(error){
        res.status(500).json({
            message: "nem jo"
        });
    }
});

module.exports = router;
