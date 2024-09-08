import { useQuery } from "@tanstack/react-query";

export function useBooking() {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, error };
}
