const getCollection = require('../utils/collection')

const search = async (req, res) => {
  try {
    const {limit = 20, sort = "DESC", entity, filters} = req.query
    const sorting = sort === "DESC" ? -1 : 1;
    let findParam = {
      _isDeleted: { $eq:  false }
    };
    if (entity !== 'store' || entity !== 'product') {
      res.status(400).json({ message: 'Not a valid entity' });
    }
    if (filters) {
      const decodedParam = decodeURIComponent(filters);
      const parsedFilters = JSON.parse(decodedParam); // Parse JSON string into an array
      // name contains string
      // categories in categoryIds in the store/product
      findParam = { ...findParam, ...parsedFilters };
    }
    const collection = getCollection(entity);
    const data = await collection.find(findParam).sort({ createdAt: sorting}).limit(limit);
    res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
module.exports = {
  search,
};
