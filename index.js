import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const baseURL = "https://v2.jokeapi.dev/joke/";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: null });
})

app.post("/get-joke", async function (req, res) {
    const categ = req.body.categories;
    const lang = req.body.language;
    const joketype = req.body.jokeType;
    const flag=req.body.bFlags;

    try {
        const result = await axios.get(baseURL + `${categ}?format=json&blacklistFlags=${flag}&type=${joketype}&lang=${lang}&amount=1`);
        res.render("index.ejs", { content: result.data });
    } catch (e) {
        res.render("index.ejs", { content: e.response?.data || e.message });
    }
})
// Programming?format=json&blacklistFlags=nsfw&type=single&lang=en&amount=1
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})