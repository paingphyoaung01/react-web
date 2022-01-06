export interface promotionProps {
    promo_message:{
        message:string,
        name:string
    },
    slider:{
        img_attachment:[{
            datas:string,
            id:string|number
        }]
    }
}
