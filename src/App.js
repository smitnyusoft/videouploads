import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import Button from '@mui/material/Button';
import axios from 'axios';

var URL = window.URL || window.webkitURL;
function App() {
  const [selectedFile, setSelectedFile] = useState('')
  const [blobFile, setBlobFile] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const onChangeHandler = (event) => {
    var blobUrl = URL.createObjectURL(event.target.files[0]);
    setVideoUrl(blobUrl)
    setSelectedFile(event.target.files[0])
  }

  const uploadFileHandler = () => {
    let formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('blobVideo', videoUrl)
    axios.post('http://localhost:4000/api/v1/upload-video/', formData)
      .then((response) => {
        console.log("response---->", response.data[0]);
        setBlobFile(response.data[0].data.blobVideo)
      }).catch((error) => {
        console.log('error--->', error);
      })
  }

  // useEffect(() => {
  //   console.log("--- useEffect ---");
  // }, [])
  return (
    <div className="App">
      <ReactPlayer
        className='react-player'
        width='50%'
        height='50%'
        //url={`http://localhost:4000/api/v1/upload-video/${videoUrl}`}
        url={videoUrl}
        playing={true}
        controls={true}
        //volume={5}
        muted={true}
      />
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          onChange={onChangeHandler}
        />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
          Choose Files
        </Button>
      </label>
      <div className="file-name">
        {selectedFile && selectedFile.length > 0 ? selectedFile.name : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!selectedFile}
        onClick={uploadFileHandler}
        >
        Upload
      </Button>
    </div>
  );
}

export default App;
