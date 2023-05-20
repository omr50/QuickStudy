import axios from "axios"
export const apiClient = axios.create(
    {
        baseURL: "http://localhost:5000"
        // the other one if for the aws app
        // baseURL: "http://quickstudy.us-east-2.elasticbeanstalk.com"
    }
)