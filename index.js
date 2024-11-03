require('dotenv').config();
const express = require("express");
const { summarizeText, generateImageFromText } = require('./summarize.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/summarize', (req, res) => {
    const text = req.body.text_to_summarize;
    summarizeText(text)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).send("Error summarizing text");
        });
});

app.post('/generate-image', (req, res) => {
    const text = req.body.text;
    generateImageFromText(text)
        .then(imageBytes => {
            res.set('Content-Type', 'image/png');
            res.send(imageBytes);
        })
        .catch(error => {
            console.log(error.message);
            res.status(500).send("Error generating image");
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
