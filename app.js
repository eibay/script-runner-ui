const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/run-script', (req, res) => {
    const { arg1, arg2 } = req.body;
    const script = path.join(__dirname, 'scripts', 'builder.sh');

    exec(`sh ${script} ${arg1} ${arg2}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`stderr: ${stderr}`);
            return;
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
