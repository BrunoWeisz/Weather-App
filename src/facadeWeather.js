class FacadeWeather {

    constructor(){
        this.API_KEY = '9f6387077fd962056cfbe534344a9b1b';
        this.geocodingFacade = new FacadeGeocoding(); 
    }

    async async_fetch(aLocationString = "BuenosAires"){
        aLocationString = aLocationString ?? "BuenosAires";
        let response = await this.geocodingFacade.async_fetch(aLocationString);
        console.log(response);
        let lat = response[0].lat;
        let long = response[0].lon;

        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.API_KEY}`;
        response = await fetch(url, {mode: 'cors'});
        let data = await response.json();
        return data;
    }
}

class FacadeGeocoding{
    constructor(){
        this.API_KEY = '9f6387077fd962056cfbe534344a9b1b';
    }

    async async_fetch(aLocationString = "BuenosAires"){
        aLocationString = aLocationString ?? "BuenosAires";
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${aLocationString}&limit=${1}&appid=${this.API_KEY}`;
        let response = await fetch(url, {mode: 'cors'});
        let data = await response.json();
        return data;
    }
}

export default FacadeWeather;