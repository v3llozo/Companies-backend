const DB = require("./db");

const Company = {
    create(req, res, next) {
        if (req.body) {
            return DB.Companies.insertMany([req.body]).then((doc) => {
                console.log(`Pushed new Company "${req.body.name}"`);
                return res.send(doc).status(201);
            });
        } else {
            return res.send({ error: "Invalid Company" });
        }
    },
    read(req, res, next) {
        if (req.params.id) {
            let result;
            return DB.Companies.find({ _id: req.params.id }, (err, docs) => {
                if (docs) {
                    result = docs;
                } else {
                    result = { error: "Company not Found" };
                }
                return res.send(result);
            });
        } else {
            return DB.Companies.find({}, (err, docs) => {
                return res.send(docs);
            });
        }
    },
    update(req, res, next) {
        if (req.params.id) {
            let result;
            return DB.Companies.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                null,
                (err, doc) => {
                    result = doc;
                    if (result) {
                        console.log(`Pushed new values to ${req.params.id}`);
                        return res.send(result);
                    } else {
                        return res
                            .status(404)
                            .send({ error: "Company not found" });
                    }
                }
            );
        }
        return res.send({ error: "Not Found" }).status(404);
    },
    remove(req, res, next) {
        if (req.params.id) {
            let result;
            return DB.Companies.findOneAndDelete(
                { _id: req.params.id },
                null,
                (err, doc) => {
                    if (doc) {
                        return res.send({ message: "Deleted" });
                    } else {
                        return res
                            .status(404)
                            .send({ error: "Company not found" });
                    }
                }
            );
        }
        return res.send({ error: "Not Found" }).status(404);
    },
};

module.exports = Company;
