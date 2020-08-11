import config from '../config';

const TokenService = {
  getAuthToken(){
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken(){
    return !!TokenService.getAuthToken();
  },
  saveAuthToken(token){
    return window.localStorage.setItem(config.TOKEN_KEY,token);
  },
  clearAuthToken(){
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  getPayloadFromToken(){
    return window.atob(TokenService.getAuthToken().split('.')[1]);
  },
  getUserName(){
    const payload = this.getPayloadFromToken();    
    return payload.user_name;
  }
}

export default TokenService