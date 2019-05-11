import 'react-native';
import React from 'react'
import renderer from 'react-test-renderer'
import { LoginForm } from '../app/pages/user/LoginForm.page';
import { RegisterForm } from '../app/pages/user/RegisterForm.page';
import { VerifyCodeForm } from '../app/pages/user/VerifyCodeForm.page';
import { NavigationActions } from 'react-navigation';

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
  const navigation = { getParam: jest.fn().mockReturnValue('jj.villegas47@gmail.com') };
  const tree = renderer.create(
    <VerifyCodeForm navigation={ navigation }/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});