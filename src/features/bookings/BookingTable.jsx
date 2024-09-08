import BookingRow from "./BookingRow";
import { Table, TableBody, TableFooter, TableHeader } from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const columns = "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem";

  const { isLoading, bookings, error, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Table>
      <TableHeader columns={columns}>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </TableHeader>

      <TableBody
        data={bookings}
        columns={columns}
        render={(booking) => (
          <BookingRow columns={columns} key={booking.id} booking={booking} />
        )}
      />
      <TableFooter>
        <Pagination count={count} />
      </TableFooter>
    </Table>
  );
}

export default BookingTable;
