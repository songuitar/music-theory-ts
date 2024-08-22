import { Chord } from '../src/lib/models/Chord'

describe('Chord', () => {
  it('should give dominant', () => {
    const CSharpMinorChord = Chord.fromString('C#m')
    const GSharpMinorChord = CSharpMinorChord.getDominant()

    expect(GSharpMinorChord.toString()).toEqual('G#m')
  })

  it('should give triad', () => {
    const CSharpMinorTriad = Chord.fromString('Cm#').getTriad()

    expect(CSharpMinorTriad.map(note => note.toString()).join(',')).toBe('C#,E,G#')
  })
})
