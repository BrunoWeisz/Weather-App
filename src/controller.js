import WeatherApp from "./model.js";
import View from "./view.js";

class Controller {

    constructor(aWeatherApp){
        this.app = aWeatherApp; 
        this.textareaElement = document.querySelector("#write-region");
        this.button = document.querySelector("button");
    }

    startListeningForEvents(){
        this.button.addEventListener("click", this.buttonPressed.bind(this));
    }

    buttonPressed(){
        let aLocation = this.textareaElement.value;
        console.log(`Looking for: ${aLocation}`);
        this.app.lookForLocation(aLocation);
    }
}

export default Controller;