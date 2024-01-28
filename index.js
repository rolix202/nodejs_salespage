import express from "express";
const app = express()
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config()
import path from "path"
import { fileURLToPath } from "url";
import { dirname } from "path";
import { renderFile } from "ejs";
import messageRoute from './routes/messageRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + "/public/"));

app.engine('ejs', renderFile);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


const port = process.env.PORT;

app.get('/', (req, res) => {
    res.render('homepage/includes.ejs')
})
app.get('/contact', (req, res) => {
    res.render('contact/includes.ejs')
})
app.get('/about', (req, res) => {
    res.render('about/includes.ejs')
})
app.get('/investment', (req, res) => {
    res.render('investment/includes.ejs')
})


app.post('/', messageRoute)


app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
})
