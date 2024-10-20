const express = require("express");
const app = express();
const connectDB = require("./database");
const port = 8000;

connectDB();
app.use(express.json());

const pageRoutes = require("./routers/pageRoutes");
const eventRoutes = require("./routers/eventRoutes");



app.use("/api", pageRoutes);
app.use("/api", eventRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
