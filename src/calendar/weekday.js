import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import TimeList from './timeList'
import styled, {css} from 'styled-components'
import {ACTIVE_COLOR, INACTIVE_COLOR} from '../core/constants'

const BookedIndicator = styled.div`
  width: 100%;
  height: 0.3rem;

  ${props => css`
    background-color: ${props.booked ? ACTIVE_COLOR : INACTIVE_COLOR}
  `}
`

const Weekday = ({day, available, booked}) => {
  return (
    <div className="w-full lg:w-24">
      <BookedIndicator 
        booked={available.length + booked.length !== 0} 
        className="mb-5"
      />
      <div className="text-xl my-1">
        {dayjs().day(day).format('dd').replace(/\.$/, '')}
      </div>
      <div className="text-lg mb-5">
        {dayjs().day(day).format('DD')}
      </div>
      <div>
        <TimeList 
          available={available} 
          booked={booked}
        />
      </div>
    </div>
  )
}

Weekday.propTypes = {
  day: PropTypes.number.isRequired,
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

export default Weekday
