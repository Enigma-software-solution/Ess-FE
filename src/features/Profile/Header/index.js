import React, { useState } from "react";
import AddButton from "src/components/buttons/AddButton";
import CreateProfileDrawer from "../Drawers/CreateProfileDrawer";
import CustomSearchField from "src/components/SearchField";

const Header = ({onSearch}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        onSearch(searchValue);
    };

    return (
        <>
            <div className="d-flex justify-content-between  mb-3">
                <CustomSearchField onChange={handleSearchChange} text="Search Profile" />
                <AddButton onClick={handleDrawer} text="Profile" />
            </div>

            <CreateProfileDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </>
    );
};

export default Header;
