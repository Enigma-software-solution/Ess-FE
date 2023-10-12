import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

// Styled components for customization
const StyledSelect = styled(Select)`
  width: 100%;
`;

// Reusable Select component
const CustomSelect = ({
  placeholder,
  options = [],
  onChange,
  value,
  style,
  labelField = 'label',
  valueField = 'value',
}) => {
  return (
    <StyledSelect
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={style}
    >
      {options?.map((item, index) => (
        <Option key={index} value={item?.[valueField]}>
          {item?.[labelField]}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default CustomSelect;
