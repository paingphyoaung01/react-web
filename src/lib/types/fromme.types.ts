export interface FromMeList {
    new_date: string,
    id: number,
    origin_twsp_id: { id: number, name: string },
    dest_twsp_id: { id: number, name: string },
    cash_by_last_mile: number,
    pod_remark: string,
    remark: string,
    recipient_mobile: string,
    signature: string,
    service_priority: string,
    description: string,
    service_type_id: { id: 3, name: string },
    log?: [{
        updated_on: string,
        id: number,
        status: string,
        message: string,
        depot: string,
    }]
    sender_id: { id: 95831, name: string }
    receiver_full_address: string
    receiver_mobile: string
    weight: 1
    origin_city: [63, string]
    recipient_name: string
    delivery_charges: number
    cash_by_first_mile: number
    dest_city: [63, string]
    temp_awb_number: string
    current_depot: { id: number, name: string }
    current_status: { id: number, name: string }
    receiver_id: { id: number, name: string }
    cod_amount: number
    recipient_type: { id: number, name: string }
    payment_type_id: { id: number, name: string }
    goods_type: string
    other_cost: number
    sender_full_address: string
    sender_mobile: string
    delivered_time: string
    delivered_date: string
    awb_created_date: string
    name: string,
    senderFullAddress?: string,
    receiverFullAddress?: string,
    receiver_name?: string,
    last_mile_pic_id?: [string, string, string]
}

export interface logs {
    updated_on: string,
    id: number,
    status: string,
    message: string,
    depot: string,
}


export interface OrdersProps {
    id: 62
    origin_twsp_id: { id: 2232, name: string }
    dest_twsp_id: { id: 2203, name: string }
    receiver_mobile: string,
    remark: string,
    receiver_name: string,
    service_priority: string,
    description: string,
    service_type_id: { id: 3, name: string }
    sender_id: { id: 95831, name: string }
    sender_mobile: string,
    create_uid: { id: 699, name: string }
    weight: 1
    delivery_charges: 2000
    customer_reference: string,
    dest_city: { id: 63, name: string }
    state: string,
    write_date: string,
    receiver_id: 0
    write_uid: { id: 699, name: string }
    cod_amount: 2000
    origin_city: { id: 63, name: string }
    goods_type: string,
    create_date: string,
    display_name: string,
    payment_type_id: { id: 5, name: string }
    name: string,
    current_status?: null,
    receiver_full_address?: string,
    sender_full_address?: string,
    courier?: [],
    selected: boolean,
}

export interface PickupProps {
    website_message_ids: [],
    activity_ids: [],
    activity_date_deadline: string | boolean,
    message_needaction_counter: number,
    note: string,
    portal_url: string,
    activity_state: string | boolean,
    address: string,
    __last_update: string,
    message_last_post: string | boolean,
    cancel_reasons: string | boolean,
    create_uid: [number, string],
    message_channel_ids: [],
    message_unread_counter: number,
    customer_name: { id: number, name: string, },
    message_ids: [],
    pickup_confirm: boolean,
    city_id: { id: number, name: string, },
    state: string,
    message_is_follower: string | boolean,
    write_date: string,
    source: string,
    booking_created_date: string,
    display_name: string,
    id: number,
    activity_user_id: string | boolean,
    customer_phone_no: string,
    message_unread: string | boolean,
    message_partner_ids: [],
    create_date: string,
    message_follower_ids: [],
    write_uid: [1, string],
    activity_type_id: string | boolean,
    items: string,
    message_needaction: string | boolean,
    activity_summary: string | boolean,
    township_id: { id: number, name: string, },
    time_to_pick: string,
    name: string,
    courier: [1, string, string]
}


export interface ExportOrderList {
    new_date: string,
    id: number,
    origin_twsp_id: { id: number, name: string },
    dest_twsp_id: { id: number, name: string },
    cash_by_last_mile: number,
    pod_remark: string,
    remark: string,
    recipient_mobile: string,
    signature: string,
    service_priority: string,
    description: string,
    service_type_id: { id: 0, name: string },
    sender_id: { id: 0, name: string, mobile: string }
    receiver_full_address: string
    receiver_mobile: string
    weight: 0
    origin_city: { id: 0, name: string }
    recipient_name: string
    delivery_charges: number
    cash_by_first_mile: number
    dest_city: { id: 0, name: string }
    temp_awb_number: string
    current_depot: { id: number, name: string }
    current_status: { id: number, name: string }
    receiver_id: { id: number, name: string }
    cod_amount: number
    recipient_type: { id: 0, name: string }
    payment_type_id: { id: 0, name: string }
    goods_type: string
    other_cost: number
    sender_full_address: string
    sender_mobile: string
    delivered_time: string
    awb_created_date: string
    name: string,
    senderFullAddress?: string,
    receiverFullAddress?: string,
    receiver_name?: string,
    valid?: string,
}

// export interface SearchResponse {
//     result: FromMeList[],
//     status: number,
//     links: {
//         self: {
//             url: string
//         },
//         item_per_page: number,
//         item_count: number,
//         page_count: number
//     }
// }

export interface SearchResponse {
    awb_data : FromMeList[],
    status : number,
    total_item : number
}