/**
 * This function converts a time in the format HH:MM to minutes
 * 
 * @param time in the format of HH:MM
 * @returns interger with the minutes
 */
export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}