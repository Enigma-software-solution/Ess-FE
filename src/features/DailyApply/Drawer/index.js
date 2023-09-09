import React, {useEffect} from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { postDailyApplies } from 'src/store/slices/dailyApplySlice/apis';
import { getProfiles } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getUserId } from 'src/store/slices/authSlice/selectors';


const { Option } = Select;

const ApplyDrawer = ({ isOpen, handleDrawer }) => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId);
  const AllProfiles = useSelector(getAllProfiles);

  const handleSubmit = async (values) => {
    try {

        console.log(values, "valuesvalues")
        const data =
        {
          clientName:values.clientName,
            // companyName: values.companyName,
            platform: values.platform,
            positionToApply: values?.positionToApply,
            link: values.link,
            user: userId,
            profile: values.profile
        }
      // Dispatch the postDailyApplies action with the form data
      const response = dispatch(postDailyApplies(data));

      // Handle success, reset the form, or close the drawer
      console.log('Form submitted successfully:', response);
      // Reset form or close drawer
    } catch (error) {
      // Handle errors, show error messages, etc.
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
   dispatch(getProfiles())
  }, [])
  

  console.log(AllProfiles, "getAllProfilesgetAllProfiles")

  return (
    <Drawer open={isOpen} onClose={handleDrawer} width={800}>
      <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="clientName"
              label="Client Name"
              rules={[{ required: true, message: 'Please enter Client name' }]}
            >
              <Input placeholder="Please enter Client name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="link"
              label="Link"
              rules={[{ required: true, message: 'Please enter Link' }]}
            >
              <Input placeholder="Please enter Link" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="profile"
              label="Profile"
              rules={[{ required: true, message: 'Please select the Profile' }]}
            >
              <Select placeholder="Please select a Profile">
                {AllProfiles.map((profile, index) => (
                  <Option key={index} value={profile._id}>
                    {profile.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="platform"
              label="Platform"
              rules={[{ required: true, message: 'Please select a Platform' }]}
            >
              <Select placeholder="Please select a Platform">
                <Option value="LinkedIn">LinkedIn</Option>
                <Option value="GlassDoor">GlassDoor</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="positionToApply"
              label="Position Applying For"
              rules={[
                { required: true, message: 'Please select the Position you are applying' },
              ]}
            >
              <Select placeholder="Please select a Position">
                <Option value="front_end_eng">FrontEnd</Option>
                <Option value="FullStack">FullStack</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button onClick={handleDrawer}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ApplyDrawer;
