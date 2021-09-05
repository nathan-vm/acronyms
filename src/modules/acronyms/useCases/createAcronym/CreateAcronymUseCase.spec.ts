import { IAcronymRepository } from "../../repositories/IAcronymsRepository";
import { FakeAcronymRepository } from "../../repositories/implementations/FakeAcronymsRepository";
import { CreateAcronymUseCase } from "./CreateAcronymUseCase";

let fakeAcronymRepository: IAcronymRepository;
let createAcronymUseCase: CreateAcronymUseCase;

describe("Test import JSON file", () => {
  beforeEach(() => {
    fakeAcronymRepository = new FakeAcronymRepository();
    createAcronymUseCase = new CreateAcronymUseCase(fakeAcronymRepository);
  });

  it("should be able to create an acronym", async () => {
    const createFunction = jest.spyOn(fakeAcronymRepository, "create");

    await createAcronymUseCase.execute({
      key: "test",
      value: "test",
    });

    expect(createFunction).toBeCalled();
  });
});
