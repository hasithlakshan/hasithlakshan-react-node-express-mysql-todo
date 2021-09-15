import axios from "axios";
class ManagementService {
    async getTasks(headers = {}) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/management/task",
                method: "GET",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in get tasks');
        }
    }

    async addTasks(object) {
        try {
            const { data: response } = await axios({
                url:"http://localhost:3000/api/management/task",
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                data: object.task,
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }
    async updateTasks(object) {
        try {
            const { data: response } = await axios({
                url:`http://localhost:3000/api/management/task/${object.taskId}`,
                method: "PUT",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                data: object.task,
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }

    async deleteTasks(object) {
        try {
            console.log(">>>>>>>>>", {
                url:`http://localhost:3000/api/management/task/${object.taskId}`,
                method: "DELETE",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                timeout: 60000
            })
            const { data: response } = await axios({
                url:`http://localhost:3000/api/management/task/${object.taskId}`,
                method: "DELETE",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "token": object.token
                },
                timeout: 60000
            })
            return response
        }
        catch (error) {
            console.log("error", error)
            return new Error('Something wrong in add tasks');
        }
    }
}
const managementService = new ManagementService()
export default managementService