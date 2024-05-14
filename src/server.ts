import express from "express"
import {gameRouter} from "../src/game/routes"

const app = express();

app.set('views','./views');
app.set('view engine', 'ejs');
app.use('/index', gameRouter);

app.listen(3000, () => {
        console.log('My app listening on port 3000!');
})