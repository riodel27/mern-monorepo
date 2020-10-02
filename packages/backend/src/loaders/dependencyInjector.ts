import { Container } from "typedi";

import LoggerInstance from "./logger";

interface Models {
  name: string;
  model: any;
}

export default ({ models }: { models: Models[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
