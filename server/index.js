require("dotenv").config();
import express from "express";
import mainRoutes from "./routes/main";
import dailyRoutes from "./routes/daily";
import daily from "./controller/daily";

const PORT = process.env.PORT || 7777;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/manna", mainRoutes);
app.use("/manna/public", express.static("public"));
app.use("/manna/daily", dailyRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  daily.setVerse();
  daily.setImage();
  watch();
});

function watch() {
  // update image and verse every 12 hours
  setTimeout(function() {
    daily.setVerse();
    daily.setImage();
    watch();
  }, 3600000 * 12);
}
