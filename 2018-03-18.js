import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Select ,Redirect } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor () {
    super();
    this.state = {redirectToReferrer: false};
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单接收到的值:', values);
        let myFetchOptions = {
          method: 'GET'
        };
        fetch("http://localhost:8100/user/signin?userName="+values.userName+"&password="+values.password+"&identity="+values.identity,myFetchOptions)
          .then(response=>response.json().then(json=>{
            console.log('返回值:', json);
            if (values.identity == "admin") {
              this.setState({redirectToReferrer: true});
            }if (values.identity == "teacher") {

            }if (values.identity == "student") {

            }
          }))
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect push to="/index" />;
    }
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="学号/用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('identity', {
            rules: [{ required: true, message: '请确认你的身份' }],
          })(
            <Select
              showSearch
              placeholder="选择一个身份..."
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Select.Option value="student">学生</Select.Option>
                <Select.Option value="teacher">教师</Select.Option>
                <Select.Option value="admin">管理员</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm
