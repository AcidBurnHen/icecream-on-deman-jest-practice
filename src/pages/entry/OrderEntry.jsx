import Options from './Options';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Design your ice cream!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Ice Cream!</Button>
    </div>
  );
}
