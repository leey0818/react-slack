import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Header, Input, Label, Button, LinkContainer, Error } from './styles';

const isBlank = (value: string) => value.trim() === '';

const SignUp = () => {
  const history = useHistory();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [mismatchPassword, setMismatchPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidField, setInvalidField] = useState('');
  const [signUpError, setSignUpError] = useState('');

  useEffect(() => {
    if (!isBlank(password) && !isBlank(passwordCheck)) {
      setMismatchPassword(password !== passwordCheck);
    } else {
      setMismatchPassword(false);
    }
  }, [password, passwordCheck]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // 항목 입력 확인
      let blankField = '';
      if (isBlank(email)) blankField = '이메일';
      else if (isBlank(nickname)) blankField = '닉네임';
      else if (isBlank(password)) blankField = '비밀번호';
      else if (isBlank(passwordCheck)) blankField = '비밀번호 확인';

      // 하나라도 입력하지 않았으면, 회원가입 처리안함
      if (blankField) {
        setInvalidField(blankField);
        return;
      } else {
        setInvalidField('');
      }

      // 입력한 두 비밀번호가 동일하지 않으면 처리안함
      if (mismatchPassword) return;

      // 회원가입 처리
      const data = {
        email,
        nickname,
        password,
      };

      setLoading(true);
      setSignUpError('');

      axios
        .post('/api/users', data)
        .then(() => {
          alert('회원가입 되었습니다. 로그인 페이지로 이동합니다.');
          setLoading(false);
          history.push('/login');
        })
        .catch(err => {
          setLoading(false);
          setSignUpError(err.response?.data);
        });
    },
    [email, nickname, password, passwordCheck, mismatchPassword]
  );

  return (
    <div>
      <Header>React Slack</Header>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일 주소</span>
          <div>
            <Input type="email" name="email" value={email} disabled={loading} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label>
          <span>닉네임</span>
          <div>
            <Input type="text" name="nickname" value={nickname} disabled={loading} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label>
          <span>비밀번호</span>
          <div>
            <Input type="password" name="password" value={password} disabled={loading} onChange={onChangePassword} />
          </div>
        </Label>
        <Label>
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              disabled={loading}
              onChange={onChangePasswordCheck}
            />
          </div>
        </Label>
        {mismatchPassword && <Error>비밀번호가 일치하지 않습니다.</Error>}
        {invalidField && <Error>{invalidField} 항목을 입력해 주세요.</Error>}
        {signUpError && <Error>{signUpError}</Error>}
        <Button type="submit" disabled={loading}>
          회원가입
        </Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
