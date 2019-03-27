module.exports = Model => {
  return {
    create (payload) {
      const model = new Model(payload)
      return model.save()
    },
    list (params = {}, query = {}) {
      const {
        limit = 24,
        skip = 0,
        sort = '',
        filter = {},
        fields = []
      } = params
      if (query.search) {
        filter.$text = { $search: query.search }
      }
      return Model.find(filter, fields.join(' '), {
        skip,
        limit,
        sort })
    },
    show (params) {
      if (params.id) {
        return Model.findById(params.id)
      }
      Model.findOne(params)
    },
    update (id, payload) {
      return Model.update({ _id: id }, { $set: payload })
    },
    async destroy (id) {
      console.log(id)
      console.log(await Model.findById(id))
      return Model.remove({_id: id})
    }
  }
}
