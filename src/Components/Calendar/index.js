import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';

class Calendar extends Component {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false
    }

    constructor(props){
        super();
            this.width = props.width || "350px";
            this.style = props.style || {};
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    month = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.get("D");
    }
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

    render(){
        let weekDays = this.weekdaysShort.map((day) => {
            return(
                <td key={day} className="week-day">{day}</td>
            )
        });
        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(<td className="emptySlot">{""}</td>)
        }
        console.log("blanks: ", blanks);
        let daysInMonth = [];
        for(let d = 0; d < this.daysInMonth(); d++){
            let className = (d == this.currentDate() ? "day current-day": "day");
            daysInMonth.push(
                <td key={d} className={className}>
                    <span>{d}</span>
                </td>
            );
        }
        console.log("days: ", daysInMonth);
        let trElems = [];
        return(
            <div className="calendar-container">
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header"></tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekDays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calendar;