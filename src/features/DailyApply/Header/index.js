import React, { useState } from "react";
import DailyApplyDrawer from "../Drawers/CreateDrawer";
import { Button, Select, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "src/store/slices/profielSlice/selectors";
import CustomSearchField from "src/components/SearchField";
import DateRangePicker from "src/components/DateRangePicker";
import AddButton from "src/components/buttons/AddButton";
import { getLogedInUser } from "src/store/slices/authSlice/selectors";
import { Wrapper } from "./styled";
import { ROLES } from "src/constant/roles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdailyAppliesApi, uploadFile } from "src/store/slices/dailyApplySlice/apis";
import * as ExcelJS from 'exceljs'; 
import qs from "qs";

const Header = ({ pageSize, onSearch }) => {
  const dispatch = useDispatch();
  const allProfiles = useSelector(getAllProfiles);
  const logedInUser = useSelector(getLogedInUser);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedModalProfile, setSelectedModalProfile] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedFile, setSelectedFile] = useState(null);
  const allProfilesData = allProfiles.map((profile) => ({
    value: profile._id,
    label: profile.name,
  }));

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

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
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedModalProfile(null); 
  };
  const handleFileSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
  
    if (!selectedModalProfile) {
      toast.error("Please select a profile.");
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(data);
  
        const worksheet = workbook.worksheets[0];
  
        const headers = ['companyName', 'platform', 'clientJobPosition', 'link', 'createdBy', 'profile'];
  
        const batchSize = 10; 
        const batchPromises = [];
  
        for (let batchStart = 2; batchStart <= worksheet.rowCount; batchStart += batchSize) {
          const batchEnd = Math.min(batchStart + batchSize - 1, worksheet.rowCount);
          const jsonData = [];
  
          for (let i = batchStart; i <= batchEnd; i++) {
            const row = worksheet.getRow(i);
            if (!row.getCell(1).value) {
              continue;
            }
            const rowData = {};
            headers.forEach((header, index) => {
              if (header === 'link') {
                const hyperlink = row.getCell(index + 1).text;
                rowData[header] = hyperlink;
              } else {
                rowData[header] = row.getCell(index + 1).value;
              }
            });
  
            rowData.profile = selectedModalProfile;
            rowData.createdBy = logedInUser.id;
            jsonData.push(rowData);
          }
  
          const batchPromise = dispatch(uploadFile(jsonData))
            .catch(error => {
              console.error("Error uploading batch:", error);
              throw error; 
            });
          batchPromises.push(batchPromise);
        }
  
        try {
          await Promise.all(batchPromises);
        } catch (error) {
          console.error("Error uploading batches:", error);
          toast.error("Error uploading file. Please try again later.");
          return; 
        }
  
        const params = {
          date: new Date(),
        };
        const queryStringResult = qs.stringify(params);
        dispatch(getdailyAppliesApi(queryStringResult));
        setIsModalVisible(false);
        setSelectedModalProfile(null);
      };
      reader.readAsArrayBuffer(selectedFile);
  
    } catch (error) {
      console.error("Error parsing file:", error);
      toast.error("Error parsing file. Please make sure it's a valid Excel file.");
    }
  };
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    setSelectedFile(file);
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between mb-1">
        <CustomSearchField onChange={search} text="Search Apply" />
        <AddButton onClick={handleDrawer} text="New Apply" />
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
          <Button type="primary" onClick={handleModalOpen}>Import Excel</Button>
          <Modal
            title="Import Excel File"
            visible={isModalVisible}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleFileSubmit}>
                Submit
              </Button>,
            ]}
          >
             <Select
              placeholder="Select Profile"
              style={{ minWidth: '200px', width: '300px', marginBottom: '1.5rem' }}
              value={selectedModalProfile}
              onChange={handleChangeModalProfile}
            >
              {allProfilesData.map(profile => (
                <Select.Option key={profile.value} value={profile.value}>
                  {profile.label}
                </Select.Option>
              ))}
            </Select>

            <input
              type="file"
              id="fileInput"
              accept=".xls,.xlsx"
              style={{ display: "block", marginBottom: "1.5rem" }}
              onChange={handleFileChange}
              disabled={selectedModalProfile==null}
            />
           
          </Modal>
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