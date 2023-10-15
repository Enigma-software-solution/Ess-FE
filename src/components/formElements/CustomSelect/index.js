import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import _get from 'lodash/get';
const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const CustomSelect = ({
  placeholder = 'select',
  options = [],
  onChange,
  value,
  style,
  labelField = "label",
  valueField = "value",
  mode = "single",
  allowClear = false,
  disabled = false,
  showSearch = true,
  ...props
}) => {
  return (
    <StyledSelect
      mode={mode}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={style}
      allowClear={allowClear}
      disabled={disabled}
      showSearch={showSearch}
      {...props}
    >
      {options?.map((item, index) => (
        <Option key={index} value={item?.[valueField]}>
          {_get(item, labelField)}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default CustomSelect;
