export class loginModel{
    constructor(){
        this.code = ""
        this.message = ""
        this.data = {
            name:"",
            email:"",
            id:0,
            phone:"" 
        }
    }
}   


export class toMeModel{
    constructor(){
        this.code = ""
        this.message = ""
        this.data = [{
            title:"",
            from:"",
            branch:"",
            paid_amount:0,
            arrival:"",
            id:0
        }]
    }
}

export class notificationModel{
    constructor(){
        this.code = ""
        this.message = ""
        this.data = [{
            date:"",
            code:"",
            amount:"",
            id:0
        }]
    }
}

export class PickUpModel{
    constructor(){
        this.result = [{
            customer_name:{
                id:0,
                name:""
            },
            id:0,
            time_to_pick:"",
            cancel_reasons:"",
            state:"",
            name:"",
            create_uid:[],
            note:"",
            items:0,
            address: "",
            township_id: {
                id:0,
                name:""
            },
            city_id: {
                id:0,
                name:""
            },
            customer_phone_no: "",
        }]
    }
}

export class MobileCheckingModel {
    constructor(){
        this.result = {
            mobile_checking: false
        }    
    }
}