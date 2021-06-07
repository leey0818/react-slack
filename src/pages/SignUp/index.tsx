import React from 'react';
import { Form, Header, Label } from './styles';

const SignUp = () => {
  return (
    <div>
      <Header>React Slack</Header>
      <Form>
        <Label>
          <span>이메일 주소</span>
          <div>
            <input type="email" name="email" />
          </div>
        </Label>
      </Form>
    </div>
  );
};

export default SignUp;
