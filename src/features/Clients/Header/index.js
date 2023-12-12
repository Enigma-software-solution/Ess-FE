import React from "react";
import AddButton from "src/components/buttons/AddButton";
import CreateClientDrawer from "../CreateClientDrawer";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "src/store/slices/clientSlice";

const Header = ({isOpen ,setIsOpen}) => {

    const dispatch = useDispatch()


    const handleDrawer = () => {
        setIsOpen(!isOpen);
        dispatch(setSelectedClient(null));

    };

    return (
        <div>
            <div className="d-flex flex-row-reverse mb-3">
                <AddButton onClick={handleDrawer} text="New Client" />
            </div>
            <CreateClientDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
