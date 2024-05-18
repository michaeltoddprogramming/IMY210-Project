const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const util = require('util');
const xml2js = require('xml2js');
const path = require('path');
const xmlFilePath = path.join(__dirname, '..', 'db', 'sample.xml');
const xmlFilePath1 = path.join(__dirname, '..', 'db', 'store1.xml');
const usersFilePath = path.join(__dirname, '..', 'db', 'users.xml');



const app = express();
const port = 3002;
const corsOptions = {
    origin: '*',
    credentials: true,        
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
const parser = new xml2js.Parser();

app.get('/stores', (req, res) => {
    const xmlFiles = [xmlFilePath, xmlFilePath1]; 
    let stores = [];

    xmlFiles.forEach((file) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                parser.parseString(data, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        stores.push(result);
                        if (stores.length === xmlFiles.length) {
                            res.json(stores);
                        }
                    }
                });
            }
        });
    });
});

app.post('/register', (req, res) => {
    const { email, password, name, surname } = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            parser.parseString(data, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let users = result.users.user;
                    if (!Array.isArray(users)) {
                        users = [users];
                    }
                    users.push({ email: [email], password: [password], name: [name], surname: [surname] });
                    const xml = new xml2js.Builder().buildObject({ users: { user: users } });

                    fs.writeFile(usersFilePath, xml, (err) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({ success: true });
                        }
                    });
                }
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            parser.parseString(data, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let users = result.users.user;
                    if (!Array.isArray(users)) {
                        users = [users];
                    }

                    const user = users.find(user => user.email[0] === email && user.password[0] === password);

                    if (user) {
                        res.json({ success: true, name: user.name[0], surname: user.surname[0] });
                    } else {
                        res.status(401).json({ success: false, message: 'Invalid credentials' });
                    }
                }
            });
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});