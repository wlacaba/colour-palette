import React, {Component} from 'react';
import './UploadedImage.css'

export default class UploadedImage extends Component {

  analyzeImage = () => {
    let myCanvas = document.createElement('canvas');
    let context = myCanvas.getContext('2d');
    let img = document.getElementById('uploaded');

    img.onload = () => {
      myCanvas.width = img.width;
      myCanvas.height = img.height;

      context.drawImage(img, 0, 0);
      let myData = context.getImageData(0, 0, img.width, img.height);
      console.log(myData); //Do work here
    }
  }

  //Reanalyze when a new image comes in
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    this.analyzeImage();
  }

  render() {
    return (
      <img src={this.props.url} id="uploaded" alt="Uploaded"/>
    );
  }
}