import axiosClient from "../../axiosClient";

export default class UserService {
    getList(params) {
        return axiosClient
            .get("/users", { params })
            .then((res) => res.data);
    }

    getDetail(id) {
        console.log(id);
        return axiosClient
            .get(`/users/${id}`)
            .then((res) => res.data);
    }
    getListWithSearch(params) {
        return axiosClient
            .get("/users/search", { params })
            .then((res) => res.data);
    }
}
