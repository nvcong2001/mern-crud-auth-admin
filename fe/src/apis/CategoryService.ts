import type {
  CategoriesResponseDataList,
  CategoryPayload,
  CategoryQuery,
} from "../types/category";
import axiosInstance from "../utils/axiosInstance";

const categoryService = {
  createCategory: (data: CategoryPayload) => {
    return axiosInstance.post("/categories", data);
  },

  getCategories: (params: CategoryQuery) => {
    return axiosInstance
      .get<CategoriesResponseDataList>("/categories", {
        params,
      })
      .then((response) => response.data);
  },

  getCategoryById: (id: string) => {
    return axiosInstance.get(`categories/${id}`);
  },

  updateCategory: (id: string, data: Partial<CategoryPayload>) => {
    return axiosInstance.put(`categories/${id}`, data);
  },

  deleteCategory: (id: string) => {
    return axiosInstance.delete(`categories/${id}`);
  },
};

export default categoryService;
