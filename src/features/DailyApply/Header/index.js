import React, { useState } from "react";
import DailyApplyDrawer from "../Drawers/CreateDrawer";
import { Select, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import { getdailyAppliesApi } from "src/store/slices/dailyApplySlice/apis";
import qs from "qs";
import CustomSearchField from "src/components/SearchField";
import DateRangePicker from "src/components/DateRangePicker";
import AddButton from "src/components/buttons/AddButton";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";

const { Option } = Select;

const Header = ({ pageSize }) => {
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
    const queryStringResult = qs.stringify(params);

    dispatch(getdailyAppliesApi(queryStringResult));
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

    const queryStringResult = qs.stringify(params);
    dispatch(getdailyAppliesApi(queryStringResult));
    setSelectedProfile(null);
    setSelectedDateRange(null);
  };

  const search = (e) => {
    const params = {
      search: e.target.value,
      pageSize: pageSize
    };
    const queryStringResult = qs.stringify(params);
    dispatch(getdailyAppliesApi(queryStringResult));
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <CustomSearchField onChange={search} />
        <AddButton onClick={handleDrawer} text="New Apply" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          background: "#fff",
          margin: "8px 0 5px 0 ",
        }}
      >
        <div className="d-flex gap-3">
          {logedInUser && logedInUser?.role === "admin" && (
            <Select
              placeholder="Please select a Profile"
              onChange={handleChangeProfile}
              value={selectedProfile}
              style={{ width: "180px" }}
            >
              {allProfiles?.map((profile) => (
                <Option key={profile?._id} value={profile?._id}>
                  {profile?.name}
                </Option>
              ))}
            </Select>
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
      </div>

      <DailyApplyDrawer isOpen={isOpen} handleDrawer={handleDrawer} />
    </div>
  );
};

export default Header;
