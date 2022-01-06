import { cityProps, townshipProps } from "../storage/CityAndTownship";

export interface ChipObject { 
    key : string, 
    value : string
}

export interface FilterToMeObject {
    "date_from": string,
    "date_to": string,
    "sender_name": string,
    "sender_phone": string,
    "awb_no": string,
    "city_id":  number | string,
    "city": cityProps,
    "township_id": number | string,
    "township": townshipProps,
    "sender": boolean,
    "status": boolean,
    "cod": boolean,
    "delivered": boolean,
    "paid": boolean,
}

export interface FilterFromMeObject {
    "date_from": string,
    "date_to": string,
    "receiver_name": string,
    "receiver_phone": string,
    "awb_no": string,
    "city_id":  number | string,
    "city": cityProps,
    "township_id": number | string,
    "township": townshipProps,
    "receiver": boolean,
    "status": boolean,
    "cod": boolean,
    "delivered": boolean,
    "received": boolean,
}
