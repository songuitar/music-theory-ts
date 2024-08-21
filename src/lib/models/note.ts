import {Scale} from "./scale";

export class Note {
  static readonly C = 'C';
  static readonly C_Sharp = 'C#';
  static readonly D = 'D';
  static readonly D_Sharp = 'D#';
  static readonly E = 'E';
  static readonly F = 'F';
  static readonly F_Sharp = 'F#';
  static readonly G = 'G';
  static readonly G_Sharp = 'G#';
  static readonly A = 'A';
  static readonly A_Sharp = 'A#';
  static readonly H = 'H';

  static readonly SharpSign = '#';

  constructor(private stringValue: string) {
  }

  static getAll() {
    return [
      Note.C,
      Note.C_Sharp,
      Note.D,
      Note.D_Sharp,
      Note.E,
      Note.F,
      Note.F_Sharp,
      Note.G,
      Note.G_Sharp,
      Note.A,
      Note.A_Sharp,
      Note.H,
    ];
  }

  getFlatOnly() {
    return [
      Note.C,
      Note.D,
      Note.E,
      Note.F,
      Note.G,
      Note.A,
      Note.H,
    ];
  }

  static fromString(stringValue: string): Note {
    if (Note.getAll().indexOf(stringValue) == -1) {
      throw 'given value ' + stringValue + ' is not a valid key'
    }

    return new Note(stringValue)
  }

  getChromaticInterval(interval: number): Note {
    const allNotesKeys = Object.keys(new Scale(this).chromatic);
    return Note.fromString(allNotesKeys[allNotesKeys.indexOf(this.toString()) + interval]);
  }

  isSharp() {
    return this.stringValue.includes(Note.SharpSign);
  }

  getFlatKeyNoteString(): string {
    return this.stringValue.replace(Note.SharpSign, this.stringValue);
  }

  toString(): string {
    return this.stringValue;
  }
}
