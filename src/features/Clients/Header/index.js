import React, { useState } from "react";
import { Select } from "antd";
import CustomSearchField from "src/components/SearchField";
import AddButton from "src/components/buttons/AddButton";
import CreateClientDrawer from "../CreateClientDrawer";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <CustomSearchField />
                <AddButton onClick={handleDrawer} text="New Client" />
            </div>
            <CreateClientDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
