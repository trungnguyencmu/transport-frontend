import HeaderTableCard from '@/components/common/Card/HeaderTableCard/HeaderTableCard';
import { Card, Pagination, Select, Table } from 'antd';
import { useState } from 'react';
import pluralize from 'pluralize';
import { KeyboardArrowDown } from '@mui/icons-material';

type TableContainerType = {
  headerName?: string;
  resourceName?: string;
  items: any[];
  handleNewItem: () => void;
  handleDeleteItems?: () => void;
  onChangeTable?: any;
  columns: any[];
  meta: any;
  fetchItems: any;
  buttonText: string;
  pageSize?: number;
  rowSelection?: any;
  selectedRowKeys?: string[];
  rightSection?: React.ReactNode;
};

const tableStyle = {
  bodyStyle: {
    padding: 0,
  },
};

const TableContainer = ({
  headerName,
  resourceName,
  items,
  handleNewItem,
  handleDeleteItems,
  columns,
  meta,
  fetchItems,
  buttonText,
  pageSize = 10,
  rowSelection,
  selectedRowKeys,
  onChangeTable,
  rightSection,
}: TableContainerType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('10');

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    onChangeTable({ current: page, perPage: itemsPerPage });
  };

  const onChangeItemsPerPage = (val) => {
    setItemsPerPage(val);
    onChangeTable({ current: currentPage, perPage: val });
  };

  return (
    <Card bodyStyle={tableStyle.bodyStyle}>
      <HeaderTableCard
        headerName={headerName}
        onChangeSearch={fetchItems}
        buttonText={buttonText}
        selectedRowKeys={selectedRowKeys}
        handleDeleteItems={handleDeleteItems}
        handleNewItem={handleNewItem}
        rightSection={rightSection}
      />
      <Table
        rowSelection={rowSelection}
        dataSource={items}
        columns={columns}
        pagination={false}
        scroll={{ x: 767 }}
        onChange={onChangeTable}
      ></Table>
      <div className="flex sm:flex-row flex-col gap-4 items-center justify-between w-100 p-4">
        <div>
          {pluralize(resourceName || headerName || '', meta?.total_count, true)}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={meta?.total_count || 0}
          onChange={onPageChange}
          showSizeChanger={false} // Hide size changer if not needed
          showQuickJumper={false} // Show quick jumper to input page number
          responsive={true}
        />
        <Select
          defaultValue={itemsPerPage}
          onChange={onChangeItemsPerPage}
          size="small"
          suffixIcon={<KeyboardArrowDown />}
          options={[
            {
              value: '10',
              label: `${pluralize(resourceName || headerName || '', 10, true)}/Page`,
            },
            {
              value: '15',
              label: `${pluralize(resourceName || headerName || '', 15, true)}/Page`,
            },
            {
              value: '20',
              label: `${pluralize(resourceName || headerName || '', 20, true)}/Page`,
            },
            {
              value: '25',
              label: `${pluralize(resourceName || headerName || '', 25, true)}/Page`,
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default TableContainer;
