/**
 * Generic Sequelize base service.
 * Extend this class and pass a model to the constructor.
 */
export default class BaseService {
  /**
   * @param {import('sequelize').Model} model
   */
  constructor(model) {
    if (!model) {
      throw new Error("BaseService requires a sequelize model instance");
    }

    this.model = model;
  }

  withDefaultOptions(options = {}) {
    return {
      logging: false,
      ...options,
    };
  }

  findOne(options = {}) {
    return this.model.findOne(this.withDefaultOptions(options));
  }

  findByPk(id, options = {}) {
    return this.model.findByPk(id, this.withDefaultOptions(options));
  }

  findAll(options = {}) {
    return this.model.findAll(this.withDefaultOptions(options));
  }

  findAndCountAll(options = {}) {
    return this.model.findAndCountAll(this.withDefaultOptions(options));
  }

  count(options = {}) {
    return this.model.count(this.withDefaultOptions(options));
  }

  create(values, options = {}) {
    return this.model.create(values, this.withDefaultOptions(options));
  }

  bulkCreate(records = [], options = {}) {
    return this.model.bulkCreate(records, this.withDefaultOptions(options));
  }

  update(values, options = {}) {
    return this.model.update(values, this.withDefaultOptions(options));
  }

  destroy(options = {}) {
    return this.model.destroy(this.withDefaultOptions(options));
  }

  findOrCreate(options = {}) {
    return this.model.findOrCreate(this.withDefaultOptions(options));
  }

  upsert(values, options = {}) {
    return this.model.upsert(values, this.withDefaultOptions(options));
  }
}
