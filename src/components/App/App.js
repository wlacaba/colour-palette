import React, { Component } from 'react';
import RoundedUploadButton from '../RoundedUploadButton/RoundedUploadButton'
import UploadedImage from '../UploadedImage/UploadedImage'
import RoundedSaveButton from '../RoundedSaveButton/RoundedSaveButton'
import ColourDescription from '../ColourDescription/ColourDescription'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      url: require("../../img/PortageAve-DefaultIMG.jpg"),
      colourPalette: []
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

  render() {
    console.log("App rendered");
    let colours = ['#66fcf1', '#ff1744', '#000930'];
    return (
      <div className="app">
        <header>
          <h1>Welcome to Colour Palette!</h1>
          <RoundedUploadButton id="upload" value="UPLOAD" onChange={this.handleUpload}/>
        </header>

        <UploadedImage url={this.state.url}/>
        {/*Just figuring out how I want stuff to look. Will make a component later.*/}
        <table cellSpacing="0">
          <tbody>
            {colours.map(colour => <ColourDescription rgb={colour}/>)}
          </tbody>
        </table>
        <RoundedSaveButton/>

        <footer>
          <p>Made by Warren Lacaba.</p>
        </footer>
      </div>
    );
  }
}
