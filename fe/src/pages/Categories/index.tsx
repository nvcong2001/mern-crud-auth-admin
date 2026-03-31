import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import AppFilters, {
  type FilterConfig,
} from "../../components/common/AppFilters";
import { Button } from "antd";
import TableCategories from "./Table";
import ModalCategories from "./Modal";
import categoryService from "../../apis/CategoryService";
import type { CategoriesResponse, CategoryQuery } from "../../types/category";

const CategoriesFilter: FilterConfig[] = [
  {
    type: "input",
    name: "search",
    placeholder: "Tìm kiếm danh mục",
    label: "Tìm kiếm",
  },
  {
    type: "select",
    name: "isActive",
    placeholder: "Trạng thái",
    options: [
      {
        label: "Tất cả",
        value: 0,
      },
      {
        label: "Hoạt động",
        value: "true",
      },
      {
        label: "Không hoạt động",
        value: "false",
      },
    ],
    label: "Trạng thái",
  },
];

const CategoriesPage = () => {
  const { isDark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState<CategoryQuery>({
    search: "",
    isActive: "",
    page: 1,
    limit: 10,
  });
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);

  const [idEditing, setIdEditing] = useState("");

  const handleGetValueFilter = (values: Record<string, any>) => {
    setQuery((prev) => ({
      ...prev,
      page: 1,
      search: values.search || "",
      isActive: values?.isActive,
    }));
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await categoryService.getCategories(query);
      const payload = res || {
        data: [],
        meta: { total: 0, page: 1, limit: 10, pageCount: 0 },
      };

      setCategories(payload.data || []);
      if (payload.meta) {
        setQuery((prev) => ({
          ...prev,
          page: payload.meta.page,
          limit: payload.meta.limit,
          meta: payload.meta,
        }));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const openCreateModal = () => {
    setIdEditing("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChangePageSizeTable = (newPage: number, newSize: number) => {
    setQuery((prev) => ({
      ...prev,
      page: newPage,
      limit: newSize,
    }));
  };

  const handleEditCategory = (id: string) => {
    setIsOpen(true);
    setIdEditing(id);
  };

  useEffect(() => {
    fetchCategories();
  }, [query.page, query.limit, query.search, query.isActive]);

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 8,
        background: isDark ? "#262626" : "#fff",
        boxShadow: isDark
          ? "0 2px 8px rgba(0, 0, 0, 0.6)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <AppFilters
          filters={CategoriesFilter}
          onChange={handleGetValueFilter}
        />

        <Button onClick={openCreateModal} type="primary">
          + Tạo danh mục mới
        </Button>
      </div>

      <TableCategories
        loading={isLoading}
        page={query.page}
        pageSize={query.limit}
        total={query?.meta?.total || 0}
        categories={categories}
        onPageChange={handleChangePageSizeTable}
        onDelete={() => {}}
        onEdit={handleEditCategory}
      />

      <ModalCategories
        open={isOpen}
        onClose={closeModal}
        onSuccess={() => {
          fetchCategories();
        }}
        categoryId={idEditing}
      />
    </div>
  );
};

export default CategoriesPage;
