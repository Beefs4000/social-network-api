const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      default: true,
      unique: true,
      trim: true,
      validate: {
      validator: function (v) {
        return emailRegex.test(v);
      },
      message: "Email is wrong"
    }
    },
        thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: Thought,
      },
    ],
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function(){
  return this.friends.length;
})

const User = model('user', userSchema);

// const user = new User({
//   username: "   abd   ",
//   email: "   hey@aaa.com    ",
//   thoughts: [],
//   friends: []
// });
// console.log(user),
// user.save().then(console.log);

module.exports = User;
