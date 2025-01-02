import base from './url-base'

const URL = {
  LOGIN: `${base.API}/login`,
  LOGOUT: `${base.API}/logout`,
  FORGET_PASSWORD: `${base.API}/forget-password`,
  RESET_PASSWORD: `${base.API}/reset-password`,
  REFRESH_TOKEN: `${base.API}/refresh-token`,
  MY_PROFILE: `${base.API}/my-profile`,
  GET_PROFIL_REQUIREMENTS: `${base.API}/my-profile/requirements`,
}

export default URL
