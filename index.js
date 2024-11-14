const express = require("express");
const path = require("path");
const User = require('./user');
const Contact = require('./contact');
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', __dirname);
app.use(express.static(__dirname));

app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking && checking.name === req.body.name && checking.password === req.body.password) {
            res.send("User details already exist");
        } else {
            await LogInCollection.create(data);
            res.status(201).render("login", {
                naming: req.body.name
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing signup");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
        } else {
            res.send("Incorrect password or user not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing login");
    }
});

app.post('/enrollment', async (req, res) => {
    const userData = new User(req.body);
    await userData.save();
    res.redirect('/thankyou.html');
});

app.post('/contact', async (req, res) => {
    const userData = new Contact(req.body);
    await userData.save();
    res.redirect('/homepage.html');
});

app.get('/enrollment', (req, res) => {
    res.sendFile(path.join(__dirname, 'enrollmentpage.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
