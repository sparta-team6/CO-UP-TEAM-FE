import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/CalendarEL.css";

const CalendarEL = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="w-full h-[332px] bg-[#ffffff] dark:bg-7 border-[#D7DCE5] dark:border-[#666666] border-[1px] border-solid md:w-full md:h-full sm:h-full md:mt-4 rounded-xl flex justify-center items-center">
      <Calendar
        onChange={onChange}
        value={value}
        locale={"ko"}
        showNeighboringMonth={false}
        prev2Label={null}
        next2Label={null}
        minDetail="month"
        maxDetail="month"
        formatDay={(locale, date) => moment(date).format("D")}
        calendarType={"US"}
      />
    </div>
  );
};

export default CalendarEL;
