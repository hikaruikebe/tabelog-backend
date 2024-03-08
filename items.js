const getItems = (restaurants) => {
  const res = [];
  for (let i = 0; i < restaurants.length; i++) {
    res.push(restaurants[i].dataValues);
  }
  return res;
};

exports.getItems = getItems;
