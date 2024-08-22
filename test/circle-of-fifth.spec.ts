import { CircleOfFifths} from "../src/lib/models/circleOfFifths";

describe('CircleOfFifths', () => {
  it('should build', () => {

    const circle = CircleOfFifths.create();

    expect(circle.majorChord.isMajor).toBeTruthy();
  });
});
