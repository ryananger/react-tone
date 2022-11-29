import React from 'react';
import * as Tone from 'tone';

import Song from './Song.jsx';
import init from '../init.js';
import instruments from '../instruments.js';

import methods from '../helpers/getProgression.js';
import nameGen from '../helpers/nameGen.js';

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

  var newSong = function() {
    var first = methods.first();

    var info = {
      name: nameGen(),
      tempo: Math.floor(Math.random() * 120) + 60,
      songKey: state.allNotes[Math.floor(Math.random() * state.allNotes.length)].note,
      rhythms: {
        verse: state.rhythms[Math.floor(Math.random() * state.rhythms.length)],
        chorus: state.rhythms[Math.floor(Math.random() * state.rhythms.length)],
        bridge: state.rhythms[Math.floor(Math.random() * state.rhythms.length)]
      },
      progression: {
        verse: methods.getProgression(first),
        chorus: methods.getProgression(first),
        bridge: methods.getProgression(first)
      }
    }

    var song = <Song key={info.name + state.songs.length} info={info}/>;

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