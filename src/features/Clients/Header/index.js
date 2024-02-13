import React from "react";
import AddButton from "src/components/buttons/AddButton";
import CreateClientDrawer from "../CreateClientDrawer";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "src/store/slices/clientSlice";
import CustomSearchField from "src/components/SearchField";

const Header = ({isOpen ,setIsOpen,onSearch}) => {

    const dispatch = useDispatch()


    const handleDrawer = () => {
        setIsOpen(!isOpen);
        dispatch(setSelectedClient(null));

    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        onSearch(searchValue);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <CustomSearchField onChange={handleSearchChange} text="Search Client" />
                <AddButton onClick={handleDrawer} text="New Client" />
            </div>
            <CreateClientDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
        </div>
    );
};

export default Header;
