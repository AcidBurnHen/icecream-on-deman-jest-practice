import { screen, render } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('Update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // Make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal again
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('Update toppings total when toppings change', async () => {
  render(<Options optionType='toppings' />);

  // Make sure the total starts out at 0.00
  const toppingSubtotal = await screen.findByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // update mochi toppings to 1 and check subtotal
  const mochiCheckbox = await screen.findByRole('checkbox', {
    name: 'Mochi',
    exact: false,
  });
  userEvent.click(mochiCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  // update cherries topping to 2 and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('3.00');

  // remove one checkbox and check if it's removed from subtotal
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent('1.50');
});
