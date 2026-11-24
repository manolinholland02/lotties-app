import { render, screen, userEvent } from '@testing-library/react-native';

import { HomeScreen } from '../src/HomeScreen';

describe('HomeScreen', () => {
  it('adds a task and marks it as done', async () => {
    const user = userEvent.setup();
    await render(<HomeScreen email="student@school.nl" />);

    await user.type(screen.getByLabelText('New task'), 'Write tests');
    await user.press(screen.getByRole('button', { name: 'Add' }));

    const task = screen.getByRole('checkbox', { name: /Write tests/ });
    expect(screen.getByText('1 open')).toBeOnTheScreen();

    await user.press(task);
    expect(task).toBeChecked();
    expect(screen.getByText('0 open')).toBeOnTheScreen();
  });
});
