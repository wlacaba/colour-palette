import React, { Component } from 'react';
import RoundedUploadButton from '../RoundedUploadButton/RoundedUploadButton'
import UploadedImage from '../UploadedImage/UploadedImage'
import Palette from '../Palette/Palette'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      url: require("../../img/Flowers-Default.jpg"),
      colourPalette: [
        "#d3cac8","#9aabb6","#ada598","#a57b75",
        "#748794","#596671","#4b4a42","#271e1a"
      ]
    }
  }

  handleUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];

    reader.onloadend = () => {
      //setState is asynchronous
      //Be careful of doing work that depends on the state being up to date
      this.setState({
        file: newFile,
        url: reader.result
      });
    }

    if (newFile) {
      let fileType = newFile.type;
      
      //A basic check for proper files, assuming proper file extensions
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        reader.readAsDataURL(newFile);
      }
      else
      {
        alert("Please upload a JPEG or PNG image!");
      }
    }
  } 

  handleColourChange = (newValues) => {
    this.setState({
      colourPalette: newValues
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Welcome to Colour Palette!</h1>
          <RoundedUploadButton id="upload" value="UPLOAD" onChange={this.handleUpload}/>
        </header>

        <UploadedImage url={this.state.url} updateColours={this.handleColourChange}/>
        <Palette colours={this.state.colourPalette}/>

        <footer>
          <p>Work in progress. Made by <a href="https://wlacaba.github.io">Warren Lacaba</a>, 2018.</p>
        </footer>
      </div>
    );
  }
}
