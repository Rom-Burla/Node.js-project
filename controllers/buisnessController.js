//                                                                                           בס"ד

const {
  BuisnessCard,
  generateRandomNumber,
  getUserId,
} = require("../models/BuisnessCard");
require("cookie-parser");
const User = require("../models/User");

// create new buisness card and update user biz to true
const card_post = async (req, res) => {
  try {
    const buisnessCard = new BuisnessCard(req.body);
    const err = buisnessCard.buisnessCardValidation(req.body);
    if (err.error) {
      res.status(400).json(err.error.details[0].message);
    } else {
      const buisnessCard = await BuisnessCard.create({
        buisnessName: req.body.buisnessName,
        buisnessNumber: await generateRandomNumber(),
        buisnessDescription: req.body.buisnessDescription,
        address: {
          street: req.body.address.street,
          houseNumber: req.body.address.houseNumber,
          city: req.body.address.city,
          zipCode: req.body.address.zipCode,
        },
        buisnessPhone: req.body.buisnessPhone,
        buisnessImage: req.body.buisnessImage,
        user_id: getUserId(req),
      });
      await User.findByIdAndUpdate(buisnessCard.user_id, {
        biz: true,
      });
      const user = await User.findById(buisnessCard.user_id);
      res.status(200).json([buisnessCard, user]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// find buisness card by id
const card_get_by_id = async (req, res) => {
  const id = req.params.id;
  try {
    const buisnessCard = await BuisnessCard.findById(id);
    res.status(200).json(buisnessCard);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// buisness card update by id
const card_update_by_id = async (req, res) => {
  const id = req.params.id;
  try {
    const buisnessCard = new BuisnessCard(req.body);
    const err = buisnessCard.buisnessCardValidation(req.body);
    if (err.error) {
      res.status(400).json(err.error.details[0].message);
    } else {
      await BuisnessCard.findByIdAndUpdate(id, req.body);
      const updatedBuisnessCard = await BuisnessCard.findById(id);
      res.status(200).json(updatedBuisnessCard);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// buisness card delete by id and update user biz if there is no buisness cards to false
const card_delete_by_id = async (req, res) => {
  const id = req.params.id;
  try {
    await BuisnessCard.findByIdAndDelete(id);
    const buisnessCard = await BuisnessCard.findOne({
      user_id: getUserId(req),
    });
    if (!buisnessCard) {
      await User.findByIdAndUpdate(getUserId(req), {
        biz: false,
      });
    }
    res.status(204).json("deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// buisness cards by user id
const card_by_user_id = async (req, res) => {
  const id = req.params.id;
  try {
    const buisnessCards = await BuisnessCard.find({ user_id: id }).populate(
      "user_id"
    );
    res.status(200).json(buisnessCards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// get buisness card by id that found in token
const card_by_token = async (req, res) => {
  const id = getUserId(req);
  try {
    const buisnessCards = await BuisnessCard.find({ user_id: id }).populate(
      "user_id"
    );
    res.status(200).json(buisnessCards);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  card_post,
  card_get_by_id,
  card_update_by_id,
  card_delete_by_id,
  card_by_user_id,
  card_by_token,
};
