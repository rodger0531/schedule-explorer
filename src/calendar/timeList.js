import React from 'react'
import PropTypes from 'prop-types'
import TimeSlot from './timeSlot'
import dayjs from 'dayjs';

const TimeList = ({available, booked}) => {

  const mergeList = (() => {
    return available.concat(booked).sort((a,b)=> a.start - b.start)
  })()

  return (
    <div>
      {
        mergeList.map(time => (
          <TimeSlot 
            booked={time.booked}
            key={time.start}
            start={time.start} 
            end={time.end}
          />
        ))
      }
    </div>
  )
}

TimeList.propTypes = {
  available: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(dayjs).isRequired,
      end: PropTypes.instanceOf(dayjs).isRequired
    }),
  ),
  booked: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(dayjs).isRequired,
      end: PropTypes.instanceOf(dayjs).isRequired
    }),
  )
}

export default TimeList
