export const BASE_URL = 'http://localhost:3000/api/user';

export const userEndpoints = {
    signup: `${BASE_URL}/signup`,
    login: `${BASE_URL}/login`,
    verifyOtp: `${BASE_URL}/verifyOtp`,
    resendOtp: `${BASE_URL}/resendOtp`

}