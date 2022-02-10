class Observer {
    changed(){
        console.log("Algo ha cambiado.");
    }
}

class View extends Observer{

    constructor(){
        super();
        this.paragraphElement = document.querySelector("#information");
    }

    getDataFromModel(model){
        return model.getCurrentWeatherData();
    }

    changed(model){
        let jsonWeatherData = this.getDataFromModel(model);
        this.paragraphElement.textContent = jsonWeatherData;
    }
}

export default View;