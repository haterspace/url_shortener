const express = require("express");
const morgan = require("morgan");
const { Url } = require("./db/models");
const { generateShortUrl, urlValidation } = require("./middlewares");

const app = express();
const PORT = 3000;

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Устанавливаем Content-Type с указанием кодировки
//   next();
// });
app.use(express.json());
app.use(express.static("views"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const shortUrls = await Url.findAll();
    res.render("view", { shortUrls });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.post("/shortUrls", async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!urlValidation(longUrl)) {
      return res.status(400).render("view", { error: "Некорректный URL" });
    }
    const shortUrl = generateShortUrl();
    await Url.create({ longUrl, shortUrl });
    res.redirect("/");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).render("view", { error: "Internal Server Error" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const requestedShortUrl = `${req.params.shortUrl}`;
    const shortUrl = await Url.findOne({
      where: { shortUrl: requestedShortUrl },
    });
    if (shortUrl == null) {
      return res.sendStatus(404);
    }
    res.redirect(shortUrl.longUrl);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

module.exports = app;
