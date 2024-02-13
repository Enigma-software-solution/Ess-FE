import { toast } from "react-toastify";
import { getdailyAppliesApi, uploadFile } from "src/store/slices/dailyApplySlice/apis";
import * as ExcelJS from 'exceljs'; 
import qs from "qs";

export const handleFileExtract = async (file, selectedModalProfile, logedInUser, dispatch, setIsModalVisible) => {
    
  if (!file) {
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
    };
    reader.readAsArrayBuffer(file);

  } catch (error) {
    console.error("Error parsing file:", error);
    toast.error("Error parsing file. Please make sure it's a valid Excel file.");
  }
};
