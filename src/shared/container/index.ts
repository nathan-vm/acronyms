import { container } from "tsyringe";

import { IAcronymRepository } from "../../modules/acronyms/repositories/IAcronymsRepository";
import { AcronymRepository } from "../../modules/acronyms/repositories/implementations/AcronymsRepository";

container.registerSingleton<IAcronymRepository>(
  "AcronymRepository",
  AcronymRepository,
);
