import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import Colors from '@/constants/Colors';
import FormItemHook from './FormItem/FormItemHook';
import { KeyboardArrowDown } from '@mui/icons-material';
import { getNestedError } from '@/utils/misc';
import { CustomInput } from './CustomInput';
const { Option } = Select;

const SelectHook = ({
  className,
  control,
  name,
  options,
  defaultValue = '',
  label,
  required,
  showOptionsName = true,
  showLabel = true,
  errors,
  valueSelect = 'value',
  labelSelect = 'name',
  getValues,
  showCustomSearch = false,
  inputHtml,
  ...rest
}) => {

  const [selectOptions, setSelectOptions] = useState(options)

  const finalError = getNestedError(errors, name);

  const handleSearch = (keyword) => {
    const tmpOptions = options.filter(opt => opt.name.toLowerCase().includes(keyword.toLowerCase()))
    setSelectOptions(tmpOptions)
  }
  useEffect(() => {
    setSelectOptions(options)
  }, [options])

  return (
    <FormItemHook
      name={name}
      label={label}
      required={required}
      errors={finalError}
      showLabel={showLabel}
      showOptionsName={showOptionsName}
      className={className}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            className="w-full"
            {...field}
            suffixIcon={<KeyboardArrowDown />}
            defaultValue={defaultValue}
            value={getValues(name)}
            optionFilterProp={'name'}
            dropdownRender={(menu) => (
              <div>
                {
                  showCustomSearch && <div className='m-3'>
                    <CustomInput
                      suffix={<SearchIcon sx={{ color: Colors.gray }} />}
                      className="bg-input m-4 p-4"
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search"
                    />
                  </div>
                }
                {

                  inputHtml && (
                    <div className='m-3'>{inputHtml}</div>
                  )
                }
                {menu}
              </div>
            )}
            {...rest}
          >
            {selectOptions.map((option) => (
              <Option key={option[valueSelect]} value={option[valueSelect]} label={option?.title}>
                {option[labelSelect]}
              </Option>
            ))}
          </Select>
        )}
      />
    </FormItemHook>
  );
};
export default SelectHook;
