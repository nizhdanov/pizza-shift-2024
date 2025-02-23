import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';

import { useOrdersPage } from './_hooks/useOrdersPage';

export const OrdersPage = () => {
  const { pizzaOrdersQuery } = useOrdersPage();

  return (
    <main className='container mt-6 space-y-4 md:mt-12'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Статус</TableHead>
            <TableHead>Адрес доставки</TableHead>
            <TableHead>Состав заказа</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pizzaOrdersQuery.data?.orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.status}</TableCell>
              <TableCell>{`ул. ${order.receiverAddress.street}, д. ${order.receiverAddress.house}, кв. ${order.receiverAddress.apartment}`}</TableCell>
              <TableCell>-</TableCell>
              <TableCell className='text-muted-foreground underline underline-offset-4'>
                подробнее
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};
