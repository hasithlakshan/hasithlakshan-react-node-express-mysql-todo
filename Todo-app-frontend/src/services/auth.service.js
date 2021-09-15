import axios from "axios";
class AuthService {
    async login(credentials, headers = {}) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/auth/login",
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                data: credentials,
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong');
        }
    }
}
const authService = new AuthService()
export default authService