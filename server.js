const express = require("express");

const app = express();

app.get('/', (req, res) => {
	res.send("hello world");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log("The server has started");
})