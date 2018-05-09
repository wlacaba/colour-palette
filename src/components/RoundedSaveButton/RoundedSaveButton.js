import React, {Component} from 'react';
import './RoundedSaveButton.css'

export default class RoundedSaveButton extends Component {
	savePalette = () => {
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
		let startX = 0;
		let startY = 0;
		let height = 240;
		let textY = 120;
		canvas.width = 1080;
		canvas.height = 1920;

		if (context) {
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.font = "48px sans-serif";

			this.props.colours.forEach(function(colour){
				context.fillStyle = colour;
				context.fillRect(startX, startY, canvas.width, height);
				startY += height;

				let r = parseInt(colour.slice(1,3), 16);
				let g = parseInt(colour.slice(3, 5), 16);
				let b = parseInt(colour.slice(5, 7), 16);
				let average = ((r + g + b)/3);

				if (average < 128) {
					context.fillStyle = 'white';
				}
				else {
					context.fillStyle = 'black';
				}

				context.fillText(colour, canvas.width / 2, textY);
				textY += height;
			});

			let image = canvas.toDataURL("image/jpeg;base64;");

			let download = document.createElement('a');
			download.innerHTML = "download image";
			download.addEventListener("click", function() {
				download.href = image;
				download.download = "ColourPalette.jpg";
			});
			download.click();
		}
		else {
			console.log("Context is null.");
			alert("Sorry! Something went wrong.");
		}
	}

  render() {
		return (
			<button className="roundedsavebutton-button" onClick={() => {this.savePalette()}}>SAVE</button>
		);
	}
}