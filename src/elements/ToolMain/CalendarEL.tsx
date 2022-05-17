import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarEL.css";

const CalendarEL = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="w-[390px] h-[348px] bg-white rounded-xl shadow-xl flex justify-center items-center">
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
