import { Model } from "sequelize";

const queryOptions = {};
export class QueryHelper {
  /**
   *
   * @param {Model} model
   */
  constructor(model) {
    this.model = model;
  }
  async findOne(whereCondition = {}, include = null, attributes) {
    return this.model.findOne({
      where: whereCondition,
      logging: false,
      include,
      attributes,
    });
  }
  async findAll(
    whereCondition,
    include,
    orderBy = [["createdAt", "ASC"]],
    attributes,
    offset = 0,
    limit = 20,
    group = null
  ) {
    return this.model.findAll({
      order: orderBy,
      offset,
      limit,
      where: whereCondition,
      logging: false,
      include,
      attributes,
      group,
      ...queryOptions,
    });
  }
  async count(whereCondition = {}) {
    return this.model.count({ where: whereCondition, logging: false });
  }
  async findAndCountAll(options = {}) {
    const defaultOptions = {
      orderBy: [["createdAt", "ASC"]],
      logging: false,
      ...queryOptions,
    };
    const rows = await this.model.findAll({
      ...defaultOptions,
      ...options,
    });
    const count = await this.model.count({
      ...defaultOptions,
      where: options.where,
    });
    return { count, rows };
  }
  async create(data) {
    return this.model.create(data, { logging: false });
  }
  async update(data, whereCondition = {}) {
    return this.model.update(data, { where: whereCondition, logging: false });
  }
  async delete(whereCondition) {
    return this.model.destroy({
      where: whereCondition,
      logging: false,
    });
  }
  async findOrCreate(whereCondition, defaults) {
    return this.model.findOrCreate({
      where: whereCondition,
      defaults,
      logging: false,
    });
  }
}
