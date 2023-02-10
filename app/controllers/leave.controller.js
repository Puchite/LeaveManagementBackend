const db = require("../models");
const config = require("../config/auth.config");
const UserData = db.userdata;
const LeaveData = db.leavedata;


exports.leave = (req, res) => {

    UserData.findOne({
            where: {
                username: req.body.username,
            }

        }).then(userData => {

            if (userData) {
                if (userData.leaveQuota > 0) {

                    LeaveData.create({
                        username: req.body.username,
                        name: req.body.name,
                        leaveDateFrom: req.body.leaveDateFrom,
                        leaveDateTo: req.body.leaveDateTo

                    }).then(() => {
                        UserData.increment({
                            leaveQuota: -1
                        }, {
                            where: {
                                username: req.body.username,
                            }
                        }).then(data => {
                            console.log(data);
                            return res.send({
                                message: "successfully!"
                            });
                        })
                    })

                } else {
                    return res.send({
                        message: "Quata Limit"
                    });
                }
            } else {
                return res.send({
                    message: "user not found"
                });
            }

        })

        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.leaveData = (req, res) => {
    LeaveData.findAll({
            raw: true
        })
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.leaveQuota = (req, res) => {
    UserData.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then(data => {
            if(data)
            {
                return res.status(200).send(data);
            }
            else
            {
                return res.send({
                    message: "User not found"
                });
            }
        })
}