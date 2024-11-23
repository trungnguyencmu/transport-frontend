import { CustomInput } from '@/components/forms/CustomInput';
import MyInput from '@/components/forms/MyInput';
import Colors from '@/constants/Colors';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Add from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Input, Popconfirm } from 'antd';
import pluralize from 'pluralize';

const HeaderTableCard = ({
  headerName,
  onChangeSearch,
  buttonText,
  selectedRowKeys,
  handleNewItem,
  handleDeleteItems,
  rightSection,
}: {
  headerName?: string;
  onChangeSearch: (e: string) => void;
  buttonText?: string;
  selectedRowKeys?: string[];
  handleNewItem: () => void;
  handleDeleteItems?: () => void;
  rightSection?: React.ReactNode;
}) => {
  if (selectedRowKeys && selectedRowKeys.length > 0) {
    return (
      <div
        className="flex flex-col md:flex-row items-center justify-between py-6 px-4 gap-3"
        style={{ borderBottom: 'solid 1px #E0E0E0' }}
      >
        <div className="text-xl font-bold">
          {`${pluralize((headerName && headerName.toLocaleLowerCase()) || '', selectedRowKeys.length, true)} selected`}
        </div>
        <Popconfirm
          onConfirm={handleDeleteItems}
          title="Delete the items"
          description="Are you sure to delete this items?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button danger className="flex items-center">
            Delete <DeleteOutlined />
          </Button>
        </Popconfirm>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between py-6 px-4 gap-3"
      style={{ borderBottom: 'solid 1px #E0E0E0' }}
    >
      <div className="text-xl font-bold">{headerName}</div>
      <div className="md:w-1/4 w-full">
        <Input
          suffix={<SearchIcon sx={{ color: Colors.gray }} />}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      {buttonText ? (
        <Button
          type="primary"
          className="flex gap-4 items-center px-6"
          onClick={handleNewItem}
        >
          {buttonText} <Add />
        </Button>
      ) : rightSection ? (
        rightSection
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HeaderTableCard;
