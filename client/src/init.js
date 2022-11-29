import * as Tone from 'tone';
import instruments from './instruments.js'

var init = {
  allNotes: function() {
    var base = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    var all = [];

    for (var i = 0; i < base.length; i++) {
      var note = base[i];

      if (i !== 0 && i !== 3) {
        all.push({note: base[i] + 'b', position: all.length, src: ''});
      }

      all.push({note: note, position: all.length, src: ''});
    }

    return all;
  },
  loadInstrument: function(inst) {
    var loaded = instruments.load({instruments: inst});
    loaded.toDestination();

    return loaded;
  }
}

export default init;