import React, { useState } from "react";
import CreateUserDrawer from "../CreateUserDrawer";
import AddButton from "src/components/buttons/AddButton";
import Search from "antd/es/input/Search";
import { Flex } from "antd";

const Header = ({ onSearch }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        // Call the onSearch prop to update the search query in the parent component
        onSearch(searchValue);
    };


    return (
        <div>
            <Flex justify="space-between" className="mb-3">
                <Search size="large" placeholder="input search text" enterButton
                    style={{ width: '300px' }} onChange={handleSearchChange} />
                <AddButton onClick={handleDrawer} text="New User" />
            </Flex>
            <CreateUserDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
