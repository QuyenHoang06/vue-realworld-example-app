import ApiService from './api.service'
import JWTService from './jwt.service'

export default {
  jwt: new JWTService(),
  backend: new ApiService()
}
