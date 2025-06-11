import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TimeSelector from "./TimeSelector";
import "react-calendar/dist/Calendar.css";
import "./BookingCalendar.module.css";

type BookingCalendarProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
};

const allTimeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookingCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: BookingCalendarProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const fetchBookedSlots = async () => {
        const dateStr =
          selectedDate.getFullYear() +
          "-" +
          String(selectedDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(selectedDate.getDate()).padStart(2, "0");
        const res = await fetch(`/api/bookings/slots?date=${dateStr}`);
        const data = await res.json();
        setBookedSlots(data.bookedSlots);
      };
      fetchBookedSlots();
      setSelectedTime("");
    }
  }, [selectedDate, setSelectedTime]);

  const availableSlots = allTimeSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return (
    <div className="border rounded-xl px-3 py-6 text-center flex flex-col items-center bg-white shadow-md">
      <h3 className="text-xl font-bold mb-4 text-[#c83589]">Choose a Date</h3>
      <Calendar
        onChange={(date) => {
          if (date instanceof Date) setSelectedDate(date);
        }}
        value={selectedDate}
        minDate={new Date()}
        tileDisabled={({ date }) => {
          const day = date.getDay();
          return !(day === 1 || day === 3 || day === 6);
        }}
        className="!border-0 !rounded-lg !shadow"
        prevLabel={<span className="text-[#c83589]">&lt;</span>}
        nextLabel={<span className="text-[#c83589]">&gt;</span>}
        tileClassName={({ date, view }) =>
          view === "month"
            ? "hover:bg-[#ffe4ef] transition rounded-lg"
            : undefined
        }
      />
      {selectedDate && (
        <TimeSelector
          availableSlots={availableSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      )}
    </div>
  );
}
