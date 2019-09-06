import React, { Component } from 'react';

class SearchHeader extends Component {
    state = {
        locTitle: ""
    }
    render() {

        const { locTitle } = this.state;

        return (
            <div className="header">
                <input
                    className="input input--text"
                    placeholder={"Choose a location.."}
                    value={locTitle}
                    onChange={event => this.setState({ locTitle: event.target.value })}
                />
                <button className="button button--primary" onClick={() => this.props.handleLocation(locTitle)}> Go to location </button>
            </div>
        );
    }
}

export default SearchHeader;