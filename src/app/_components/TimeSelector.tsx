type TimeSelectorProps = {
  availableSlots: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
};

export default function TimeSelector({
  availableSlots,
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
  return (
    <div className="mt-4">
      <label className="block mb-2 font-semibold text-gray-700">
        Select a time:
      </label>
      <select
        className="w-full border rounded px-3 py-2"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">-- Choose a time --</option>
        {availableSlots.length === 0 && (
          <option disabled>No times available</option>
        )}
        {availableSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
}