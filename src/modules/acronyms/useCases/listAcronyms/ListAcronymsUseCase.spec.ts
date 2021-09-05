import { Acronym } from "../../entities/Acronym";
import { IAcronymRepository } from "../../repositories/IAcronymsRepository";
import { FakeAcronymRepository } from "../../repositories/implementations/FakeAcronymsRepository";
import { ListAcronymsUseCase } from "./ListAcronymsUseCase";

let fakeAcronymRepository: IAcronymRepository;
let listAcronymsUseCase: ListAcronymsUseCase;
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

describe("list of acronyms, paginated using query parameters", () => {
  beforeEach(async () => {
    fakeAcronymRepository = new FakeAcronymRepository();
    listAcronymsUseCase = new ListAcronymsUseCase(fakeAcronymRepository);
  });

  it("should be able to list all acronyms", async () => {
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

    const acronyms = await listAcronymsUseCase.execute();
    expect(acronyms).toEqual([expect.arrayContaining(acronymsToCompare), 10]);
  });

  it("should be able to list acronyms with pagination", async () => {
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

    const acronyms = await listAcronymsUseCase.execute({ from: 5, limit: 2 });
    expect(acronyms).toEqual([
      expect.arrayContaining(acronymsToCompare.slice(4, 6)),
      10,
    ]);
  });
});
