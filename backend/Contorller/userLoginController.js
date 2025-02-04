const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const signupModel = require("../Schema/userLogin");
const secreteKey = require("../Config/config");
const transporter = require("../Nodemailer/nodeMailer");

function generateOTP() {
  let generateOtp = Math.floor(Math.random() * 1000000);
  generateOtp = generateOtp.toString();
  otps = generateOtp.padStart(6, "0");
  return otps;
}

exports.userSignup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const existingUser = await signupModel.findOne({ email });
    const existingUserName = await signupModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const otp = generateOTP();
      const newUser = new signupModel({
        username,
        otp,
        createdAt: Date.now(),
      });
      await newUser.save();

      const mailOptions = {
        from: "lingamkarthick89@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        message: "OTP sent to your email",
      });
    }
    setTimeout(async () => {
      try {
        console.log("timeout");
        const user = await signupModel.findOne({ username });
        if (user) {
          const result = await signupModel.findByIdAndUpdate(
            user._id,
            { otp: "" },
            { new: true }
          );
        }
      } catch (error) {
        console.error(`Error clearing OTP for ${username}: ${error.message}`);
      }
    }, 5 * 60 * 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signupModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: err.message });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      res.status(400).json({ message: err.message });
    }
    const token = jwt.sign({ id: user._id }, secreteKey, { expiresIn: "7d" });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: false, // Allow JavaScript to access (for debugging)
        secure: false, // Must be false on localhost (Only true for HTTPS)
        sameSite: "lax", // Allows cookies across subdomains
        path: "/", // Ensures cookie is accessible site-wide
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, token, user });
  } catch (error) {
    res.status(302).json({ message: error.message });
  }
};

exports.adduser = async (req, res) => {
  try {
    const { username, email, password, otp } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const user = await signupModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (otp === user.otp) {
      const hashpassword = await bcrypt.hash(password, 10);
      const loginUser = await signupModel.findByIdAndUpdate(
        user._id,
        {
          password: hashpassword,
          otp: "",
          email: email,
          username: username,
        },
        {
          new: true,
        }
      );
      res.status(200).json(loginUser);
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const existingUserName = await signupModel.findOne({ username });
    if (existingUserName) {
      const otp = generateOTP();
      const loginUser = await signupModel.findByIdAndUpdate(
        existingUserName._id,
        {
          otp: otp,
        },
        {
          new: true,
        }
      );

      const mailOptions = {
        from: "lingamkarthick89@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        message: "OTP sent to your email",
      });
    }

    setTimeout(async () => {
      try {
        console.log("timeout");
        const user = await signupModel.findOne({ username });
        if (user) {
          const result = await signupModel.findByIdAndUpdate(
            user._id,
            { otp: "" },
            { new: true }
          );
        }
      } catch (error) {
        console.error(`Error clearing OTP for ${username}: ${error.message}`);
      }
    }, 5 * 60 * 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await signupModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    } else {
      const resetToken = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetPasswordExpires = Date.now() + 3600000;

      await user.save();

      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

      const mailOptions = {
        to: user.email,
        from: "noreply@yourdomain.com",
        subject: "Password Reset Request",
        text: `You are receiving this because you (or someone else) requested a password reset for your account.
      Please click on the following link to reset your password:
      ${resetUrl}
      If you did not request this, please ignore this email.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: `Password reset link sent to ${email}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await signupModel.findById(req.user.id); // Exclude password for security

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  console.log(req.body);
  try {
    const {
      id,
      username,
      email,
      phoneNumber,
      doorno,
      area,
      landmark,
      street,
      district,
      state,
      pincode,
    } = req.body;

    const user = await signupModel.findByIdAndUpdate(
      req.user.id,
      {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        address: {
         doorno: doorno,
          area:area,
          landmark:landmark,
          street:street,
          district:district,
          state:state,
          pincode:pincode,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
