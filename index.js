const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Company = require("./companies");
const Authorization = require("./auth");

const app = express();
const port = 3333;
const httpOptions = {
    origin: "*",
};

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send();
});

// Auth
app.post("/login", cors(httpOptions), Authorization.login);

// Companies - CRUD
app.post("/companies", cors(httpOptions), Authorization.isAuth, Company.create);
app.get(
    "/companies/:id?",
    cors(httpOptions),
    Authorization.isAuth,
    Company.read
);
app.put(
    "/companies/:id?",
    cors(httpOptions),
    Authorization.isAuth,
    Company.update
);
app.delete(
    "/companies/:id?",
    cors(httpOptions),
    Authorization.isAuth,
    Company.remove
);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
