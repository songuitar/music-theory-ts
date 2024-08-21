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


*And many other methods yet to describe here...*
