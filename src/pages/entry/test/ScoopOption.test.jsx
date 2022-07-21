import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('indicate if scoop count is non-int or out of range', async () => {
  render(<ScoopOption name='' imagePath='' updateItemCount={jest.fn()} />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  // is-invalid class is coming from react-bootstrap
  expect(vanillaInput).toHaveClass('is-invalid');

  // expect input to be invalid with a decimal
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // expect input to be invalid if it's too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');
});
