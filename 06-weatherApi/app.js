
import express,{urlencoded} from "express";
import axios from "axios";
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weather = {
  city: response.data.name,
  country: response.data.sys.country,
  temp: response.data.main.temp,
  temp_min: response.data.main.temp_min,
  temp_max: response.data.main.temp_max,
  pressure: response.data.main.pressure,
  humidity: response.data.main.humidity,
  wind_speed: response.data.wind.speed,
  clouds: response.data.clouds.all,
  
  description: response.data.weather[0].description,
  icon: response.data.weather[0].icon,
};


    res.render("index", { weather, error: null });
  }catch (err) {
    res.render("index", { weather: null, error: "City not found!" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
});


