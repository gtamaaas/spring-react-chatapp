import axios from "axios";

export const Auth = {
    loginCredentials: {username: null, password: null},
    isAuthenticated: false,
    async login(loginCredentials) {
        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                loginCredentials,
                { withCredentials: true }
              );
              Auth.loginCredentials = loginCredentials;
              Auth.isAuthenticated = true;
        }
        catch (error) {
           throw(error)
        }
    }
}