import React, {Component} from 'react';
import './ColourDescription.css'

export default class ColourDescription extends Component {
  render() {
    return (
      <tr className="holder">
        <td className="left" style={{backgroundColor: this.props.rgb}}></td>
        <td className="right" style={{borderColor: this.props.rgb}}>{this.props.rgb}</td>
      </tr>
    );
  }
}