import { CustomModal } from '@/components/common/CustomModal';
import MyInput from '@/components/forms/MyInput';
import SelectHook from '@/components/forms/SelectHook';
import { useCountries } from '@/hooks/getData/useCountries';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Validation schema using Yup
const holidayGroupSchema = yup.object().shape({
  name: yup.string().required('Holiday Group Name is required'),
  year: yup
    .number()
    .required('Year is required')
    .min(2023, 'Year must be 2023 or later'),
  country: yup.string().required('Country is required'),
});

const ModalAddNewHolidayGroup = ({
  item,
  handleCloseModal,
  submitForm,
}: {
  item?: { id?: string; name?: string; year?: number; country?: string };
  isModalOpen: boolean;
  handleCloseModal: () => void;
  submitForm: (values: any) => void;
}) => {
  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(holidayGroupSchema),
    defaultValues: {
      id: item?.id || '',
      name: item?.name || '',
      year: item?.year || new Date().getFullYear(),
      country: item?.country || '',
    },
  });

  // Close the modal and reset the form
  const closeModal = () => {
    handleCloseModal();
    reset();
  };

  // Handle form submission
  const handleSubmitForm = (values: any) => {
    submitForm(values);
    reset();
  };

  const optionYears = [
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
    { value: 2027, label: '2027' },
    { value: 2028, label: '2028' },
    { value: 2029, label: '2029' },
    { value: 2030, label: '2030' },
    // Add more years as needed
  ];

  const { optionCountries } = useCountries();

  const handleSearchSelect = (input, option) => {
    return (option?.children ?? '').toLowerCase().includes(input.toLowerCase());
  };

  return (
    <>
      <CustomModal>
        <Modal
          destroyOnClose={true}
          title={item ? 'Edit Holiday Group' : 'Add New Holiday Group'}
          open={true}
          onCancel={() => closeModal()}
          footer={[
            <Button key="cancel" onClick={() => closeModal()}>
              Cancel
            </Button>,
            <Button
              key="create"
              type="primary"
              onClick={handleSubmit(handleSubmitForm)}
            >
              <div className="flex items-center gap-3">
                {item ? 'Edit' : 'Create'}
                <CheckIcon className="icon white" />
              </div>
            </Button>,
          ]}
        >
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-4"
          >
            {/* Holiday Group Name */}
            <MyInput
              control={control}
              placeholder="Holiday Group Name"
              label="Holiday Group Name"
              errors={errors}
              name="name"
              type="text"
            />
            {/* Year Selection */}
            <SelectHook
              control={control}
              placeholder="Year"
              label="Year"
              name="year"
              errors={errors}
              options={optionYears}
              getValues={getValues}
              showSearch={false}
              required={true}
            />
            {/* Country Selection */}
            <SelectHook
              control={control}
              placeholder="Country"
              label="Country"
              name="country"
              errors={errors}
              options={optionCountries}
              getValues={getValues}
              showSearch={true}
              required={true}
              filterOption={handleSearchSelect}
            />
          </form>
        </Modal>
      </CustomModal>
    </>
  );
};

export default ModalAddNewHolidayGroup;
