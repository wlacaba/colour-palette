import React, {Component} from 'react';
import './RoundedUploadButton.css';

export default class RoundedUploadButton extends Component {

	render() {
		return (
			<label className="roundeduploadbutton-button"htmlFor={this.props.id}>
				{this.props.value}
				<input  
					type="file" 
					className="roundeduploadbutton-invisible"
					id={this.props.id} 
					accept="image/png image/jpeg" 
					onChange={(event) => this.props.onChange(event)}/>
			</label>
		);
	}
}