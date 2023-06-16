import { useCart } from "../../../hooks/customHooks";

const OrderFinished = () => {
  const { orderId } = useCart();
  return <div style={{marginTop: '300px'}}>THE ORDER {orderId} WAS FINISHED</div>;
};

export default OrderFinished;
