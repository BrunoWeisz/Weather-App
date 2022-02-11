import FacadeWeather from './facadeWeather.js';

class Observable{

    constructor(){
        this.observers = [];     
    }
    
    attachObserver(anObserverObject){
        this.observers.push(anObserverObject);
        this.notifyObservers();
    }

    detachObserver(anObserverObject){
        this.observers = this.observers.filter(obs => obs === anObserverObject);
    }

    notifyObservers(){
        this.observers.forEach(observer => observer.changed(this));
    }

};

class WeatherApp extends Observable{

    constructor(){
        super();
        this.currentData = {
            mainWeather: "",
            weatherDescription: "",
            temperature: "",
            humidity: "",
            windSpeed: "",
            state: "no-data",
            
        };
        this.weatherFacade = new FacadeWeather();     
    }

    lookForLocation(aLocationName){
        this.currentData.state = "wait";
        this.notifyObservers();

        this.weatherFacade.async_fetch(aLocationName)
            .then((response)=>{
                this.currentData.state = "data";
                this.processData(response);
            }).catch(error => {
                this.currentData.state = "no-data";
            }).finally(()=>{
                this.notifyObservers();
            });
    }

    processData(weatherData){
        console.log(weatherData);
        this.currentData.mainWeather = weatherData.weather[0].main ?? 'unknown';
        this.currentData.weatherDescription = weatherData.weather[0].description ?? 'unknown';
        this.currentData.temperature = weatherData.main.temp ?? 'unknown';
        this.currentData.humidity = weatherData.main.humidity ?? 'unknown';
        this.currentData.windSpeed = weatherData.wind.speed ?? 'unknown';
    }

    getCurrentData(){
        return this.currentData;
    }
}

export default WeatherApp;

