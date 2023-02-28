const WebSocket = require("ws");
const mongoose = require("mongoose");
const userModel = require("./models");

const wss = new WebSocket.Server({ port: 3000 });

mongoose.connect(
  "mongodb://192.168.2.4:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var stocks = [
  {
    name: "Adani",
    price: 200,
    high: 205,
    low: 198,
  },
  {
    name: "SBI",
    price: 450,
    high: 460,
    low: 440,
  },
  {
    name: "BSNL",
    price: 350,
    high: 355,
    low: 300,
  },
  {
    name: "Paytm",
    price: 1100,
    high: 1250,
    low: 1000,
  },
];

wss.on("connection", async function connection(ws) {
  ws.send("connected to server, welcome client");

  ws.on("message", function incoming(msg) {
    console.log("Recieved: %s", message);
  });

  const db = mongoose.connection;
  const user = new userModel({"name" : "Rohit", "age" : 21});
  
    try {
      await user.save();
      //response.send(user);
    } catch (error) {
      //response.status(500).send(error);
    }
});

function sendRandomData() {
  let randomNumber1 = Math.floor(Math.random() * 100);
  let randomNumber2 = Math.floor(Math.random() * 100);
  let randomNumber3 = Math.floor(Math.random() * 100);
  let randomNumber4 = Math.floor(Math.random() * 100);

  stocks[0]["price"] = randomNumber1;
  stocks[1]["price"] = randomNumber2;
  stocks[2]["price"] = randomNumber3;
  stocks[3]["price"] = randomNumber4;

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(stocks));
    }
  });
}

setInterval(sendRandomData, 2000);
