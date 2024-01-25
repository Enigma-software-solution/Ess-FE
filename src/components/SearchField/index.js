import React from 'react';
import debounce from 'lodash/debounce';
import { Input } from 'antd';

const CustomSearchField = ({ onChange = () => { }, debounceTime = 1000, text }) => {

    const debouncedOnChange = debounce(onChange, debounceTime);

    const handleKeyPress = (event) => {
        const regex = /[0-9a-zA-Z]/i;
        const key = event.key;

        if (!regex.test(key)) {
            event.preventDefault();
        }
    };

    return (
        <div>
            <Input
                size='large'
                style={{ width: '250px', borderRadius: "10px" }}
                placeholder={text}
                onChange={debouncedOnChange}
                onKeyPress={handleKeyPress}
                enterButton
            />
        </div>
    )
}

export default CustomSearchField;
