import { Table, Tag } from "antd";
import type { CategoriesResponse } from "../../../types/category";
import TableAction from "../../../components/common/TableAction";

type Props = {
  categories: CategoriesResponse[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: string) => void;
};

const TableCategories = ({
  categories,
  page,
  pageSize,
  loading,
  onPageChange,
  onDelete,
  onEdit,
  total,
}: Props) => {
  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (active: boolean) =>
        active ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Ẩn</Tag>,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: any) => (
        <>
          <TableAction
            showView
            showEdit
            showDelete
            onView={() => {
              console.log("View", text);
            }}
            onEdit={() => onEdit(record.id)}
            onDelete={() => {
              console.log("Xóa id này", record.id);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      loading={loading}
      rowKey={"id"}
      pagination={{
        current: page,
        pageSize,
        total,
        showSizeChanger: true,
        onChange: onPageChange,
      }}
    />
  );
};

export default TableCategories;
