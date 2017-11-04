module.exports = (req, res) => {
  console.log(req.query);
  res.render('budget');
};
