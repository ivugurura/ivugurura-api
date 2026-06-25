import { Language } from "../../models";
import BaseService from "./base.service";

class LangService extends BaseService {
  constructor() {
    super(Language);
  }

  fetchLanguages(options = {}) {
    const defaultOptions = {
      attributes: ["id", "name", "short_name"],
      order: [["id", "ASC"]],
    };

    return this.findAll({
      ...defaultOptions,
      ...options,
    });
  }
}

export default new LangService();
