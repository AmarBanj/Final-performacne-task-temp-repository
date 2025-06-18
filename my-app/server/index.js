//NOTE, With the setup I have here, the server is not configured to start when NPM start is run
// instead use node index.js in the server terminal
// Amar Banjaluckic

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const csvPath = path.join(__dirname, 'userinfo.csv'); //Path for the CSV file

// CSV file column info if file doesnt exist
if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'ID,Email,Uname,Pword\n');
}


// All of the signup is handled here
app.post('/api/save-user', (req, res) => {
    const { Email, Uname, Pword } = req.body;
    if (!Email || !Uname || !Pword) {
        return res.status(400).json({ error: "Missing fields" });
    }

    fs.readFile(csvPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading CSV", err);
            return res.status(500).json({ error: "Server error "});
        }

        // Check to see if input information already exists (No duplicate Emails or Usernames)
        const lines = data.trim().split('\n').slice(1); // skip first line (Because thats where column info is)
        const isDuplicate = lines.some(line => {
            const [id, email, uname, pword] = line.split(','); // CSV file information is seperated by commas, so split by each comma.
            return uname === Uname || email === Email;
        });

        if (isDuplicate) {
            return res.status(409).json({ error: "Username or Email already exists" });
        }
        // read the lines in the userinfo file to assign an ID
        // I had a simpler way of doing this but from what I found out this is more efficient
        const lastId = lines.length > 0 ? parseInt(lines[lines.length - 1].split(',')[0]) : 0;
        const newID = lastId + 1

        // The order that information is stored and should be appended in the CSV file
        const csvLine = `${newID},${Email},${Uname},${Pword}\n`;
        fs.appendFile(csvPath,csvLine, (err) => {
            if (err) {
                console.error("Error saving to CSV file:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(200).json({ message: 'User Saved successfully!' });
        });
    });
});

// All of the login is handled here
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    fs.readFile(csvPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading CSV", err);
            return res.status(500).json({ error: "Server error" });
        }

        const lines = data.trim().split('\n').slice(1); // Skip the first line again

        const foundUser = lines.find(line => {
            const [id, email, uname, pword] = line.split(','); // split by each comma
            return (identifier === email || identifier === uname) && password === pword;
        });

        if (foundUser) {
            return res.status(200).json({ message: "Login successful" });
        }
        else {
            return res.status(401).json({ error: "Wrong username or password"});
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
