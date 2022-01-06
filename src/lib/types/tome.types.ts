export interface ToMeList {
    new_date: string
    id: number
    origin_twsp_id: {id: number, name: string}
    dest_twsp_id: {id: number, name: string}
    cash_by_last_mile: number
    pod_remark: string
    remark: string
    recipient_mobile: string
    signature: string
    service_priority: string
    description: string
    service_type_id: {id: number, name: string}
    log: [{
        updated_on: string|Date, 
        id: number, 
        status: string,
        message?:string,
        depot?:string
    }]
    sender_id: {id: number, name: string|boolean}
    receiver_full_address: string
    receiver_mobile: string
    weight: number
    origin_city: [63, "Yangon"]
    recipient_name: string
    delivery_charges: number
    cash_by_first_mile: number
    dest_city: [63, "Yangon"]
    temp_awb_number:string
    current_depot: {id: number, name: string}
    current_status: {id: number, name: string}
    receiver_id: {id: number, name: string}
    cod_amount: number
    recipient_type: [14, "Receiver"]
    payment_type_id: {id: number, name: string}
    goods_type: string
    other_cost: number
    sender_full_address: string|boolean
    sender_mobile: string
    delivered_time: string
    delivered_date: string
    awb_created_date: string
    name: string
}


export interface toMeLogs {
    updated_on: string|Date, 
    id: number, 
    status: string,
    message?:string,
    depot?:string
}

export interface FilterResponse {
    awb_data : ToMeList[],
    status : number,
    total_item : number
}