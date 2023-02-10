const controller = require("../controllers/leave.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/leave", controller.leave);
  app.get("/api/leaveData", controller.leaveData);
  app.post("/api/leaveQuota", controller.leaveQuota);
};