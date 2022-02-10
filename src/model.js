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
        this.currentData = "";
        this.isDataToShow = false;
        this.weatherFacade = new FacadeWeather();     
    }

    lookForLocation(aLocationName){
        this.weatherFacade.async_fetch(aLocationName)
            .then((response)=>{
                this.currentData = this.processData(response);
                this.notifyObservers();
            });
    }

    processData(weatherDataObject){
        console.log(weatherDataObject);
        return `${weatherDataObject.weather[0].main}: ${weatherDataObject.weather[0].description}`;
    }

    getCurrentWeatherData(){
        return this.currentData;
    }

}

export default WeatherApp;

