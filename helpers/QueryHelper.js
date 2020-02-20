export class QueryHelper {
  constructor(model) {
    this.model = model;
  }
  async findOne(whereCondition = {}, include = null, attributes) {
    return this.model.findOne({
      where: whereCondition,
      logging: false,
      include,
      attributes
    });
  }
  async findAll(whereCondition, include, offset = 0, limit = 20) {
    return this.model.findAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      where: whereCondition,
      logging: false,
      include
    });
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
      logging: false
    });
  }
}
