import 'react-native';
import React from 'react'
import renderer from 'react-test-renderer'
import { LoginForm } from '../app/pages/user/LoginForm.page';
import { RegisterForm } from '../app/pages/user/RegisterForm.page';
import { VerifyCodeForm } from '../app/pages/user/VerifyCodeForm.page';

jest.useFakeTimers();

test('login renders correctly', () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('register renders correctly', () => {
  const tree = renderer.create(<RegisterForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('verify code renders correctly', () => {
  const tree = renderer.create(<VerifyCodeForm />).toJSON();
  expect(tree).toMatchSnapshot();
});