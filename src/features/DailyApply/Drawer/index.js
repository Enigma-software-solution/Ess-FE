import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createDailyAppliesApi, updateDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { getSelectedApply } from 'src/store/slices/dailyApplySlice/selectors';
import { toast } from 'react-toastify';


const { Option } = Select;

const DailyApplyDrawer = ({ isOpen, handleDrawer }) => {
  const [initialValue, setInitialValue] = useState({
    clientName: '',
    link: '',
    profile: '',
    platform: '',
    positionToApply: '',
  })

  const dispatch = useDispatch();

  const userId = useSelector(getUserId);
  const AllProfiles = useSelector(getAllProfiles);
  const selectedApply = useSelector(getSelectedApply)

  useEffect(() => {
    if (selectedApply) {
      setInitialValue({
        clientName: selectedApply?.clientName || '',
        link: selectedApply?.link || '',
        profile: selectedApply?.profile || '',
        platform: selectedApply?.platform || '',
        positionToApply: selectedApply?.positionToApply || '',
        user: selectedApply?.user || '',
      });
    }
  }, [selectedApply]);

  useEffect(() => {
    dispatch(getProfilesApi())
  }, [])

  const handleSubmit = async (values) => {
    try {
      const data =
      {
        clientName: values?.clientName,
        platform: values?.platform,
        positionToApply: values?.positionToApply,
        link: values?.link,
        user: userId,
        profile: values?.profile
      };   
        dispatch(createDailyAppliesApi(data));
        toast.success("Apply created Successfully")
      
      handleDrawer()
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Drawer open={isOpen} onClose={handleDrawer} width={800}>
      <Form layout="vertical" hideRequiredMark onFinish={handleSubmit} initialValues={initialValue}>
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
                {AllProfiles?.map((profile, index) => (
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
                <Option value="full_stack">FullStack</Option>
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

export default DailyApplyDrawer;
