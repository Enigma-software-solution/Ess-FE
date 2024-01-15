import React from 'react'
import debounce from 'lodash/debounce';
import { Input } from 'antd';

const CustomSearchField = ({ onChange = () => { }, debounceTime = 1000, text }) => {

    const debouncedOnChange = debounce(onChange, debounceTime);

    return (
        <div>
            <Input size='large' style={{ width: '250px', borderRadius: "10px" }} placeholder={text} onChange={debouncedOnChange} enterButton />
        </div>
    )
}

export default CustomSearchField
