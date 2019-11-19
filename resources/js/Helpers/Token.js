class Token {
    isValid(token){
        const payload = this.payload(token);
        if(payload){
            return payload.iss == "http://localhost:8000/api/auth/login" || "http://localhost:8000/api/auth/signup" ? true : false
        }
        return false;
    }
    payload(token){
        const  payload = token.split('.')[1];  //Get the payload
        // `atob(payload)` This function decode the pay-load
        return this.decodeToken(payload)
    }
    decodeToken(payload){
        if(this.isBase65(payload)){
             return JSON.parse(atob(payload))
        }
        return false;
    }
    isBase65(str){
        try{
            return btoa(atob(str)).replace(/=/g,"") == str
        }
        catch(err){
            return false
        }
    }
}
export default Token = new Token();