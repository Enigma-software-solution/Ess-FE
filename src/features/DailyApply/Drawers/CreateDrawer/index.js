import React, { useEffect } from 'react';
import { Form, Row, Col, Input, Space, Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createDailyAppliesApi, updateDailyAppliesApi } from 'src/store/slices/dailyApplySlice/apis';
import { getProfilesApi } from 'src/store/slices/profielSlice/apis';
import { getAllProfiles } from 'src/store/slices/profielSlice/selectors';
import { getUserId } from 'src/store/slices/authSlice/selectors';
import { getSelectedApply } from 'src/store/slices/dailyApplySlice/selectors';
import CustomSelect from 'src/components/formElements/CustomSelect';
import { platformOptions } from 'src/constant/platformOptions';
import { applyPosition } from 'src/constant/applyPosition';
import CustomInput from 'src/components/formElements/CustomInput';


const initialFormValues = {
  clientJobPosition: '',
  clientName: '',
  link: localStorage.getItem('link') || '',
  profile: '',
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
    if (!allProfiles) {
      dispatch(getProfilesApi());
    }
  }, []);

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

      <Form form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <CustomInput
              label="Client Name"
              name="clientName"
              placeholder="Please enter Client name"
              rules={[{ required: true, message: 'Please enter Client name' }]}
              type="text"
            />
          </Col>
          <Col span={12}>
            <CustomInput
              label="Link"
              name="link"
              placeholder="Please enter link"
              rules={[{ required: true, message: 'Please enter link' }]}
              type="text"
            />
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <CustomInput
              label="Profile"
              name="profile"
              placeholder="Please select profile "
              rules={[{ required: true, message: 'Please enter link' }]}
              component={CustomSelect}
              options={allProfiles}
              valueField='_id'
              labelField='name'
            />
          </Col>

          <Col span={12}>
            <CustomInput
              name="platform"
              label="Platform"
              rules={[{ required: true, message: 'Please select a Platform' }]}
              component={CustomSelect}
              options={platformOptions}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <CustomInput
              name="positionToApply"
              label="Position"
              rules={[
                { required: true, message: 'Please select the Position for applying' },
              ]}
              component={CustomSelect}
              options={applyPosition}
            />
          </Col>
          <Col span={12}>

            <CustomInput
              name="clientJobPosition"
              label="Client Job Position"
              placeholder="Please enter Client Job"
              rules={[{ required: true, message: 'Please enter link' }]}
              type="text"
            />
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
