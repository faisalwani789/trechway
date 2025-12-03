import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        minLength: 4,

    },
    email: {
        type: 'String',
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    userName: {
        type: 'String',
        minLength: 5
    },
    profilePic: {
        type: 'String',
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    password: {
        type: 'String',
        minLength: 8,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
            },
            message:
                "Password must be at least 8 characters and include upper & lowercase letters, a number, and a special character."
        }
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
userSchema.methods.getJwt = function () {
    const id = this._id
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1d" })
}
userSchema.methods.comparePassword=async function(inputPassword){
    return await bcrypt.compare(inputPassword,this.password)
}
userSchema.pre("save", async function (next) {
    //this will run only if we use .save() to save the document
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10)
    // next()

})
userSchema.pre("findOneAndUpdate",async function(){
    //this._update is the object query passed in findOneAndUpdate
    //this runs for patch request if we use findOneAndUpdate
    if(this._update.password){
        this._update.password=await bcrypt.hash(this._update.password,10)
    } 
})
const User = mongoose.model("User", userSchema)
export default User