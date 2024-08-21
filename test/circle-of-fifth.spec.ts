import { CircleOfFifths} from "../src/lib/models/circleOfFifths";

describe('CircleOfFifths', () => {
  it('should build', () => {

    const circle = CircleOfFifths.create();

    console.log(circle)

    expect(1).toEqual(1);
  });
});
