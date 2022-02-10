import './style.css'
import Controller from './controller';
import WeatherApp from './model.js';
import View from './view.js';
//import FacadeWeather from './facadeWeather.js';

let app = new WeatherApp();
let view = new View();
let controller = new Controller(app);
app.attachObserver(view);
controller.startListeningForEvents();
