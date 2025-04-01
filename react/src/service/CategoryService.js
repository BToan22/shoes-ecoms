import axiosClient from "../../axiosClient";

export default class CategoryService {
    getCategories() {
        return axiosClient
            .get("/categories")
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching categories:", error);
                throw error;
            });
    }

    getFavoriteCategories() {
        return axiosClient
            .get("/favorite-categories")
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching favorite categories:", error);
                throw error;
            });
    }

    saveFavoriteCategories(categoryIds) {
        return axiosClient
            .post("/favorite-categories", { category_ids: categoryIds })
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error saving favorite categories:", error);
                throw error;
            });
    }

    createCategory(categoryData) {
        return axiosClient
            .post("/categories", categoryData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error creating category:", error);
                throw error;
            });
    }

    updateCategory(id, categoryData) {
        return axiosClient
            .put(`/categories/${id}`, categoryData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error updating category:", error);
                throw error;
            });
    }

    deleteCategory(id) {
        return axiosClient
            .delete(`/categories/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error deleting category:", error);
                throw error;
            });
    }
}
