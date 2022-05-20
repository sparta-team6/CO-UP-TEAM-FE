import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarEL.css";

const CalendarEL = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="w-full h-[304px] border border-solid md:w-full md:h-full sm:h-full md:mt-4 bg-white rounded-xl flex justify-center items-center">
      <Calendar
        onChange={onChange}
        value={value}
        locale={"en"}
        showNeighboringMonth={false}
        prev2Label={null}
        next2Label={null}
        calendarType={"US"}
      />
    </div>
  );
};

export default CalendarEL;
