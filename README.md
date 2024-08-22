# Typescript object-oriented library for dealing with music theory

**Example usage**

*Get started*
```javascript
import {Chord} from 'songuitar/music-theory-ts'
```

*Get dominant chord*
```javascript
const CSharpMinorChord = Chord.fromString('Cm#')
const GSharpMinorChord = CSharpMinorChord.getDominant()
```


*Get triad of the chord*
```javascript
const CSharpMinorTriad = Chord.fromString('Cm#').getTriad()

CSharpMinorTriad.map((note: Note) => note.toString()).join(',') // 'C#,E,G#'

```


*Dealing with sequence of chords (harmony)*
```javascript
    const AmDm = HarmonicSequence.fromStringChords(['Am', 'Dm'], 'A')
    const EmAm = HarmonicSequence.fromStringChords(['Em', 'Am'], 'E')

    AmDm.isSameHarmony(EmAm) // true

```


*And many other methods yet to describe here...*
