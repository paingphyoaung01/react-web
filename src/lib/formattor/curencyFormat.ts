export function currencyFormat(amount:number|string){
    let cArray = amount.toString().split("");
    let cNumber = parseInt(amount.toString());

    if(cNumber <= 0) return  "0.00"+"  MMK"
    if(cNumber < 1000) return  cNumber+".00"+"  MMK"
    
    let res = ""
    for(let i =1; i <= cArray.length;i++){
        res =cArray[cArray.length - i] + res ;
        if(i % 3 == 0 && i != cArray.length){
            res = "," + res;
        }
    }

    return res + ".00"+"  MMK"
}