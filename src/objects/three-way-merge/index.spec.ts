import { cloneDeep } from 'lodash';

import threeWayObjectMerge, { diffDeep } from './index';

const comedian = 'Anthony Jeselnik';

describe("Let's give 'em three objects, and return the results", () => {
  it('Simple proof that the three-way object merge works', () => {
    const initialObject = {
      a: 1,
      b: 2,
      c: 3,
    };

    const changedObject = {
      a: 1,
      b: 3,
      c: 3,
    };

    const freshObject = {
      a: 1,
      b: 2,
      c: 4,
    };

    const results = threeWayObjectMerge({
      changedObject,
      freshObject,
      initialObject,
    });

    expect(results).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('Slightly more complex proof that the three-way object merge works', () => {
    const initialObject = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    const changedObject = {
      a: 1,
      b: 3,
      c: 3,
      d: 4,
    };

    const freshObject = {
      a: 1,
      b: 4,
      c: 4,
      d: 4,
    };

    const results = threeWayObjectMerge({
      changedObject,
      freshObject,
      initialObject,
    });

    expect(results).toEqual({ a: 1, b: 3, c: 4, d: 4 });
  });

  it('Should merge changes into our final object, if the fresh object has no changes', () => {
    const jokes = [
      `I’ve spent the past two years looking for my ex-girlfriend’s killer… but no one will do it.`,
      "I've got a kid in Africa that I feed, that I clothe, that I school, that I inoculate for 75 cents a day. Which is practically nothing compared to what it cost to send him there.",
      `This past Christmas, I told my girlfriend for months in advance, 'Baby, all I want from you this year is an Xbox. That's it. Beginning and end of list: Xbox.' You know what she got me? A homemade frame with a picture of us from our first date together. Which was fine - because I got her an Xbox.`,
    ];

    const source: any = {
      jokes: [
        {
          comedian,
          quote: jokes[0],
        },
        {
          comedian,
          quote: jokes[1],
        },
      ],
      number: 5,
      test: false,
    };

    const changes: any = {
      jokes: [
        {
          comedian,
          quote: jokes[2],
        },
        {
          comedian,
          quote: jokes[1],
        },
      ],
      number: 15,
      test: true,
    };

    const fresh = cloneDeep(source);

    const results = threeWayObjectMerge({
      changedObject: changes,
      freshObject: fresh,
      initialObject: source,
    });

    expect(results).toEqual(changes);
  });

  it('Should merge changes into our final object, if the fresh object has changes', () => {
    const jokes = [
      `Broke up with my last girlfriend because she lied to me and told me she got molested by her neighbor. But I know her neighbor. He’s a really cool guy. Not like her creepy ass other neighbor.`,
      'I plan on talking to my kids about sex early. Like six. Or seven am.',
      `You'll get my assault weapon when you pry it out of my curious six-year-old's cold dead hands.`,
    ];

    const source: any = {
      jokes: [
        {
          comedian,
          quote: jokes[0],
        },
        {
          comedian,
          quote: jokes[1],
        },
      ],
      number: 5,
      test: false,
    };

    const changes: any = {
      jokes: [
        {
          comedian,
          quote: jokes[2],
        },
        {
          comedian,
          quote: jokes[1],
        },
      ],
      number: 5,
      test: true,
    };

    const fresh: any = {
      jokes: [
        {
          comedian,
          quote: jokes[0],
        },
        {
          comedian,
          quote: jokes[1],
        },
      ],
      number: 15,
      test: false,
    };

    const expectedResults = cloneDeep(changes);
    expectedResults.number = 15;

    const results = threeWayObjectMerge({
      changedObject: changes,
      freshObject: fresh,
      initialObject: source,
    });

    expect(results).toEqual(expectedResults);
  });
});

describe('Can we diff two objects?', () => {
  it('Should find diffs on a base object', () => {
    const source: any = {
      jeselnikQuote: `My girlfriend loves to eat chocolate. She’s always eating chocolate, and she likes to joke she’s got a chocolate addiction. "Get me away from those Hersheys bars. I’m addicted to them." It’s really annoying. So I put her in a car and I drove her downtown. And I pointed out a crack addict. And I said, "Do you see that, honey?... Why can’t you be that skinny?"`,
      number: 5,
      test: false,
    };

    const derivation: any = cloneDeep(source);
    derivation.number = 35;

    const results = diffDeep(source, derivation);
    expect(results).toEqual({ number: 35 });
  });

  it('Should find diffs on a nested object', () => {
    const source: any = {
      jokes: {
        comedian: 'Anthony Jeselnick',
        quote: `You don’t know anything about pain until you’ve seen your own baby drowned in a tub... and you definitely don’t know anything about how to wash a baby.`,
      },
      number: 5,
      test: false,
    };

    const derivation: any = cloneDeep(source);
    derivation.jokes.comedian = 'Anthony Jeselnik';

    const results = diffDeep(source, derivation);
    expect(results).toEqual({ jokes: { comedian } });
  });

  it('Should work fine with an addition to an array', () => {
    const source: any = {
      jokes: [
        {
          comedian,
          quote: `The other day my girlfriend complained to me "Chivalry is dead. Oh, Anthony, chivalry is dead." And I told her "No, baby, chivalry isn’t dead. Chivalry is alive and well. You’re thinking of your mom."`,
        },
      ],
      number: 5,
      test: false,
    };

    const derivation: any = cloneDeep(source);
    derivation.jokes.push({
      comedian,
      quote:
        'Whenever I meet a pretty girl, the first thing I look for is intelligence; because if she doesn’t have that, then she’s mine.',
    });

    const results = diffDeep(source, derivation);
    expect(results).toEqual({ jokes: derivation.jokes });
  });

  it('Should work fine with a subtraction from an array', () => {
    const source: any = {
      jokes: [
        {
          comedian,
          quote: `I honestly can't remember the last time I hit myself in the head with a hammer.`,
        },
        {
          comedian,
          quote:
            'Two words no woman should ever have to hear: Triple Mastectomy.',
        },
      ],
      number: 5,
      test: false,
    };

    const derivation: any = cloneDeep(source);
    derivation.jokes = [
      {
        comedian,
        quote:
          'Two words no woman should ever have to hear: Triple Mastectomy.',
      },
    ];

    const results = diffDeep(source, derivation);
    expect(results).toEqual({ jokes: derivation.jokes });
  });
});
