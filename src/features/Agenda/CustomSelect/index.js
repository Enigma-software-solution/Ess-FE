import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import qs from "qs";
import { getEventsBySearchApi } from "src/store/slices/agenda/apis";

const { Option } = Select;

const CustomSelect = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = async () => {
      try {
        setLoading(true);
        const d={
          search:'test'
        }
        const params = qs.stringify(d);
        const res = dispatch(getEventsBySearchApi(params)).upwrap();
        console.log(res, "resss");
        // const response = await axios.get('YOUR_API_ENDPOINT');
        // const data = response.data; // Modify this according to your API response structure
        // setOptions(data); // Assuming your API response is an array of objects with 'label' and 'value' properties
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function to fetch data when the component mounts
    fetchData();
  }, []);

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select an option"
      loading={loading}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
