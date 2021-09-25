import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Form, Label, Input, Button, LinkContainer, Error } from './styles';

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      setLoading(true);
      setLoginError('');

      const data = { email, password };
      axios
        .post('/api/users/login', data)
        .then(res => {
          alert(`${res.data.nickname}님, 환영합니다!`);
        })
        .catch(err => {
          setLoginError(err.response?.data || '이메일 혹은 비밀번호가 일치하지 않습니다.');
        })
        .finally(() => setLoading(false));
    },
    [email, password]
  );

  return (
    <div>
      <Header>React Slack</Header>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일</span>
          <div>
            <Input type="email" name="email" value={email} disabled={loading} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label>
          <span>비밀번호</span>
          <div>
            <Input type="password" name="password" value={password} disabled={loading} onChange={onChangePassword} />
          </div>
        </Label>
        {loginError && <Error>{loginError}</Error>}
        <Button type="submit" disabled={loading}>
          로그인
        </Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
