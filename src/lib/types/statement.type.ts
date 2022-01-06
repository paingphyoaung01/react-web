interface vendorBill {
    amount_total: number
    awb_created_date: string
    awb_id:string
    number: string
    receiver_id: string
    receiver_mobile: string
    receiver_township: string
    residual_signed: number
    state: string
} 

interface vendor_bill_creditnote{
    awb_id: string,
    number: string,
    date_invoice: string,
    receiver_id: string,
    receiver_mobile: string,
    receiver_township: string,
    cod: number,
    other_cost: number,
    delivery_charges: number,
    amount_total_signed: number,
    residual_signed: number,
    state: string,
    amount_topay: string
}


export interface StatementProps{
    awb_credit_note: [{awb_id: string, amount_total: number}],
    service_charges: number,
    batch_state: string,
    commission: number,
    attachments:Array<{datas:string,type:string}>,
    name:string,
    create_date:string,
    vendor_bill_list:Array<vendorBill>,
    vd_cn_batch_id:string,
    credit_note_batch_total:string,
    vendor_bill_credit_note_batch_total:number,
    vendor_bill_credit_note_list:Array<vendor_bill_creditnote>,
    net_total: string,
    payment_date: string
}
