import React, {Component} from 'react';
import './ColourDescription.css'

export default class ColourDescription extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
    return (nextProps.rgb !== this.props.rgb);
  }
  render() {
    return (
      <tr className="colourdescription-row">
        <td className="colourdescription-left" style={{backgroundColor: this.props.rgb}}></td>
        <td className="colourdescription-right" style={{borderColor: this.props.rgb}}>{this.props.rgb}</td>
      </tr>
    );
  }
}