const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = 4000;
const config = require('./config/config.json');
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src", "assets")));

hbs.registerPartials(path.join(__dirname, "src", "views", "partials"));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/users', async (req, res) => {
    try {
        const query = `SELECT * FROM collections_tb`;
        const result = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        // res.render("users", { data: result })
        res.json({ result })
    } catch (error) {
        res.json({message: "gagal"})
    }
});

app.get('/collections', async (req, res) => {
    try {
        const query = `SELECT collections_tb.*, task_tb.is_done FROM collections_tb JOIN task_tb ON  collections_tb.id = task_tb.collections_id;`;
        const result = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        res.render("collections", { data: result })
    } catch (error) {
        res.json({message: "gagal", error})
    }
})




app.listen(port, () => console.log(`Running on port: ${port}`));