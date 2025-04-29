import React, { useState } from "react";
import "./CalendarPage.css";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const getDaysInMonth = (monthIndex, year = new Date().getFullYear()) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

const CalendarPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [days, setDays] = useState([]);
  const [plans, setPlans] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const handleMonthClick = (month, index) => {
    setSelectedMonth(month);
    setSelectedDay(null);
    const numDays = getDaysInMonth(index);
    setDays(Array.from({ length: numDays }, (_, i) => i + 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handlePlanChange = (value, isDayPlan = false) => {
    setPlans(prev => {
      const updated = { ...prev };
      if (isDayPlan) {
        updated[selectedMonth] = updated[selectedMonth] || { monthPlan: "", days: {} };
        updated[selectedMonth].days[selectedDay] = value;
      } else {
        updated[selectedMonth] = updated[selectedMonth] || { monthPlan: "", days: {} };
        updated[selectedMonth].monthPlan = value;
      }
      return updated;
    });
  };

  const getCurrentMonthPlan = () =>
    plans[selectedMonth]?.monthPlan || "";

  const getCurrentDayPlan = () =>
    plans[selectedMonth]?.days?.[selectedDay] || "";

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Calendar</h1>
      <div className="months-grid">
        {months.map((month, index) => (
          <div
            key={month}
            className={`month-card ${selectedMonth === month ? "selected" : ""}`}
            onClick={() => handleMonthClick(month, index)}
          >
            {month}
          </div>
        ))}
      </div>

      {selectedMonth && (
        <div className="month-display">
          <h2>{selectedMonth}</h2>

          <div className="days-grid">
            {days.map(day => (
              <div
                key={day}
                className={`day-card ${selectedDay === day ? "active-day" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
          </div>

          {selectedDay ? (
            <div className="planner-box">
              <h3>Plan for {selectedMonth} {selectedDay}</h3>
              <textarea
                className="planner-textarea"
                value={getCurrentDayPlan()}
                onChange={e => handlePlanChange(e.target.value, true)}
                placeholder={`Write plan for ${selectedMonth} ${selectedDay}...`}
              />
            </div>
          ) : (
            <div className="planner-box">
              <h3>Monthly Plan for {selectedMonth}</h3>
              <textarea
                className="planner-textarea"
                value={getCurrentMonthPlan()}
                onChange={e => handlePlanChange(e.target.value, false)}
                placeholder={`Write plan for ${selectedMonth}...`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
