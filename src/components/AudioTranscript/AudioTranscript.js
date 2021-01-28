import React, { Component } from 'react'
import '../AudioTranscript/style.css'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


function AudioTranscript(props) {

    const TranscriptData = props.transcriptData.transcript
    
    return (
        <div>
            <h3>Audio Transcript</h3>
            <ContextMenuTrigger id={create_UUID}>
                <p className="text-left paragraph-style">{String(TranscriptData).toUpperCase()}</p>
            </ContextMenuTrigger>

            <ContextMenu id={create_UUID}>
                <MenuItem onClick={handleClick}>
                    <button class="btn btn-md btn-info">REDACT</button>
                </MenuItem>
            </ContextMenu>
        </div>
    )
}

function handleClick() {
    document.onmouseup = () => {
        console.log(window.getSelection().toString());
      };
  }

function create_UUID(){
    
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    console.log(uuid)
    return uuid;
}

export default AudioTranscript
