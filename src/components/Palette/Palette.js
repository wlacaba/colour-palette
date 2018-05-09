import React, {Component} from 'react';
import ColourDescription from '../ColourDescription/ColourDescription'
import './Palette.css'

export default class Palette extends Component {
  render() {
    let i = 0;
    return (
      <table className="palette-table" cellSpacing="0">
        <tbody>
          {this.props.colours.map(colour => <ColourDescription key={i++} rgb={colour}/>)}
        </tbody>
      </table>
    );
  }
}