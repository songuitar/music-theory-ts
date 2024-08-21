import {Note} from "../models/note";

export enum ChordType {
  major = 'major',
  minor = 'minor'
}

export class Chord {
  constructor(
    public readonly key: Note,
    public readonly type: ChordType,
  ) {

  }

  toString() {
    return this.key.toString() + (this.type == ChordType.minor ? 'm' : '');
  }

  isMinor() {
    return this.type == ChordType.minor;
  }
  isMajor() {
    return this.type == ChordType.major;
  }

  getTriad(): Note[] {
    return this.type === ChordType.minor ? [
      this.key,
      this.key.getChromaticInterval(3),
      this.key.getChromaticInterval(7),
    ] : [
      this.key,
      this.key.getChromaticInterval(4),
      this.key.getChromaticInterval(7),
    ]
  }

  getDominant(): Chord {
    return new Chord(this.key.getChromaticInterval(7), this.type);
  }
  getParallel(): Chord {
    return new Chord(this.key.getChromaticInterval(9), this.type === ChordType.minor ? ChordType.major : ChordType.minor);
  }

  static getAll() {
    return [
      ...Note.getAll().map(note => new Chord(Note.fromString(note), ChordType.major).toString()),
      ...Note.getAll().map(note => new Chord(Note.fromString(note), ChordType.minor).toString()),
    ]
  }

  static getAllAsChords() {
    return [
      ...Note.getAll().map(note => new Chord(Note.fromString(note), ChordType.major)),
      ...Note.getAll().map(note => new Chord(Note.fromString(note), ChordType.minor)),
    ]
  }

  static fromString(chord: string): Chord {
    return new Chord(Chord.resolveKeyFromConventionalNotation(chord), Chord.resolveTypeFromConventionalNotation(chord))
  }

  static fromTriad(triad: Note[]) : Chord|undefined {
    return Chord.getAllAsChords().find(chord => Chord.joinNotesToString(chord.getTriad()) === Chord.joinNotesToString(triad))
  }

  static fromFirstThird(firstThird: Note[]) : Chord|undefined {
    return Chord.getAllAsChords().find(chord => {
      const triad = chord.getTriad();

      return Chord.joinNotesToString([triad[0], triad[1]]) === Chord.joinNotesToString(firstThird)
    })
  }

  static resolveTypeFromConventionalNotation(typeContainingString: string) {
    return typeContainingString.toUpperCase().indexOf('M') != -1
      ? ChordType.minor
      : ChordType.major;
  }

  static resolveKeyFromConventionalNotation(chord: string) {
    return Note.fromString(chord.toUpperCase().replace('M', ''));
  }

  static joinNotesToString(notes: Note[]) {
    return notes.map(note => note.toString()).join('-')
  }
}
