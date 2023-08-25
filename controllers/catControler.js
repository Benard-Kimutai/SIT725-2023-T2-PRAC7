import { postCat, getAllCats } from "../models/cats.js"

export const getAllCatsController = async (req, res) => {
  getAllCats((result) => {
    res.json({
      statuscode: 200,
      data: result,
      message: 'get all calls sucessful'
    });

  });
}

export const postCatController = (req, res) => {
  let cat = req.body;
  postCat(cat, (err, result) => {
    if (!err) {
      res.json({
        statuscode: 201,
        data: result,
        message: 'success'
      });
    }
  });
}

