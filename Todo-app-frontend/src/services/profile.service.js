import axios from "axios";
class ProfileService {
    async register(credentials, headers = {}) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/profile/register",
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
const profileService = new ProfileService()
export default profileService