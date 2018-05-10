import React, {Component} from 'react';
import '../../logic/ColourProcessor';
import './UploadedImage.css'
import {medianCut} from '../../logic/ColourProcessor';

export default class UploadedImage extends Component {
  /**
  * Make a canvas in memory in order to extract ImageData about the img.
  */
  analyzeImage = () => {
    let myCanvas = document.createElement('canvas');
    let context = myCanvas.getContext('2d');
    let img = document.getElementById('uploaded');

    img.onload = () => {
      let ratio = img.height/img.width;
      myCanvas.width = 200;
      myCanvas.height = ratio * 200;

      /**
       * This is an incredibly weird fix for the black bar issue. Probably not
       * a permanent fix, but it works for now.
       * 
       * BEFORE: Using the existing <img> would result in a weird stretching that puts a
       * black bar at the bottom of the canvas when uploading a vertical image shot with 
       * an iOS device. Something weird about how Apple orients their images? Trying to 
       * transform and rotate wasn't fixing it.
       * 
       * AFTER: Creating an <img> in memory and assigning the exact same source as the
       * pre-existing <img> will get rid of this somehow. It's still stretching in the canvas
       * in a weird way, but without black bars. It now stretches in a way that fills the
       * canvas fully, so at least the colour data is preserved (not like the user sees
       * the canvas with the messed up photo anyway, it's only used to analyze colours).
       */
      let newImg = document.createElement('img');
      newImg.src = this.props.url;

      context.drawImage(newImg, 0, 0, myCanvas.width, myCanvas.height);
      let myData = context.getImageData(0, 0, myCanvas.width, myCanvas.height);
      let theColours = myData.data;

      let rgbValues = []

      for (let i = 0; i < theColours.length; i+=4){
        let entry = [theColours[i], theColours[i+1], theColours[i+2]];
        rgbValues.push(entry);
      }

      let newPalette = [];

      //Used this to check what was being drawn to the canvas
      //window.open(myCanvas.toDataURL("image/jpeg"));
      
      medianCut(rgbValues, 3, 0, newPalette);
      this.props.updateColours(newPalette);
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props.url !== nextProps.url;
  }

  //Only perform image analysis when we're sure the component updated. 
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    this.analyzeImage();
  }

  render() {
    return (
      <img src={this.props.url} id="uploaded" alt="Uploaded"/>
    );
  }
}