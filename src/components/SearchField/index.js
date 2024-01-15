import React from 'react'
import debounce from 'lodash/debounce';
import Search from 'antd/es/input/Search';
import { Input } from 'antd';

const CustomSearchField = ({ onChange = () => { }, debounceTime = 1000 }) => {

    const debouncedOnChange = debounce(onChange, debounceTime);

    return (
        <div>
            <Input size='large' style={{ width: '250px', borderRadius: "10px" }} placeholder=" Search " onChange={debouncedOnChange} enterButton />
        </div>
    )
}

export default CustomSearchField
