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
                id: Number,
                login: String,
                password: String,
                email: String,
                token: String
            }
        );
        models.tasks = db.define("tasks",
            {
                id: Number,
                title: String,
                description: String,
                result: String
            }
        );
        models.results = db.define("results",
            {
                id: Number,
                users_id: Number,
                tasks_id: Number,
                result: String,
                userCode: String,
                dateTime: Date
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

app.post("/auth/check", (req, res) =>
    req.models.users.count(req.body, (err, count) => {
        if (count === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    })
)

app.post("/tasks/get", (req, res) => {

        let listTask = [];
        let listResult = [];
        let concatResults = [];
        let users_id = [];

        let token = req.body.token;
        if (!token) {
            res.sendStatus(401);
            return;
        }

        req.models.users
            .find({token})
            .each()
            .get(item => users_id = item)
            .save(
                (err) => {
                    if (Array.isArray(users_id) && users_id.length === 1) {
                        req.models.tasks
                            .find({})
                            .each()
                            .get(item => listTask = item)
                            .save(
                                (err) => {
                                    req.models.results
                                        .find({users_id: users_id[0].id})
                                        .each()
                                        .get(item => listResult = item)
                                        .save(
                                            (err) => {
                                                let concatResults = [];
                                                listTask.forEach(item => concatResults.push(Object.assign({}, item)));
                                                concatResults.map(
                                                    item => {

                                                        let result_tmp = item.result;
                                                        delete item.result;

                                                        let taskUser = listResult.filter(item1 => item1.tasks_id === item.id);
                                                        if (taskUser.length === 1) {
                                                            taskUser = taskUser[0];

                                                            taskUser.id_tmp = item.id;

                                                            Object.assign(item, taskUser);
                                                        }

                                                        delete item.tasks_id;
                                                        delete item.users_id;

                                                        item.succ = taskUser.result == result_tmp;

                                                        return item;
                                                    }
                                                )
                                                    .map(
                                                    item => {
                                                        item.id = item.id_tmp ? item.id_tmp : item.id;
                                                        delete item.id_tmp;
                                                        return item;
                                                    }
                                                )

                                                res.send(concatResults);
                                            }
                                        )
                                }
                            )
                    } else {
                        res.sendStatus(401);
                        return;
                    }
                }
            )

    }
)

app.post("/tasks/set", (req, res) => {

    let token = req.body.token;
    let task = req.body.task;
    if (!token) {
        res.sendStatus(401);
        return;
    }
    if (!task) {
        res.sendStatus(500);
        return;
    }

    let users_id = [];

    req.models.users
        .find({token})
        .each()
        .get(item => users_id = item)
        .save(
            (err) => {
                if (Array.isArray(users_id) && users_id.length === 1) {
                    req.models.results.count({users_id: users_id[0].id, tasks_id: task.id}, (err, count) => {
                        if (count === 0) {
                            req.models.results.create({users_id: users_id[0].id, tasks_id: task.id, result: task.result}, (d) => {});
                            res.sendStatus(200);
                        } else {
                            req.models.results.find({users_id: users_id[0].id, tasks_id: task.id})
                                .each((r) => {
                                    r.result = task.result;
                                })
                                .save((err) => {
                                    res.sendStatus(200);
                                });
                        }
                    })
                } else {
                    res.sendStatus(401);
                    return;
                }
            }
        )
    }
)
