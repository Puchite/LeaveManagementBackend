const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: "http://localhost:4200"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require('./app/models');
const Role = db.role;
const User = db.user;
const UserData = db.userdata;
const LeaveData = db.leavedata;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/leave.routes')(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

//Mock Data
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    username: "admin",
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 8),
    roles: ["admin"]
  })
  

  UserData.create({
    username: "admin",
    name: "admin",
    leaveQuota: 3,    
  })

  User.create({
    username: "someone",
    name: "someome",
    email: "someone@example.com",
    password: bcrypt.hashSync("someone", 8),
    roles: ["user"],
  })

  UserData.create({
    username: "someone",
    name: "someone",
    leaveQuota: 3,    
  })

  LeaveData.create({
    username: "someone",
    name: "someone",
    leaveDateFrom: "2023/02/10",
    leaveDateTo: "2023/02/11"
  })

  LeaveData.create({
    username: "someone",
    name: "someone",
    leaveDateFrom: "2023/03/1",
    leaveDateTo: "2023/03/5"
  })

  User.create({
    username: "sometwo",
    name: "sometwo",
    email: "sometwp@example.com",
    password: bcrypt.hashSync("sometwo", 8),
    roles: ["user"],
  })

  UserData.create({
    username: "sometwo",
    name: "sometwo",
    leaveQuota: 0,    
  })

  LeaveData.create({
    username: "sometwo",
    name: "sometwo",
    leaveDateFrom: "2023/02/15",
    leaveDateTo: "2023/02/18"
  })

  LeaveData.create({
    username: "sometwo",
    name: "sometwo",
    leaveDateFrom: "2023/03/1",
    leaveDateTo: "2023/03/10"
  })
}


db.sequelize.sync({force: true}).then(() => {
  initial();
});