import React from 'react'
import styled, {css} from 'styled-components'
import dayjs from "dayjs";
import i18n from '../i18n';
import timezone from 'dayjs/plugin/timezone';

const Button = styled.button`
  border: 1px solid #dcdfe6;
  border-radius: 0.3rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 3rem;
  height: 2rem;

  ${props => props.left && css`
    border-radius: 0.3rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}
`
dayjs.extend(timezone)

const CalendarControls = ({currentWeek, setCurrentWeek}) => {
  
  const updateList = method => {
      setCurrentWeek(currentWeek[method](7,'days'))
  }

  return (
    <div className="w-full mb-5">
      <div className="items-center inline-block float-left">
        <Button
          left
          disabled={dayjs().startOf('week').toISOString() === currentWeek.startOf('week').toISOString()}
          className="disabled:opacity-30 inline-block"
          type="button"
          onClick={()=>updateList('subtract')}
        >
          {'<'}
        </Button>
        <Button 
          type="button"
          className="inline-block"
          onClick={()=>updateList('add')}
        >
          {'>'}
        </Button>
        <div className="ml-3 text-lg inline-block">
          {`${currentWeek.startOf('week').format('YYYY/MM/DD')} - ${currentWeek.endOf('week').format('DD')}`}
        </div>
      </div>
      <span className="text-sm inline-block float-right flex items-center h-full">
        {i18n.t('timezoneWarning',{0: `${dayjs.tz.guess()} (GMT${dayjs().format('Z')})`})}
      </span>
    </div>
  )
}

export default CalendarControls
