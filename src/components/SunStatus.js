import React, { Component } from "react";

import axios from "axios";
import moment from "moment";

class SunStatus extends Component {
  state = {
    dayStart: undefined,
    dayEnd: undefined,
    error: undefined,
    isLoading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {

      //gets sun time
      axios
        .get(
          `https://api.sunrise-sunset.org/json?lat=${this.props.location.lat}&lng=${this.props.location.lng}&formatted=0`
        )
        .then(response =>
          this.setState({
            dayStart: moment(response.data.results.civil_twilight_begin).unix(),
            dayEnd: moment(response.data.results.civil_twilight_end).unix(),
          })
          )
        .catch(error => this.setState({ error, isLoading: false }));
      
    }
  }


  render() {
    const { title } = this.props;
    const { dayStart, dayEnd } = this.state;
    const now = moment().unix();
    const sunStatus = (dayStart < now && dayEnd > now) ? "day" : "night";

    return (
      <React.Fragment>
      {title && (
      <div className="notify notify--active" >
            <p>It is</p> 
            <p className="notify__highlight">{sunStatus}</p>
            <p>in</p>
            <p className="notify__highlight">{title}</p>
            <p>now.</p>
        </div>
        )}
        {!title && (
          <div className="notify notify--inactive">
            <p>Please select a location. </p>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default SunStatus;
