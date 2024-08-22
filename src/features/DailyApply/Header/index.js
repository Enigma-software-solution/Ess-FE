import React, { useState } from "react";
// import DailyApplyDrawer from "../Drawers/CreateDrawer";
import { Button, Select, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import CustomSearchField from "src/components/SearchField";
import DateRangePicker from "src/components/DateRangePicker";
// import AddButton from "src/components/buttons/AddButton";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { Wrapper } from "./styled";
import { ROLES } from "src/constant/roles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleFileExtract } from "src/utils/extractExcelData";
import { uploadCSVFile } from "src/store/slices/dailyApplySlice/apis";

const Header = ({ pageSize, onSearch }) => {
  const dispatch = useDispatch();
  const allProfiles = useSelector(getAllProfiles);
  const logedInUser = useSelector(getLogedInUser);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedModalProfile, setSelectedModalProfile] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);

  const loggedInUser = useSelector(getLogedInUser);

  const fileReader = new FileReader();
  const allProfilesData = allProfiles.map((profile) => ({
    value: profile._id,
    label: profile.name,
  }));

  // const handleDrawer = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleSubmit = () => {
    if (!selectedProfile && !selectedDateRange) {
      toast.warn("Please fill all the filters before searching.");
      return;
    }

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

  const handleChangeModalProfile = (value) => {
    setSelectedModalProfile(value);
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

  const handleModalOpen = () => {
    setIsModalVisible(true);
    setSelectedModalProfile(null);
    setFile(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedModalProfile(null);
    setFile(null);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file && selectedModalProfile) {
      const createdBy = loggedInUser?.id;
      const payload = {
        file,
        profileId: selectedModalProfile,
        createdBy,
      };

      dispatch(uploadCSVFile(payload))
        .then((response) => {
          if (uploadCSVFile.fulfilled.match(response)) {
            toast.success("CSV uploaded successfully!");
            handleModalCancel();
          } else if (uploadCSVFile.rejected.match(response)) {
            toast.error("CSV upload failed: " + response.payload);
          }
        })
        .catch((error) => {
          toast.error("An unexpected error occurred: " + error.message);
        });

      setIsModalVisible(false);
    } else {
      toast.warn("Please select a file before submitting.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between mb-1">
        <CustomSearchField onChange={search} text="Search Apply" />
        {/* <AddButton onClick={handleDrawer} text="New Apply" /> */}
      </div>
      <Wrapper>
        <div className="d-flex gap-3">
          {logedInUser && logedInUser?.role === ROLES.ADMIN && (
            <Select
              style={{ width: "180px" }}
              value={selectedProfile}
              valueField="_id"
              labelField="name"
              placeholder="Select Profile"
              options={allProfilesData}
              onChange={handleChangeProfile}
            />
          )}
          <DateRangePicker
            onChange={handleDateRangeChange}
            value={selectedDateRange}
          />
        </div>

        <div className="d-flex gap-2">
          <Button type="primary" onClick={handleModalOpen}>
            Import Excel
          </Button>
          <Modal
            title="Import Excel File"
            visible={isModalVisible}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={(e) => {
                  handleOnSubmit(e);
                }}
              >
                Submit
              </Button>,
            ]}
          >
            <Select
              placeholder="Select Profile"
              style={{
                minWidth: "200px",
                width: "300px",
                marginBottom: "1.5rem",
              }}
              value={selectedModalProfile}
              onChange={handleChangeModalProfile}
            >
              {allProfilesData?.map((profile) => (
                <Select.Option key={profile.value} value={profile.value}>
                  {profile.label}
                </Select.Option>
              ))}
            </Select>

            <div style={{ textAlign: "center" }}>
              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />
              </form>
            </div>
          </Modal>
          <Button type="primary" onClick={handleSubmit}>
            Search
          </Button>
          <Button type="primary" danger onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Wrapper>

      {/* <DailyApplyDrawer isOpen={isOpen} handleDrawer={handleDrawer} /> */}
    </>
  );
};

export default Header;
