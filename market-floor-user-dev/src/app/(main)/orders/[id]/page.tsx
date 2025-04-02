import OrderDetailTemplate from "@/components/template/OrderDetail";

interface IOrderDetailPageProps {}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = (props) => {
  return <OrderDetailTemplate orderId={(props as any)?.params?.id} />;
};

export default OrderDetailPage;
