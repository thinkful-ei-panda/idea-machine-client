import config from '../config'

const TokenService = {
  getAuthToken(){
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  hasAuthToken(){
    return !!TokenService.getAuthToken()
  },
  saveAuthToken(token){
    return window.localStorage.setItem(config.TOKEN_KEY,token)
  }
}

export default TokenService