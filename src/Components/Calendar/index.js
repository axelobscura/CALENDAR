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
            this.style.width = this.width;
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

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
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dataContext = Object.assign({}, this.state.dateContext);
        dataContext = moment(dataContext).set("month", monthNo);
        this.setState({
            dateContext: dataContext
        });
    }
    onSelectChange = (e, data) => {
        this.setMonth(data);
    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return(
                <div key={data}>
                    <a href="#" onClick={(e) => {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        });
        
        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        })
    }

    MonthNav = () => {
        return(
            <span className="label-month"
                onClick={(e) => {this.onChangeMonth(e, this.month())}}
            >
                {this.month()}
                {this.state.showMonthPopup &&
                    <this.SelectList data={this.months} />
                }
            </span>
        )
    }

    render(){
        let weekDays = this.weekdaysShort.map((day) => {
            return(
                <td key={day} className="week-day">{day}</td>
            )
        });
        let blanks = [];
        for(let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(<td key={i*80} className="emptySlot">{""}</td>)
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
        let totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if((i % 7) !== 0){
                cells.push(row);
            }else{
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if(i === totalSlots.length -1){
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        })
        let trElems = rows.map((d, i) => {
            return(
                <tr key={i*100}>{d}</tr>
            )
        });
        return(
            <div className="calendar-container" style={this.style}>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <this.MonthNav />
                            </td>
                        </tr>
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