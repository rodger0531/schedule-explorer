import React from 'react'
import PropTypes from 'prop-types'
import {ACTIVE_COLOR, INACTIVE_COLOR} from '../core/constants'

const IndividualSlot = ({time, booked}) => {
  return (
    <div 
      className={`${booked?'':'font-bold'} my-1`}
      style={{color: booked ? INACTIVE_COLOR : ACTIVE_COLOR}}
    >
        {time}
    </div>
  )
}

IndividualSlot.propTypes = {
  time: PropTypes.string.isRequired,
  booked: PropTypes.bool.isRequired
}

export default IndividualSlot
