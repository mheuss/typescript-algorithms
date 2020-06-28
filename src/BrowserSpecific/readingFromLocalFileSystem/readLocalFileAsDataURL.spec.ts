import { readLocalFileAsDataURL } from "./readLocalFileAsDataURL";

const nameElement = "name";

describe("Test for ReadLocalFileAsDataURL", () => {
  it("Should read file and resolve contents", async () => {
    const content = "Blob Ross";
    const blob = new Blob([content], { type: "text/html" });
    // @ts-ignore
    blob[nameElement] = "test.jpg";
    const event = {
      target: {
        files: [blob],
      },
    };

    const promise = await readLocalFileAsDataURL(event.target.files[0] as File);

    expect(promise).toEqual("data:text/html;charset=undefined,Blob%20Ross");
  });
});
