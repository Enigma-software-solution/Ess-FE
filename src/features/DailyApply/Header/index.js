import React, { useState } from "react";
import DailyApplyDrawer from "../Drawers/CreateDrawer";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import CustomSearchField from "src/components/SearchField";
import DateRangePicker from "src/components/DateRangePicker";
import AddButton from "src/components/buttons/AddButton";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import CustomSelect from "src/components/formElements/CustomSelect";
import { Wrapper } from "./styled";
import qs from "qs";

const Header = ({ pageSize, onSearch }) => {
  const dispatch = useDispatch();
  const allProfiles = useSelector(getAllProfiles);
  const logedInUser = useSelector(getLogedInUser);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    const params = {};

    if (selectedProfile) {
      params.profileId = selectedProfile;
    }

    if (selectedDateRange) {
      params.startDate = selectedDateRange[0]?.format("YYYY-MM-DD");
      params.endDate = selectedDateRange[1]?.format("YYYY-MM-DD");
    }
    onSearch(params);
  };

  const handleChangeProfile = (value) => {
    setSelectedProfile(value);
  };

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };

  const handleReset = () => {
    const params = {
      date: new Date(),
    };

    onSearch(params);
    setSelectedProfile(null);
    setSelectedDateRange(null);
  };

  const search = (e) => {
    const params = {
      search: e.target.value,
      pageSize: pageSize,
    };
    onSearch(params);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-1">
        <CustomSearchField onChange={search} />
        <AddButton onClick={handleDrawer} text="New Apply" />
      </div>
      <Wrapper>
        <div className="d-flex gap-3">
          {logedInUser && logedInUser?.role === "admin" && (
            <CustomSelect
              style={{ width: "180px" }}
              value={selectedProfile}
              valueField="_id"
              labelField="name"
              options={allProfiles}
              onChange={handleChangeProfile}
            />
          )}
          <DateRangePicker
            onChange={handleDateRangeChange}
            value={selectedDateRange}
          />
        </div>

        <div className="d-flex gap-2">
          <Button type="primary" onClick={handleSubmit}>
            Search
          </Button>
          <Button type="primary" danger onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Wrapper>

      <DailyApplyDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
    </>
  );
};

export default Header;
