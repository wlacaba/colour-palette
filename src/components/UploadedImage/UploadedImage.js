import React, {Component} from 'react';
import '../../logic/ColourProcessor';
import './UploadedImage.css'
import {medianCut} from '../../logic/ColourProcessor';

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
      let ratio = img.height/img.width;
      myCanvas.width = 150;
      myCanvas.height = ratio*150;

      context.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
      let myData = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
      let theColours = myData.data;
      let i = 0;

      let rgbValues = []

      for (i; i < theColours.length; i+=4){
        let entry = [theColours[i], theColours[i+1], theColours[i+2]];
        rgbValues.push(entry);
      }
      let newPalette = [];
      medianCut(rgbValues, 4, 0, newPalette);
      this.props.updateColours(newPalette);
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