import { readLocalTextFile } from "./readLocalTextFile";

describe("Basic Functional Test", () => {
  it("Given a valid file, let's see the contents", async () => {
    const name = "NormMacDonaldJokes.txt";
    const content =
      "It's tough to know who's better in cliff diving. Like, you see a guy diving off a cliff and you go, 'Oh, man, a guy diving off a cliff!' " +
      " And then another guy'd dive- 'Oh, there's another guy diving off a cliff there.' But you can't tell who's better, y'know? " +
      "Like, uh- if you survive at all, hey, you're a great- you're a great cliff diver there. There's only two classifications in cliff diving. " +
      "There's, uh- 'Grand Champion' and then, uh- 'Stuff On a Rock.' Very hard to make a comeback in that sport, I'll tell you that.";
    const blob: Blob = new Blob([content], {
      type: "text/plain",
    });

    const file: File = new File([blob], name, { lastModified: Date.now() });

    const resolveContents = await readLocalTextFile(file);
    expect(resolveContents).toEqual(content);
  });
});
