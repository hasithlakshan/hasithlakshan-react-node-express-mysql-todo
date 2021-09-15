import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const tokenHandler = () => {
    const token = Cookies.get("auth")
    const decoded = token ? jwt_decode(token) : null
    return decoded
}
export default tokenHandler