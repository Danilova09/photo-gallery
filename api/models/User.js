const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const UserSchema = new mongoose.Schema({
    avatar: String | null,
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!this.isModified('email')) return true;
                const user = await User.findOne({email: value});
                return !user;
            },
            message: 'This user is already registered'
        }
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    facebookId: String,
});

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
}

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = new mongoose.model('User', UserSchema);

module.exports = User;