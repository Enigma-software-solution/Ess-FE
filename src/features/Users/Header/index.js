import React, { useState } from "react";
import CreateUserDrawer from "../CreateUserDrawer";
import AddButton from "src/components/buttons/AddButton";
import Search from "antd/es/input/Search";
import { Flex, Input } from "antd";
import CustomSearchField from "src/components/SearchField";

const Header = ({ onSearch }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        onSearch(searchValue);
    };


    return (
        <div>
            <Flex justify="space-between" className="mb-3">
                <CustomSearchField onChange={handleSearchChange} />
                <AddButton onClick={handleDrawer} text="New User" />
            </Flex>
            <CreateUserDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
