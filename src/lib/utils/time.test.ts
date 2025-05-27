import { parseTimeString } from "./time";

test("parses 12:30 PM", () => {
  expect(parseTimeString("12:30 PM")).toEqual({ hours: 12, minutes: 30 });
});
test("parses 12:00 AM", () => {
  expect(parseTimeString("12:00 AM")).toEqual({ hours: 0, minutes: 0 });
});
test("returns null for invalid", () => {
  expect(parseTimeString("not a time")).toBeNull();
});