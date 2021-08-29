import { IAcronymRepository } from "../../repositories/IAcronymsRepository";
import { FakeAcronymRepository } from "../../repositories/implementations/FakeAcronymsRepository";
import { ImportAcronymUseCase } from "./ImportAcronymUseCase";

let fakeAcronymRepository: IAcronymRepository;
let importAcronymUseCase: ImportAcronymUseCase;

describe("Test import JSON file", () => {
  beforeEach(() => {
    fakeAcronymRepository = new FakeAcronymRepository();
    importAcronymUseCase = new ImportAcronymUseCase(fakeAcronymRepository);
  });

  it("should be able to import a JSON file with array of Objects", async () => {
    jest
      .spyOn(importAcronymUseCase, "loadAcronyms")
      .mockImplementationOnce(() => {
        return Promise.resolve([{ key: "aaa", value: "bbb" }]);
      });
    const file = Buffer.from("whatever");

    const createFunction = jest.spyOn(fakeAcronymRepository, "create");

    await importAcronymUseCase.execute(file as unknown as Express.Multer.File);

    expect(createFunction).toBeCalled();
  });
});
