import React from 'react';
import * as Tone from 'tone';

import Song from './Song.jsx';
import init from '../init.js';
import instruments from '../instruments.js';

import getProgression from '../getProgression.js';

var App = function(props) {
  const [state, setState] = React.useState({
    view: 'home',

    tempo: Math.floor(Math.random() * 120) + 60,
    allNotes: props.allNotes,
    currentChord: 0,
    currentSection: 0,
    progLength: 4,
    playing: false,
    currentSong: null,
    songs: [],
    rhythm: 'arpeggio2',
    rhythms:
            [
              'whole',
              'rocking',
              'arpeggio1',
              //'quarter',
              'bubble',
              'tresillo',
              'tresillo8ths',
              'arpeggio2'
            ],

    bass:  init.loadInstrument('bass-sub'),
    cello: init.loadInstrument('cello'),
    piano: init.loadInstrument('piano')
  });

  var newSong = function(first) {
    var song = <Song progression={{verse: getProgression(first), chorus: getProgression(first), bridge: getProgression(first)}}/>;

    setState({
      ...state,
      currentSong: song,
      songs: function() {
        state.songs.unshift(song);
        return state.songs;
      }()
    })
  };

  window.state = state;
  window.newSong = newSong;
  window.Tone = Tone;

  return (
    <div>
      <h1>musicGen</h1>
      <div id="navbar"></div>
      <div> {
          'view: ' + state.view
        }
      </div>
      {state.songs.map(function(song) {
        return song;
      })}
    </div>
  )
};

export default App;