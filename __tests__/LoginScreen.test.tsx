// Component tests: render a screen and interact with it like a user would.
import { render, screen, userEvent } from '@testing-library/react-native';

import { LoginScreen } from '../src/LoginScreen';

describe('LoginScreen', () => {
  it('shows an error when you submit an empty form', async () => {
    const onLogin = jest.fn();
    const user = userEvent.setup();
    await render(<LoginScreen onLogin={onLogin} />);

    await user.press(screen.getByRole('button', { name: 'Log in' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your email and password.');
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('logs in with a valid email and password', async () => {
    const onLogin = jest.fn();
    const user = userEvent.setup();
    await render(<LoginScreen onLogin={onLogin} />);

    await user.type(screen.getByLabelText('Email'), 'student@school.nl');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.press(screen.getByRole('button', { name: 'Log in' }));

    expect(onLogin).toHaveBeenCalledWith('student@school.nl');
  });
});
