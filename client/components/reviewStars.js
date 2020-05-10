import React, {Component} from 'react'

const ReviewStars = ({rating}) => {
  const convertToWidth = rating => {
    return `${Math.round(rating / 5 * 100 / 10) * 10}%`
  }
  const widthPercent = convertToWidth(rating)
  const starStyle = {width: widthPercent}

  return (
    <div className="stars-outer">
      <div className="stars-inner" style={starStyle} />
    </div>
  )
}

export default ReviewStars
