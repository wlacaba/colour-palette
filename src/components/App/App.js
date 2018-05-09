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
        "#e3dad3","#c2b9bc","#a1b1bc","#94a4b1",
        "#a5a4a6","#b5a78a","#a38a8e","#a66b5c",
        "#798e9e","#6f7f8b","#676c75","#4b5f6e",
        "#585648","#3f3e3c","#39251c","#141717"]
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
    console.log("App rendered");

    return (
      <div className="app">
        <header>
          <h1>Welcome to Colour Palette!</h1>
          <RoundedUploadButton id="upload" value="UPLOAD" onChange={this.handleUpload}/>
        </header>

        <UploadedImage url={this.state.url} updateColours={this.handleColourChange}/>
        <Palette colours={this.state.colourPalette}/>

        <footer>
          <p>Made by Warren Lacaba.</p>
        </footer>
      </div>
    );
  }
}
