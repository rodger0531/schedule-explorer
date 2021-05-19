import React, {useEffect, useState}  from 'react'
import axios from 'axios'
import WeekdayWrapper from './weekdayWrapper';
import dayjs from "dayjs";
import CalendarControls from './calendarControls';
import i18n from '../i18n';
import {SUPPORTED_LANGUAGE_CODES} from '../core/constants'

const Calendar = () => {
  
  const [dates, setDates] = useState({available: [], booked: []});
  const [currentWeek, setCurrentWeek] = useState(dayjs());

  const getAvailableTimes = date => {
    const startOfWeek = date.startOf('week').toISOString()
    axios.get('/tutor/schedule', {
        params: {
          startDate: startOfWeek
        }
      })
      .then(({data})=>{    
        setDates(data)
      })
  }

  useEffect(()=>{
    getAvailableTimes(currentWeek)
  }, [currentWeek])

  const onChangeLang = e => {
    i18n.changeLanguage(e.target.value);
    dayjs.locale(e.target.value)
  }

  return (
    <div className="flex flex-col items-start md:w-192 w-full">
      <div className="w-full flex justify-end">
        <select onChange={onChangeLang}>
          {
            Object.entries(SUPPORTED_LANGUAGE_CODES).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))
          }
        </select>
      </div>
      <h1 className="text-3xl mb-5">{i18n.t('title.available')}</h1>
      <CalendarControls 
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <WeekdayWrapper dates={dates}/>
    </div>
  )
}

export default Calendar
