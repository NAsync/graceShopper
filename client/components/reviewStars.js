import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

const ReviewStars = ({rating}) => {
  const convertToWidth = rating => {
    return `${Math.round(rating / 5 * 100 / 10) * 10}%`
  }
  const widthPercent = convertToWidth(rating)
  console.log(widthPercent)

  const starStyle = {width: widthPercent}

  return (
    // <div className="stars-outer">
    //   {/* <div className="stars-inner" style={starStyle}>
    //   <i class="fas fa-star"></i>
    //   </div> */}

    // </div>
    //<i className="fas fa-star"></i>
    <FontAwesomeIcon icon={faStar} className="stars-outer" />
  )
}

export default ReviewStars
