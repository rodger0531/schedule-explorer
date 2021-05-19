import React from 'react'
import {CALENDAR_TIMESLOT_INTERVAL} from '../core/constants'
import IndividualSlot from './individualSlot'

const TimeSlot = ({start, end, booked=false}) => {

  const slots = (() => {
    const numberOfIntervals = end.diff(start, 'minute') / CALENDAR_TIMESLOT_INTERVAL
    let list = [];
    for(let i=0;i<numberOfIntervals;i++){
      list.push(start.add(CALENDAR_TIMESLOT_INTERVAL * i, 'minute').format('HH:mm'))
    }
    return list
  })()

  return (
    <div className="flex flex-col">
      {
        slots.map(time=>(
          <IndividualSlot
            key={time}
            time={time}
            booked={booked}
          />
        ))
      }
      
    </div>
  )
}

export default TimeSlot
