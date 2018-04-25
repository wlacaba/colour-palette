import React, {Component} from 'react';
import './RoundedUploadButton.css';

export default class RoundedUploadButton extends Component {

	render() {
		return (
			<label htmlFor={this.props.id}>
				{this.props.value}
				<input  
					type="file" 
					id={this.props.id} 
					accept="image/png image/jpeg" 
					onChange={(event) => this.props.onChange(event)}/>
			</label>
		);
	}
}