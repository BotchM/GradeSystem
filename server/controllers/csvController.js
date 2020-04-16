const csv = require('../utils/csv'); 
const path    = require('path');

exports.upload = async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/', '/upload.html'));
}

exports.process = async (req, res) => {
    if(req.file){
        try {
            const data = await csv.parse(req.file.path);
            // res.redirect(200, '/dashboard')
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

exports.dashboard = async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/', '/dashboard.html'));
}