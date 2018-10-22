const express = require('express');
const orm = require('orm');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(orm.express("mysql://y913929d_orm2:123456@y913929d.beget.tech/y913929d_orm2", {
    define: function (db, models, next) {
        models.users = db.define("users",
            {
                login: String,
                password: String,
                email: String
            }
        );
        next();
    }
}));
app.listen(8000);


const genToken = (n = 100) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

app.post("/auth/reg", (req, res) =>
    req.models.users.count({login: req.body.login}, (err, count) => {
        if (count === 0) {
            req.models.users.create(req.body, (d) => res.sendStatus(200))
        } else {
            res.sendStatus(401);
        }
    })
)

app.post("/auth/auth", (req, res) =>
    req.models.users.count(req.body, (err, count) => {
        if (count === 1) {
            let token = genToken();
            req.models.users.find(req.body)
                .each((user) => {
                    user.token = token;
                })
                .save((err) => {
                    res.send(token);
                });
        } else {
            res.sendStatus(401);
        }
    })
)