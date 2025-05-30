import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TimeSelector from "./TimeSelector";
import "react-calendar/dist/Calendar.css";

type BookingCalendarProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
};

const allTimeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function BookingCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: BookingCalendarProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      setBookedSlots(getBookedSlotsForDate(selectedDate));
      setSelectedTime(""); // Reset time when date changes
    }
  }, [selectedDate, setSelectedTime]);

  const availableSlots = allTimeSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return (
    <div className="border rounded px-3 py-4 text-center flex flex-col items-center">
      <Calendar
        onChange={(date, event) => {
          if (date instanceof Date) {
            setSelectedDate(date);
          }
        }}
        value={selectedDate}
        minDate={new Date()}
        tileDisabled={(props) => {
          const date = props.date;
          const day = date.getDay();
          return !(day === 1 || day === 3 || day === 6);
        }}
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

// Helper function
function getBookedSlotsForDate(date: Date): string[] {
  if (date.toISOString().slice(0, 10) === "2024-06-01") {
    return ["10:00", "13:00"];
  }
  return [];
}