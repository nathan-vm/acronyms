import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";
import { FakeAcronymRepository } from "../../repositories/implementations/FakeAcronymsRepository";
import { UpdateAcronymUseCase } from "./UpdateAcronymUseCase";

let fakeAcronymRepository: IAcronymRepository;
let updateAcronymUseCase: UpdateAcronymUseCase;
const acronymsList = [
  {
    key: "@TEOTD",
    value: "At the end of the day",
  },
  { key: "ADN", value: "Any day now" },
  {
    key: "ATEOTD",
    value: "At the end of the day",
  },
  { key: "BDAY", value: "Birthday" },
  {
    key: "ADAD",
    value: "Another day, another dollar",
  },
  { key: "EOD", value: "End of day" },
  {
    key: "Cakeday",
    value: "Meaning Birthday (Reddit)",
  },
  {
    key: "HAWT",
    value: "Have a wonderful day (out-dated, see next in list)",
  },
  { key: "HAND", value: "Have a nice day" },
  {
    key: "KOTD",
    value: "Kicks of the day (Instagram)",
  },
];

describe("update description of acronyms", () => {
  beforeEach(async () => {
    fakeAcronymRepository = new FakeAcronymRepository();
    updateAcronymUseCase = new UpdateAcronymUseCase(fakeAcronymRepository);
  });

  it("should be able to update one acronym", async () => {
    const acronymsToCompare: Acronym[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < acronymsList.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const acronym = await fakeAcronymRepository.create({
        key: acronymsList[i].key,
        value: acronymsList[i].value,
      });
      acronymsToCompare.push(acronym);
    }

    const updateRequest = {
      id: acronymsToCompare[0].id,
      key: "AAA",
      value: "aaa",
    };

    const acronym = await updateAcronymUseCase.execute(updateRequest);
    expect(acronym).toEqual(expect.objectContaining(updateRequest));
  });
});
