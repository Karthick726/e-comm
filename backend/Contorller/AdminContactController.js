const contactModel = require("../Schema/AdminContactSchema");

exports.postContact = async (req, res) => {
  const {
    id,
    phoneIndia,

    whatsapp,
    email,
    address,
  } = req.body;

  try {
    const contact = await contactModel.findByIdAndUpdate(
      id,
      {
        phoneIndia,
        whatsapp,
        email,
        address,
      },
      { new: true }
    );
    if (!contact) {
      return res.status(400).json({ message: "Invalid contact details" });
    }
    res.status(200).json({ message: "Contact saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await contactModel.find();
    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
