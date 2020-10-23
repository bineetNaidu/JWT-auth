import mongoose from 'mongoose';
import validate from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validate.isEmail, 'Please enter an valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    let authUser = await bcrypt.compare(password, user.password);

    if (authUser) {
      return user;
    } else {
      throw new Error('Incorrect Password');
    }
  }
  throw new Error('Incorrect Email');
};

export default mongoose.model('User', UserSchema);
