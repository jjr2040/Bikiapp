import 'react-native';
import React from 'react'
import renderer from 'react-test-renderer'
import { LoginForm } from '../app/pages/user/LoginForm.page';

jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});