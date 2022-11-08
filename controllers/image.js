const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      // If you are using knex.js version 1.0.0 or higher this now
      // returns an array of objects. Therefore, the code goes from:
      // entries[0] --> this used to return the entries
      // TO
      // entries[0].entries --> this now returns the entries
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
};
