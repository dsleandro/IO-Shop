const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {type: String, required: true, trim: true, maxlength: 40},
    lastName: {type: String, required: true, trim: true, maxlength: 40},
    email: {type: String, required:true, lowercase: true, trim: true},
    password: {type: String, required:true, minlenght: 8},
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", userSchema);