class CodeVerify{
    private code = Math.floor(Math.random() * 10000)
    private key = 0 
    private phone = "0"
    private status = false
    private email = ""
    private id = 0

    generateVerifyCode(phone:string,email = "",id = 0){

        let code = Math.floor(Math.random() * 10000)
        if(code < 1000) code = code+1000
        this.phone = phone
        this.code = code
        this.key = new Date().getMilliseconds() 
        this.status = false
        this.email = email
        this.id = id
        return this.code
    }

    checkVerifyCode(){
        if(this.phone) return true
        return false
    }

    verify(code:number){
        if(code == this.code) {
            this.status = true
            return true
        }
        return false
    }

    getVerifyPhoneNumber(){
        if(this.status) return this.phone
        return ""
    }

    getVerifyEmail(){
        if(this.status) return this.email
        return ""
    }

    getVerifyId(){
        if(this.status) return this.id
        return 0
    }
}

export default new CodeVerify()