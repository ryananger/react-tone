import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'
import * as Tone from 'tone';
import App from './components/App.jsx';
import init from  './init.js';

var all = init.allNotes();

window.Tone = Tone;
window.App = <App allNotes={all}/>;

var container = document.getElementById('app');
var root = createRoot(container);
root.render(window.App);