/**
* @fileoverview A sample library and quick-loader for tone.js
*
* @author N.P. Brosowsky (nbrosowsky@gmail.com)
* https://github.com/nbrosowsky/tonejs-instruments
*/

import * as Tone from 'tone';

var r = require.context('./assets', true, /.mp3$/);

var importAll = function(r) {
  let audio = {};

  r.keys().map(function(item) {
    var cut = (item.replace('./samples/', ''));
    var inst = cut.slice(0, cut.indexOf('/'));

    cut = cut.slice(cut.indexOf('/') + 1);
    var note = cut.replace('.mp3', '');

    if (audio[inst]) {
      audio[inst][note] = r(item).replace('http://localhost:3001', '');
    } else {
      audio[inst] = {};
      audio[inst][note] = r(item).replace('http://localhost:3001', '');
    }
  });

  return audio;
};

var Samples = importAll(r);

var SampleLibrary = {
    ext: '.[mp3|ogg]', // use setExt to change the extensions on all files // do not change this variable //
    baseUrl: '',
    list: ['bass-sub', 'cello', 'piano'],
    onload: null,

    setExt: function (newExt) {
        var i
        for (i = 0; i <= this.list.length - 1; i++) {
            for (var property in this[this.list[i]]) {

                this[this.list[i]][property] = this[this.list[i]][property].replace(this.ext, newExt)
            }


        }
        this.ext = newExt;
        return console.log("sample extensions set to " + this.ext)
    },

    load: function (arg) {
        var t, rt, i;
        (arg) ? t = arg: t = {};
        t.instruments = t.instruments || this.list;
        t.baseUrl = t.baseUrl || this.baseUrl;
        t.onload = t.onload || this.onload;

        // update extensions if arg given
        if (t.ext) {
            if (t.ext != this.ext) {
                this.setExt(t.ext)
            }
            t.ext = this.ext
        }

        rt = {};

        // if an array of instruments is passed...
        if (Array.isArray(t.instruments)) {
            for (i = 0; i <= t.instruments.length - 1; i++) {
                var newT = this[t.instruments[i]];
                //Minimize the number of samples to load
                if (this.minify === true || t.minify === true) {
                    var minBy = 1;
                    if (Object.keys(newT).length >= 17) {
                        minBy = 2
                    }
                    if (Object.keys(newT).length >= 33) {
                        minBy = 4
                    }
                    if (Object.keys(newT).length >= 49) {
                        minBy = 6
                    }

                    var filtered = Object.keys(newT).filter(function (_, i) {
                        return i % minBy != 0;
                    })
                    filtered.forEach(function (f) {
                        delete newT[f]
                    })

                }


                rt[t.instruments[i]] = new Tone.Sampler(
                    newT, {
                        baseUrl: t.baseUrl + t.instruments[i] + "/",
                        onload: t.onload
                    }

                )
            }

            return rt

            // if a single instrument name is passed...
        } else {
            newT = this[t.instruments];

            var s = new Tone.Sampler(
                newT, {
                    baseUrl: "http://localhost:3001",
                    onload: function() {
                        //console.log(t.instruments, newT, 'loaded')
                    }
                }
            )

            return s
        }

    },

    'bass-sub': {
        'Bb1': Samples['bass-sub']['Bb1'],
        'B1': Samples['bass-sub']['B1'],
        'C1': Samples['bass-sub']['C1'],
        'Db1': Samples['bass-sub']['Db1'],
        'E1': Samples['bass-sub']['E1'],
        'F1': Samples['bass-sub']['F1'],
        'Gb1': Samples['bass-sub']['Gb1'],
        'G1': Samples['bass-sub']['G1'],
        'Ab1': Samples['bass-sub']['Ab1'],
        'A1': Samples['bass-sub']['A1']
    },

    'cello': {
        'C1': Samples['cello']['C1'],
        'Db1': Samples['cello']['Db1'],
        'D1': Samples['cello']['D1'],
        'Eb1': Samples['cello']['Eb1'],
        'E1': Samples['cello']['E1'],
        'F1': Samples['cello']['F1'],
        'Gb1': Samples['cello']['Gb1'],
        'G1': Samples['cello']['G1'],
        'Ab1': Samples['cello']['Ab1'],
        'A1': Samples['cello']['A1'],
        'Bb1': Samples['cello']['Bb1'],
        'B1': Samples['cello']['B1']
    },

    'piano': {

        'A1': Samples['piano']['A1'],
        'A4': Samples['piano']['A4'],
        'Gb1': Samples['piano']['Gb1'],
        'Gb4': Samples['piano']['Gb4'],
        'B1': Samples['piano']['B1'],
        'B4': Samples['piano']['B4'],
        'C1': Samples['piano']['C1'],
        'C4': Samples['piano']['C4'],
        'Db1': Samples['piano']['Db1'],
        'Db4': Samples['piano']['Db4'],
        'D1': Samples['piano']['D1'],
        'D4': Samples['piano']['D4'],
        'Eb1': Samples['piano']['Eb1'],
        'Eb4': Samples['piano']['Eb4'],
        'E1': Samples['piano']['E1'],
        'E4': Samples['piano']['E4'],
        'F1': Samples['piano']['F1'],
        'F4': Samples['piano']['F4'],
        'Gb1': Samples['piano']['Gb1'],
        'Gb4': Samples['piano']['Gb4'],
        'G1': Samples['piano']['G1'],
        'G4': Samples['piano']['G4'],
        'Ab1': Samples['piano']['Ab1'],
        'Ab4': Samples['piano']['Ab4']
    }
}

export default SampleLibrary;
