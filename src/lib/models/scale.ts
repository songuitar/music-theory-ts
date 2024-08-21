import { Note } from './note'

interface ChromaticScaleView {
  [key: string]: number
}

export class Scale {
  readonly chromatic: ChromaticScaleView

  constructor(public key: Note) {
    this.chromatic = Scale.toChromatic(key)
  }

  static toChromatic(key: Note): ChromaticScaleView {
    let count = 0
    const scale: ChromaticScaleView = {}
    const allKeys = Note.getAll()
    while (count < 12) {
      for (let i = 0; i < allKeys.length; i++) {
        const note = allKeys[i]
        if (count == 0 && note == key.toString()) {
          scale[note] = count
          count++
        } else if (count > 0) {
          if (note == key.toString()) {
            return scale
          }
          scale[note] = count
          count++
        }
      }
    }
    return scale
  }
}
