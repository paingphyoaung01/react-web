import * as Bowser from "bowser";
import * as CryptoJS from 'crypto-js'
import { loginProps } from "../lib/types/login.types";
import { AuthContext } from "../context/Api.context";
import { getCityByName,getTownshipByTownshipId } from "../lib/storage/CityAndTownship";
import key from './key.json';

class Auth{
    private authenticate = false
    private username = ""
    private password = ""
    private authKey = "@auth"
    private versionKey = "@version"

    constructor(){
        this.authenticate = false
        this.versionChecker()
    }

    private versionChecker = () => {
        if(process.env.NODE_ENV == "development") return
        const keyStoreVersion = localStorage.getItem(this.versionKey)
        if(!keyStoreVersion){
            localStorage.clear()
            localStorage.setItem(this.versionKey,key.version)
        }
        const currentVersion = key.version
        if(keyStoreVersion != currentVersion){
            localStorage.clear()
            localStorage.setItem(this.versionKey,key.version)
        }
    }

    private generateAuthkey = () =>{
        const browserInfo = Bowser.parse(window.navigator.userAgent)
        
        let key:any = `
                        ${ browserInfo.browser.name} 
                        ${browserInfo.os.name} 
                        ${browserInfo.os.version}
                        ${browserInfo.engine.name}
                        ${browserInfo.platform.type}
                        ${String(browserInfo.browser.version).split(".")[0]}
                    `
        return key
    }


    login = async (userData:any,cb:Function) =>{
        const text = JSON.stringify(userData)
        const result = CryptoJS.AES.encrypt(text,this.generateAuthkey()) || ""
        
        localStorage.setItem(this.authKey,String(result))
        this.authenticate = true
        cb(this.authenticate)
    }

    logout = (cb:Function) =>{
        localStorage.removeItem(this.authKey)
        this.authenticate = false
        cb(this.authenticate)
    }

    isAuthenticate = () => {
        const encodeData = localStorage.getItem(this.authKey)||""
        if(!encodeData) {
            this.authenticate = false
            return this.authenticate
        }
        const result = CryptoJS.AES.decrypt(encodeData,this.generateAuthkey()).toString(CryptoJS.enc.Utf8)
        if (result) this.authenticate = true
        if (!result) this.authenticate = false
        return this.authenticate
    }

    getUserData = ():AuthContext|any =>{
        const encodeData = localStorage.getItem(this.authKey)||""
        if(!encodeData) return {}
        const result = CryptoJS.AES.decrypt(encodeData,this.generateAuthkey()).toString(CryptoJS.enc.Utf8)
        if(!result) return  {}
        const data:AuthContext = JSON.parse(result)
        this.username = data.login
        this.password = data.password

        return data
    }

    getLogin = () =>{
        return {
            login: this.username,
            password: this.password
        }
    }


    private decrypt = ():AuthContext =>{
        const encodeData = localStorage.getItem(this.authKey)||""
        if(!encodeData) return {}
        const result = CryptoJS.AES.decrypt(encodeData,this.generateAuthkey()).toString(CryptoJS.enc.Utf8)
        if(!result) return  {}
        const data:AuthContext = JSON.parse(result)
        return data
    }


    getUserCityObj = () =>{
        const data:AuthContext = this.decrypt()
        if(data.contact_data){
            return getCityByName(data.contact_data.city)
        }
    }

    getUserTownshipObj = () =>{
        const data:AuthContext = this.decrypt()
        if(data.contact_data){
            return getTownshipByTownshipId(data.contact_data.township_id)
        }
    }

    getServiceTypes = () =>{
        const data:AuthContext = this.decrypt()
        if(data.service_type){
            return data.service_type
        }
    }

    getPaymentTypes = () =>{
        const data:AuthContext = this.decrypt()
        if(data.payment_type){
            return data.payment_type
        }
    }

    isCreditTermCustomer = () =>{
        const data:AuthContext = this.decrypt()
        if(data.contact_data){
            return data.contact_data.is_credit_term
        }
    }
}


export default new Auth()