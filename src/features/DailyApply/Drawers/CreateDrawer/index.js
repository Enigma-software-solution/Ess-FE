import React, { useEffect } from 'react';
import { Form, Row, Col, Input,  Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createDailyAppliesApi, updateDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { getSelectedApply } from 'src/store/slices/dailyApplySlice/selectors';
import CustomSelect from 'src/components/formElements/CustomSelect';
import { platformOptions } from 'src/constant/platformOptions';
import { applyPosition } from 'src/constant/applyPosition';


const initialFormValues = {
  clientJobPosition: '',
  clientName: '',
  link: localStorage.getItem('link') || '',
  profile: localStorage.getItem('profile') || undefined,
  platform: localStorage.getItem('platform') || 'GlassDoor',
  positionToApply: 'Full Stack',
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
      form.setFieldsValue({
        clientJobPosition: selectedApply?.clientJobPosition,
        clientName: selectedApply?.clientName,
        link: selectedApply?.link,
        profile: selectedApply?.profile?._id,
        platform: selectedApply?.platform,
        positionToApply: selectedApply?.positionToApply,

      });
    } else {
      form.setFieldsValue({
        clientJobPosition: initialFormValues.clientJobPosition,
        clientName: initialFormValues.clientName,
        link: initialFormValues.link,
        profile: initialFormValues.profile,
        platform: initialFormValues.platform,
        positionToApply: initialFormValues.positionToApply,
      });
    }
  }, [selectedApply, form]);

  const handleSubmit = async (values) => {
    try {
      localStorage.setItem('link', values?.link || '');
      localStorage.setItem('profile', values?.profile || '');
      localStorage.setItem('platform', values?.platform || 'GlassDoor');

      const data = {
        clientJobPosition: values?.clientJobPosition,
        clientName: values?.clientName,
        platform: values?.platform,
        positionToApply: values?.positionToApply,
        link: values?.link,
        createdBy: userId,
        profile: values?.profile,

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
              <CustomSelect options={allProfiles} valueField='_id' labelField='name' placeholder='Select profile' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="platform"
              label="Platform"
              rules={[{ required: true, message: 'Please select a Platform' }]}
            >
              <CustomSelect options={platformOptions} placeholder='Select platform' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="positionToApply"
              label="Position"
              rules={[
                { required: true, message: 'Please select the Position for applying' },
              ]}
            >
              <CustomSelect
                options={applyPosition}
                placeholder='Position for apply '
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="clientJobPosition"
              label="Client Job Position"
              rules={[{ required: true, message: 'Please enter Client Job' }]}
            >
              <Input placeholder="Please enter Client Job" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space>
            <Button onClick={handleDrawer}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {selectedApply ? 'Update' : 'Save'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateDailyApplyDrawer;
