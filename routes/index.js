const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
let items = [];
let item = '';

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/todolist', ensureAuthenticated, (req, res) => {
    let today = new Date();
    let currentDay = today.getDay();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day =  today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, items: items});
});

router.post('/todolist', (req, res) => {
    const data = req.body;
    item = data.itemName;
    items.push(item);
    res.redirect('/todolist');
})

module.exports = router;