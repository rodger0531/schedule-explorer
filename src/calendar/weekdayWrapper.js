import React from 'react'
import PropTypes from 'prop-types'
import Weekday from './weekday';
import dayjs from "dayjs";
import {WEEKDAY_ORDER} from '../core/constants'


const WeekdayWrapper = ({dates: {available, booked}}) => {

  const splitIntoWeekdays = (data, booked) => {
    let len = data.length;
    let i = 0;
    const currentTime = dayjs()
    return WEEKDAY_ORDER.map((day)=>{
      let session = [];
      while(i<len && dayjs(data[i].start).day() === day){
        // Filter out slots before current user time
        if(dayjs(data[i].start).isAfter(currentTime)){
          session.push({
            start: dayjs(data[i].start),
            end: dayjs(data[i].end),
            booked: booked
          })
        }
        i++
      }
      return session
    })
  }

  const availableDates = splitIntoWeekdays(available, false)
  const bookedDates = splitIntoWeekdays(booked, true)
  return (
    <div className="grid grid-cols-7 gap-4 w-full">
      {
        WEEKDAY_ORDER.map((weekday, idx) => {
          return (
            <Weekday 
              key={weekday}
              available={availableDates[idx]}
              booked={bookedDates[idx]}
              day={weekday}
            />
          );
        })
      }
    </div>
  )
}

WeekdayWrapper.propTypes = {
  dates: PropTypes.shape({
    available: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
      }),
    ),
    booked: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
      }),
    )
  }).isRequired
}

export default WeekdayWrapper
