import React, { useCallback, useState } from 'react';
import { Table, Space } from 'antd';
import { HolidayGroup } from '@/models/holiday_group_model';
import { useFetchDataWithPagination } from '@/hooks/getData/useFetchData';
import TableContainer from '@/components/containers/TableContainer';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { debounce } from 'lodash';
import { useCountries } from '@/hooks/getData/useCountries';

const HolidayGroupPage: React.FC = () => {
  const { countries } = useCountries();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // Fetch paginated holiday groups
  const {
    items,
    page,
    setPage,
    setPerPage,
    meta,
    loading,
    error,
    perPage,
    onChangeKeyword,
  } = useFetchDataWithPagination<HolidayGroup, any>(
    'v2/admins/holiday_groups',
    HolidayGroup,
    2
  );

  const navigate = useNavigate();

  // Debounced search for efficiency
  const debouncedSearch = useCallback(
    debounce((keyword) => onChangeKeyword(keyword), 500),
    []
  );

  // Map country key to name
  const findCountryName = (key: string) => {
    const country = countries.find((c) => c.key === key);
    return country ? country.value : null;
  };

  // Table columns
  const columns = [
    {
      title: 'Holiday Group Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (_: any, item: HolidayGroup) => (
        <a
          className="text-secondary"
          onClick={() => navigate(`/holiday-groups/${item.id}/holidays`)}
        >
          {item.name}
        </a>
      ),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: 200,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (_: any, item: HolidayGroup) => (
        <div>{findCountryName(item.country)}</div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_: any, item: HolidayGroup) => (
        <Space size="small">
          <div
            className="cursor-pointer"
            onClick={() => handleEditItem(item)}
          >
            <Edit />
          </div>
        </Space>
      ),
    },
  ];

  // Edit handler
  const handleEditItem = (item: HolidayGroup) => {
    navigate(`/holiday-groups/edit/${item.id}`);
  };

  // Row selection handling
  const onSelectChange = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Handle table changes
  const onChangeTable = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPage(current);
    setPerPage(pageSize);
  };

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="p-4">
      <h3 className="pb-4 font-bold">HOLIDAY GROUPS</h3>
      <TableContainer
        headerName="Holiday Groups"
        resourceName="Holiday Group"
        buttonText="Add New Holiday Group"
        items={items}
        columns={columns}
        fetchItems={debouncedSearch}
        handleNewItem={() => navigate('/holiday-groups/new')}
        meta={meta}
        onChangeTable={onChangeTable}
        pageSize={perPage}
        rowSelection={rowSelection}
        selectedRowKeys={selectedRowKeys}
        handleDeleteItems={() => {
          console.log('Delete items:', selectedRowKeys);
        }}
      />
    </div>
  );
};

export default HolidayGroupPage;
