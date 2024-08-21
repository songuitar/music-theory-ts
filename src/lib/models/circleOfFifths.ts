import { Chord, ChordType } from './chord'
import { Note } from './note'

export class CircleOfFifthsNode {
  public next!: CircleOfFifthsNode
  public prev!: CircleOfFifthsNode
  constructor(public readonly majorChord: Chord, public readonly minorChord: Chord) {}
}

export class CircleOfFifths {
  public static circle: CircleOfFifthsNode = CircleOfFifths.create()

  public static create() {
    const start = new CircleOfFifthsNode(
      new Chord(new Note(Note.C), ChordType.major),
      new Chord(new Note(Note.A), ChordType.minor)
    )
    this.buildRecursive(start, start)
    return start
  }

  private static buildRecursive(current: CircleOfFifthsNode, start: CircleOfFifthsNode) {
    const nextMajChord = current.majorChord.getDominant()
    const nextMinChord = nextMajChord.getParallel()

    if (current.majorChord.key.toString() == Note.F) {
      current.next = start
      start.prev = current
      return
    }
    const next = new CircleOfFifthsNode(nextMajChord, nextMinChord)

    current.next = next
    next.prev = current

    this.buildRecursive(next, start)
  }

  static findNodeWithMaxHarmonyOverlap(harmony: string[]): CircleOfFifthsNode {
    return CircleOfFifths.getHarmonyOverlapMap(harmony).map(r => r.node)[0]
  }

  static getHarmonyOverlapMap(harmony: string[]): { node: CircleOfFifthsNode; value: number }[] {
    const result = []
    let current = this.circle

    while (result.length < 12) {
      result.push({
        node: current,
        value: this.getHarmonyOverlapValue(harmony, current)
      })
      current = current.next
    }
    return result.sort((a, b) => b.value - a.value)
  }

  static findNodeByNoteAmongMajors(note: string): CircleOfFifthsNode {
    let current = this.circle
    while (current.majorChord.key.toString() != note) {
      current = current.next
    }
    return current
  }
  static findNodeByNoteAmongMinors(note: string): CircleOfFifthsNode {
    let current = this.circle
    while (current.minorChord.key.toString() != note) {
      current = current.next
    }
    return current
  }

  static getNodeNeighboursNotes(node: CircleOfFifthsNode): string[] {
    return [
      node.prev.majorChord.key.toString(),
      node.prev.minorChord.key.toString(),
      node.majorChord.key.toString(),
      node.minorChord.key.toString(),
      node.next.majorChord.key.toString(),
      node.next.minorChord.key.toString()
    ]
  }

  static getNodeNeighboursChords(node: CircleOfFifthsNode): Chord[] {
    return [
      node.prev.majorChord,
      node.prev.minorChord,
      node.majorChord,
      node.minorChord,
      node.next.majorChord,
      node.next.minorChord
    ]
  }

  static getHarmonyOverlapValue(harmony: string[], node: CircleOfFifthsNode) {
    const neighbours = this.getNodeNeighboursNotes(node)
    return harmony.filter(note => neighbours.includes(note)).length
  }
}
