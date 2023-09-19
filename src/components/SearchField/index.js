import React from 'react'
import debounce from 'lodash/debounce';
import Search from 'antd/es/input/Search';

const CustomSearchField = ({ onChange = () => { }, debounceTime = 1000 }) => {

    const debouncedOnChange = debounce(onChange, debounceTime);

    return (
        <div>
            <Search size='large' placeholder="input search text" onChange={debouncedOnChange} enterButton />
        </div>
    )
}

export default CustomSearchField
