import React from 'react';
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {



  const formatSpots = (spots) => {
    let text = ''
    if (spots === 0) {
      text = 'no spots remaining'
    } else if (spots === 1) {
      text = '1 spot remaining'
    } else {
      text = spots + " spots remaining"
    }
    return text
  }

  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  return (

    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}