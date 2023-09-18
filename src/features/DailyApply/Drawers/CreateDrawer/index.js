import React, { useEffect } from 'react';
import { Form, Row, Col, Input, Select, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createDailyAppliesApi, updateDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { getSelectedApply } from 'src/store/slices/dailyApplySlice/selectors';

const { Option } = Select;

const initialFormValues = {
  clientName: '',
  companyName: '',
  link: '',
  profile: undefined,
  platform: undefined,
  positionToApply: undefined,
};

const CreateDailyApplyDrawer = ({ isOpen, handleDrawer }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const allProfiles = useSelector(getAllProfiles);
  const selectedApply = useSelector(getSelectedApply);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!allProfiles?.length) {
      dispatch(getProfilesApi());
    }
  }, [dispatch, allProfiles]);

  useEffect(() => {
    if (selectedApply) {
      const {
        clientName,
        link,
        profile: selectedProfile,
        platform,
        companyName,
        positionToApply,
      } = selectedApply;

      form.setFieldsValue({
        clientName,
        link,
        profile: selectedProfile?._id,
        platform,
        companyName,
        positionToApply,

      });
    } else {
      form.setFieldsValue(initialFormValues);
    }
  }, [selectedApply, form]);

  const handleSubmit = async (values) => {
    try {
      const {
        clientName,
        platform,
        positionToApply,
        link,
        companyName,
        profile,
      } = values;

      const data = {
        clientName,
        platform,
        positionToApply,
        link,
        companyName,
        user: userId,
        profile,

      };

      if (selectedApply) {
        dispatch(updateDailyAppliesApi({ data, id: selectedApply?._id }));
      } else {
        dispatch(createDailyAppliesApi(data));
      }

      form.setFieldsValue(initialFormValues);
      handleDrawer();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Drawer open={isOpen} onClose={handleDrawer} width={800}
      title={selectedApply ? 'Update Daily Apply' : 'Create Daily Apply'}
    >

      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleSubmit}>
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
                {allProfiles?.map((profile) => (
                  <Option key={profile?._id} value={profile?._id}>
                    {profile?.name}
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
          <Col span={12}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ message: 'Please enter Company Name' }]}
            >
              <Input placeholder="Please enter company Name" />
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

export default CreateDailyApplyDrawer;
