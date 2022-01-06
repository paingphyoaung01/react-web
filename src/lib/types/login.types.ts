export interface service_type {
    "id"?:number,
    "default"?:number,
    "name"?:string
}

export interface contact_data {
    "city_id"?:number,
    "full_address"?:string,
    "city"?:string,
    "township_id"?:number,
    "id"?:number,
    "mobile"?:string,
    "township"?:string,
    "name"?:string,
    "is_credit_term"?:boolean
}

export interface payment_type {
    "id"?:number,
    "code"?:string,
    "default"?:number,
    "name"?:string
}
export interface user_data {
    id?: number,
    name: string
}

export interface loginProps{
    service_type?:Array<service_type>,
    contact_data?:contact_data,
    payment_type?:Array<payment_type>,
    user_data?:user_data
}