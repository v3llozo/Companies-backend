const Companies = require("./db");

const user = {
    uuid: "0001",
    username: "root",
    password: "root",
};
const authToken = "0000000000000001";

const Authorization = {
    login(req, res, next) {
        if (req.body) {
            if (auth(req.body)) {
                res.status(200);
                return res.send({
                    user: {
                        uuid: user.uuid,
                        username: user.username,
                    },
                    token: "0000000000000001",
                });
            }
        }
        res.status(401);
        return res.send({
            error: "Invalid Login",
        });
    },
    isAuth(req, res, next) {
        let token = req.headers.authorization;
        if (token) {
            if (authToken == token) {
                return next();
            } else {
                return res.status(403).send({ error: "Unauthorized" });
            }
        } else {
            return res.status(401).send({ error: "Unauthenticated" });
        }
    },
};

function auth(body) {
    return body.username == user.username && body.password == user.password
        ? true
        : false;
}
module.exports = Authorization;
