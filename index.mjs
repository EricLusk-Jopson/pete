import express from "express";
const app = express();
app.get("/", async (request, response) => {
  response.send("Hello World! This is a very simple app");
});
app.listen(3000, () => {
  console.log("Started application on port %d", 3000);
});
