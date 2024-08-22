import { HarmonicSequence} from "../src/lib/models/harmonicSequence";
import { Note } from "../src/lib/models/note";

describe('HarmonicSequence', () => {
  it('should compare', () => {

    const AmDm = HarmonicSequence.fromStringChords(['Am', 'Dm'], 'A')
    const EmAm = HarmonicSequence.fromStringChords(['Em', 'Am'], 'E')

    expect(AmDm.isSameHarmony(EmAm)).toBeTruthy()
  });
});
