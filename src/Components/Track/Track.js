import React from 'react';
import './Track.css';

export class Track extends React.Component {
    renderAction() {
        let button;
        if(this.props.isRemoval) {
            button = <button className="Track-action">-</button>
        } else {
            button = <button className="Track-action">+</button>
        }
        return button;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
};