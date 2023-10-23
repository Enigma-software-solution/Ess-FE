import React, { useState } from "react";
import CreateUserDrawer from "../CreateUserDrawer";
import AddButton from "src/components/buttons/AddButton";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="d-flex flex-row-reverse mb-3">
                <AddButton onClick={handleDrawer} text="New User" />
            </div>
            <CreateUserDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
