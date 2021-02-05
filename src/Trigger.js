import React, {useState} from 'react';
import plus from './plus_icon.png';

class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="custom_trigger">
                <div className="section">{this.props.trigger_name}</div>
                <img className="profile_image" src={plus} alt="" />
            </div>
        );
    }
}

export default Trigger;
