import React, { useState } from "react";
import CustomSearchField from "src/components/SearchField";
import AddButton from "src/components/buttons/AddButton";
import CreateProfileDrawer from "../Drawers/CreateProfileDrawer";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <CustomSearchField />
                <AddButton onClick={handleDrawer} text="Profile" />
            </div>

            <CreateProfileDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </>
    );
};

export default Header;
