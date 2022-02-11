class Observer {
    changed(){
        console.log("Algo ha cambiado.");
    }
}

class View extends Observer{

    constructor(){
        super();
        this.displayElement = document.querySelector(".display");
        this.currentData = {};
    }

    getDataFromModel(model){
        this.currentData = model.getCurrentData();
    }

    changed(model){
        this.getDataFromModel(model);
        this.deleteVisibleData();
        if (this.currentData.state == "data"){
            this.displayUserData();
        } else if (this.currentData.state == "wait") {
            this.showMessageToUser("Looking for the requested data");
        } else {
            this.showMessageToUser("No data aviable");
        }
    }

    showMessageToUser(aMessage){
        let newP = document.createElement("p");
        newP.textContent = aMessage;
        this.displayElement.appendChild(newP); 
    }

    displayUserData(){
        Object.entries(this.currentData).forEach(([key,value]) => {
            if (key == "state") return;
            let newP = document.createElement("p");
            newP.textContent = `${key}: ${value}`;
            console.log(this.displayElement);
            this.displayElement.appendChild(newP);
        })
    }

    deleteVisibleData(){
        Array.from(this.displayElement.children).forEach(el => {
            el.parentElement.removeChild(el);
        })
    }
}

export default View;