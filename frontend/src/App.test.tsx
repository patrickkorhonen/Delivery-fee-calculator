import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './components/calculator';
import userEvent from '@testing-library/user-event';

test('fee is correct and shown', async () => {
  render(<Calculator />);
  const cart = screen.getByLabelText(/Cart value/i);
  const distance = screen.getByLabelText(/Delivery distance/i);
  const items = screen.getByLabelText(/Number of items/i);
  const time = screen.getByLabelText(/Order Date & Time/i);
  const fee = screen.getByTestId("fee");

  fireEvent.change(cart, {target: {value: "10"}})
  fireEvent.change(distance, {target: {value: "1000"}})
  fireEvent.change(items, {target: {value: "5"}})
  fireEvent.change(time, {target: {value: "2024-01-01T10:00"}})

  await userEvent.click(screen.getByRole("button"))

  expect(Number(fee.textContent)).toEqual(2.5)
});

test('fee is correct and shown when rush hour', async () => {
  render(<Calculator />);
  const cart = screen.getByLabelText(/Cart value/i);
  const distance = screen.getByLabelText(/Delivery distance/i);
  const items = screen.getByLabelText(/Number of items/i);
  const time = screen.getByLabelText(/Order Date & Time/i);
  const fee = screen.getByTestId("fee");

  fireEvent.change(cart, {target: {value: "10"}})
  fireEvent.change(distance, {target: {value: "1000"}})
  fireEvent.change(items, {target: {value: "5"}})
  fireEvent.change(time, {target: {value: "2024-01-05T16:00"}})

  await userEvent.click(screen.getByRole("button"))

  expect(Number(fee.textContent)).toEqual(3)
});

test('fee is not shown when input is faulty', async () => {
  render(<Calculator />);
  const cart = screen.getByLabelText(/Cart value/i);
  const distance = screen.getByLabelText(/Delivery distance/i);
  const items = screen.getByLabelText(/Number of items/i);
  const time = screen.getByLabelText(/Order Date & Time/i);
  const fee = screen.getByTestId("fee");

  fireEvent.change(cart, {target: {value: "-10"}})
  fireEvent.change(distance, {target: {value: "-1000"}})
  fireEvent.change(items, {target: {value: "5.4"}})
  fireEvent.change(time, {target: {value: "2024-01-01T10:00"}})

  await userEvent.click(screen.getByRole("button"))

  expect(fee.textContent).toEqual("")
});
