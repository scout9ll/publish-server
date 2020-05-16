const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const buildApi = require("./router");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
// const childProcess = require('child_process')
const socket = require("socket.io");
// init
const app = express();
const server = http.createServer(app);
const io = socket.listen(server,{
  path:'/xiaoan/ws'
});
const htmlPath = path.join(__dirname, "/static/xiaoan/index.html");
const index = fs.readFileSync(htmlPath, "utf8");
app.use(function (req, res, next) {
  res.io = io;
  next();
});
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// api root
app.use("/xiaoan/api", buildApi);

io.on("connection", function () {
  console.log("a user connected");
});

// host page
app.get("/xiaoan", (req, res) => {
  // io.sockets.emit('foo', req.body)
  res.send(index);
});

// setInterval(() => {
//   // const commitId = childProcess.execSync('git rev-parse --verify HEAD').toString().trim()
//   const currentBranch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
//   // const commitTime = childProcess.execSync(`git log --pretty=format:“%cd” ${commitId} -1`).toString()
//   io.sockets.emit('currentBranch', currentBranch)
// }, 1000)
server.listen(8795, () => {
  console.log(
    `App running at: `,
    chalk.blue.underline("http://localhost:8795/xiaoan/index.html")
  );
});
