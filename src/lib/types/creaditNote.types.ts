interface vendorBillProps{
    "awb_id": string,
    "number": string,
    "date_invoice": string,
    "user_id": string,
    "date_due": string,
    "cod": number,
    "other_cost": number,
    "delivery_charges": number,
    "amount_total_signed": number,
    "residual_signed": number,
    "state": string,
    "amount_topay": number
}

export interface CreditNoteProps{
    "attachments": any[],
    "name": string,
    "create_date": string,
    "total_amount_topay": number,
    "vendor_bill_list":Array<vendorBillProps>
}

