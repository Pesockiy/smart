export const createTimeSlotsMock = () => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const timeFormatter = new Intl.DateTimeFormat('en-US', options);
  const timeArray = [];

  for (let i = 1; i <= 24; i++) {
    const time = new Date();
    time.setHours(i);
    time.setMinutes(0);
    time.setSeconds(0);
    const formattedTime = timeFormatter.format(time);
    timeArray.push(formattedTime);
  }

  return timeArray;
};
