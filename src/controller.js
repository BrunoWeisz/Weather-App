class Controller {

    constructor(aWeatherApp,aView){
        this.app = aWeatherApp; 
        this.view = aView;
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