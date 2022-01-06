
import axios from "axios"
import {
    API_URL, BASE_URL, SMS_URL, LOGIN_URL, DATABASE_NAME, CREATE_PICKUP_URL, PICKUP_LIST_URL,
    MOBILE_CHECKING_URL, REGISTER_URL, QUOTE_URL, FROM_ME_URL, TO_ME_URL, FROM_ME_FILTER_URL, TO_ME_FILTER_URL, GET_CITY_TOWNSHIP_URL,
    GET_NAME_URL, AWB_DELIVERY_CHARGES_URL, CREATE_AWB_URL, ORDER_LIST_URL, SEARCH_URL,
    CHANGE_DELIVERY_INFO_URL, GET_RECORD_COUNT_URL, GET_PROMOTION_IMAGES_URL, EMAIL_CHECKING_URL,
    FORGET_PASSWORD_URL,
    SEND_SMS,
    GET_CUSTOMER_STATEMENT,
    STATEMENT_FILTER,
    GET_CREDIT_NOTES,
    CANCEL_PICKUP,
    CHECK_DUPLICATE_PICKUP,
    DELETE_DRAFT_AWB,
    CALCULATE_DELIVERY_CHARGES_LIST,
    CREATE_DRAFT_AWB_LIST,
    API_TIMEOUT
} from "../config";
import { loginProps } from "../types/login.types";
import { FilterResponse, ToMeList } from "../types/tome.types";
import { useContext } from "react";
import authContext from "../../context/Api.context";
import auth from "../../auth/auth";
import { ExportOrderList, FromMeList, OrdersProps, PickupProps, SearchResponse } from "../types/fromme.types";
import { promotionProps } from "../types/promotion.types";
import { dashboardProps } from "../types/home.types";
import { StatementProps } from "../types/statement.type";
import Axios from "axios";
import { createAwbProps } from "../types/awb.types";
import { CreditNoteProps } from "../types/creaditNote.types";


const API1 = axios.create({
    baseURL: window.location.href.search("localhost") < 0 ? BASE_URL : "http://localhost:3000",
    // baseURL: BASE_URL,
    timeout: API_TIMEOUT,
});

const SMS_API = axios.create({
    baseURL: SMS_URL,
    headers: {
        'Content-Type': 'application/vnd.net.wyrls.Document-v3+json',
        'Authorization': 'Basic dS81NzQvcnRpdW1nOm41UHNLbHYzNEw='
    }
});


API1.interceptors.request.use(config => {
    if (config.url == LOGIN_URL || config.url == EMAIL_CHECKING_URL || config.url == FORGET_PASSWORD_URL) return config
    config.data = { ...auth.getLogin(), ...{ database: DATABASE_NAME }, ...config.data }
    return config
});

API1.interceptors.response.use(res => {
    if (res.config.url == EMAIL_CHECKING_URL) return res
    if (res.data.error) throw new Error("Odoo Server Error")
    if (res.data.result.error) throw new Error(res.data.result.error || "Server error")
    return res
}, error => {
    return Promise.reject(error)
})

export async function login(login: string, password: string): Promise<loginProps> {
    try {
        const response = await API1.post(LOGIN_URL, { login, password, database: DATABASE_NAME })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getCityTownship() {
    try {
        const response = await API1.post(GET_CITY_TOWNSHIP_URL, {})
        return response.data.result
    } catch (error) {
        alert(error)
    }
}

export type createPickUpProps = {
    customer_phone_no: string,
    customer_name: string | number,
    note?: string,
    address: string,
    city_id?: string | number,
    township_id?: string | number,
    time_to_pick: string,
    items?: string | number
}
export async function createPickUp(props: createPickUpProps) {
    try {
        const response = await API1.post(CREATE_PICKUP_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function toMe(page: number): Promise<Array<ToMeList>> {
    try {
        const response = await API1.post(TO_ME_URL, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function toMeFilter(data: any): Promise<FilterResponse> {
    try {
        const response = await API1.post(TO_ME_FILTER_URL, data)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function fromMe(page: number): Promise<Array<FromMeList>> {
    try {
        const response = await API1.post(FROM_ME_URL, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function fromMeFilter(data: any): Promise<SearchResponse> {
    try {
        const response = await API1.post(FROM_ME_FILTER_URL, data)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function orders(page: number): Promise<Array<OrdersProps>> {
    try {
        const response = await API1.post(ORDER_LIST_URL, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getPickUps(page: number): Promise<Array<PickupProps>> {
    try {
        const response = await API1.post(PICKUP_LIST_URL, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function checkRegisterPhone(mobile: string) {

    try {
        const response = await API1.post(MOBILE_CHECKING_URL, { mobile })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function getCustomerStatement(page: number): Promise<Array<StatementProps>> {
    try {
        const response = await API1.post(GET_CUSTOMER_STATEMENT, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function filterStatement(data : any): Promise<Array<StatementProps>> {
    try {
        const response = await API1.post(STATEMENT_FILTER,  data )
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getCreditNotes(page: number): Promise<Array<CreditNoteProps>> {
    try {
        const response = await API1.post(GET_CREDIT_NOTES, { page })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}



export async function checkRegisterEmail(phone: string) {
    try {
        const response = await API1.post(EMAIL_CHECKING_URL, { phone })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function sendVerificationCode(param: { mobile: string, message: string }) {
    try {
        const response = await API1.post(SEND_SMS, param)
        return true
    } catch (error) {
        return false
    }
}



export async function registerUser(props: { mobile: string, email: string, name: string, password: string, city_id: number, township_id: number, full_address: string }) {
    try {
        const response = await API1.post(REGISTER_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export type getDeliveryChargesProps = {
    uid: number,
    service_type_id: number,
    origin_twsp_id: number,
    dest_twsp_id: number,
    weight: number,
}
export async function getDeliveryCharges(props: getDeliveryChargesProps) {
    console.log("TEST getDeliveryCharges ==> " + API1.post(QUOTE_URL, props))
    try {
        const response = await API1.post(QUOTE_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}
export type getOrderDeliveryChargesProps = {
    uid: number | string,
    service_type_id: number | string,
    origin_twsp_id: number | string,
    dest_twsp_id: number | string,
    weight: number,
    service_priority: string,
    goods_type: string,
}
export async function getOrderDeliveryCharges(props: getOrderDeliveryChargesProps) {
    console.log("TEST getOrderDeliveryCharges ==> ", props)
    try {
        const response = await API1.post(AWB_DELIVERY_CHARGES_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getNameByPhone(uid: number, mobile: string) {

    try {
        const response = await API1.post(GET_NAME_URL, { uid, mobile })
        return response.data.result
    } catch (error) {
        return {}
    }
}

export async function searchByName(search_number: string): Promise<FromMeList> {

    try {
        const response = await API1.post(SEARCH_URL, { search_number })
        return response.data.result[0]
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function createOrderAwb(props: createAwbProps) {
    try {
        const response = await API1.post(CREATE_AWB_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}


export type changeDeliveryInfoParam = { awb_id: number, receiver_full_address?: string, new_date?: string | Date }
export async function changeDeliveryInfo(param: changeDeliveryInfoParam) {
    try {
        const response = await API1.post(CHANGE_DELIVERY_INFO_URL, param)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function getPromotionData(): Promise<promotionProps> {
    try {
        const response = await API1.post(GET_PROMOTION_IMAGES_URL)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getRecordCount(): Promise<dashboardProps> {
    try {
        const response = await API1.post(GET_RECORD_COUNT_URL)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function resetPassword(props: { id: number, new_password: string }) {
    try {
        const response = await API1.post(FORGET_PASSWORD_URL, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export type cancelPickupProps = {
    id: number | string,
    reason: number | string,
}
export async function cancelPickup(props: cancelPickupProps) {
    try {
        const response = await API1.post(CANCEL_PICKUP, props)
        return response.data.result
    } catch (error) {
        return error
    }
}


export type checkDuplicatePickupProps = {
    customer_id: number | undefined,
    time_to_pick: string,
}
export async function checkDuplicatePickup(props: checkDuplicatePickupProps) {
    try {
        const response = await API1.post(CHECK_DUPLICATE_PICKUP, props)
        return response.data.result
    } catch (error) {
        return { error: error.message }
    }
}

export type deleteDraftAwbProps = {
    temp_awb_id: number[],
}
export async function deleteDraftAwb(props: deleteDraftAwbProps) {
    try {
        const response = await API1.post(DELETE_DRAFT_AWB, props)
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function getDeliveryChargesList(data: ExportOrderList[]) {
    try {
        const response = await API1.post(CALCULATE_DELIVERY_CHARGES_LIST, { data })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function createDraftAwbList(data: ExportOrderList[]) {
    try {
        const response = await API1.post(CREATE_DRAFT_AWB_LIST, { data })
        return response.data.result
    } catch (error) {
        return Promise.reject(error)
    }
}
