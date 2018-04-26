import React, {Component} from 'react';
import './UploadedImage.css'

export default class UploadedImage extends Component {
  /*
  Make a canvas in memory in order to extract ImageData about the img.
  I plan on passing the array (ImageData.data) to an outside .js file
  specifically for handling business logic, instead of this component
  doing the calculations.  
  */
  analyzeImage = () => {
    let myCanvas = document.createElement('canvas');
    let context = myCanvas.getContext('2d');
    let img = document.getElementById('uploaded');

    img.onload = () => {
      myCanvas.width = img.width;
      myCanvas.height = img.height;

      context.drawImage(img, 0, 0);
      let myData = context.getImageData(0, 0, img.width, img.height);
      console.log(myData.data); //Do work here
    }
  }

  //Only perform image analysis when we're sure the component updated. 
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    this.analyzeImage();
  }

  render() {
    console.log("UploadedImage rendered");
    return (
      <img src={this.props.url} id="uploaded" alt="Uploaded"/>
    );
  }
}