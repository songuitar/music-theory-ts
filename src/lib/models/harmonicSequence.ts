import {Chord, ChordType} from "./chord";
import {Scale} from "./scale";
import {Note} from "./note";
import { CircleOfFifths } from './circleOfFifths';

export class HarmonicSequence {

  static minorEntrySignature = 'M'

  readonly digitized: string[];
  readonly keyChord: Chord;

  constructor(digitized: string[], key: Chord) {
    this.digitized = digitized;
    this.keyChord = key;
  }

  static fromChords(chords: Chord[], key: Chord) {
    return new HarmonicSequence(HarmonicSequence.asDigitized(key, chords), key)
  }

  static fromStringChords(chords: string[], key: string) {
    const keyChord = Chord.fromString(key);
    return new HarmonicSequence(HarmonicSequence.asDigitized(keyChord, chords.map(
      (chord: string) => Chord.fromString(chord))), keyChord)
  }

  transpose(newKey: Note): HarmonicSequence {
    return new HarmonicSequence(this.digitized, new Chord(newKey, this.keyChord.type))
  }

  static findKeyCandidate(chords: string[], preferType = ChordType.minor): string | null {
    const overlappingNodes = CircleOfFifths.getHarmonyOverlapMap(chords)
      .filter(({node}) =>
        {
          return chords.includes(node.majorChord.toString()) && chords.includes(node.minorChord.toString())
        }
      )

    const entry = overlappingNodes.find(({node}) => {
      return chords.includes(node.prev.majorChord.toString()) ||
        chords.includes(node.prev.minorChord.toString())
    }) ?? overlappingNodes[0]


    if (entry === undefined) {
      return null
    }

    return preferType === ChordType.minor ? entry.node.minorChord.toString() : entry.node.majorChord.toString()
  }

  asStringChords() {
    return this.asChords().map(chord => chord.toString())
  }

  asChords(): Chord[] {
    const keyNote = Chord.resolveKeyFromConventionalNotation(this.keyChord.toString());
    const keyScale = new Scale(keyNote);

    return this.digitized.map((offset) => HarmonicSequence.resolveChordByStringOffset(offset, keyScale));
  }

  private static asDigitized(key: Chord, chords: Chord[]) {
    const keyNote: Note = Chord.resolveKeyFromConventionalNotation(key.toString());
    const digitized: string[] = [];
    const keyScale = new Scale(keyNote);

    chords.forEach((chord) => {
      digitized.push(HarmonicSequence.resolveKeyOffset(keyNote, chord.key, keyScale).toString() + (chord.type == ChordType.minor ? HarmonicSequence.minorEntrySignature : ''));
    });

    return digitized
  }

  private static resolveKeyOffset(key: Note, current: Note, keyScale: Scale): number {
    return keyScale.chromatic[key.toString()] - keyScale.chromatic[current.toString()];
  }

  private static resolveChordByStringOffset(offset: string, keyScale: Scale): Chord {
    const intOffset = Number(offset.replace(HarmonicSequence.minorEntrySignature, ""));
    const type = Chord.resolveTypeFromConventionalNotation(offset);

    return new Chord(
      Note.fromString(
        Object.entries(keyScale.chromatic)
          .filter(([_, offset]) => {
            return offset === Math.abs(intOffset)
          })
          .map(([key]) => key).pop() as string
      ),
      type
    )
  }
}
