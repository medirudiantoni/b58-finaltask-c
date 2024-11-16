const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = 4000;
const config = require('./config/config.json');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const { Sequelize, QueryTypes } = require("sequelize");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const session = require('express-session');

const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src", "assets")));
app.use(
    session({
      name: "my-session",
      secret: "korewakaizokuogininaruatokoda",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
app.use(flash());
app.use((req, res, next) => {
    res.locals.session = {
      user: req.session.user,
    };
    next();
  });

hbs.registerPartials(path.join(__dirname, "src", "views", "partials"));


app.get('/', async (req, res) => {
    console.log(req.session.user);
    try {
        const result = await prisma.collections_tb.findMany({
            where: { user_id: req.session.user.id },
            include: {
                task_tb: true,
                _count: true
            }
        })
        res.render("collections", { data: result })
    } catch (error) {
        res.render("index");
    }
});
app.get('/register', (req, res) => {
    res.render('register')
});
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const isEmail = await prisma.users_tb.findUnique({
            where: { email }
        });
        if(isEmail){
            req.flash('error', 'Email already exist');
            return res.redirect('/register')
        }
        await prisma.users_tb.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        req.flash('success', 'Register success');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'Unable to register right now')
        res.redirect('register');
    }
});
app.get('/login', (req, res) => {
    res.render('login')
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const theUser = await prisma.users_tb.findUnique({
            where: { email }
        });
        if(!theUser){
            req.flash('error', 'Incorrect email or password');
            return res.redirect('/login');
        }
        const isValidPassword = bcrypt.compare(password, theUser.password);
        if(!isValidPassword){
            req.flash('error', 'Incorrect email or password');
            return res.redirect('/login');
        }

        req.flash('success', 'Login success');
        console.log(theUser)
        req.session.user = theUser;
        res.redirect('/')
    } catch (error) {
        req.flash('error', 'Server error');
        res.redirect('/login')
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('info', 'Logout success');
        res.redirect('/');
    })
});
app.get('/users', async (req, res) => {
    try {
        const result = await prisma.users_tb.findMany()
        // res.render("users", { data: result })
        res.json({ result });
    } catch (error) {
        res.json({message: "gagal"})
    }
});




app.listen(port, () => console.log(`Running on port: ${port}`));