import { render, screen } from '@testing-library/react';
import { App, AboutPage } from './App';
import { Login } from './login';

test('aboutPage Route displays with created by content', () => {
  render(<AboutPage />);
  const heading = screen.getByRole('heading', {name: "created by Kimberley Rogers"});
  expect(heading).toBeInTheDocument();
});

test('Login or SignUp page appears', () => {
  render (<Login />);
  const text = screen.getByText('create an account');
  expect(text).toBeInTheDocument();
})