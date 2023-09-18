import React from 'react'
import { Input } from 'antd';
import debounce from 'lodash/debounce';

const { Search } = Input;

const CustomSearchField = ({ onChange = () => { }, debounceTime = 1000 }) => {

    const debouncedOnChange = debounce(onChange, debounceTime);

    return (
        <div>
            <Search placeholder="input search text" onChange={debouncedOnChange} enterButton />
        </div>
    )
}

export default CustomSearchField
