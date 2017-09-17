var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var SALT_FACTOR = 10

// user schema
var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	displayName: String,
	bio: String
})

// password hash
var noop = function(){}

userSchema.pre('save', function(done){
	var user = this	
	if (!user.isModified('password')){
		return done()
	}
	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err) {
			return done(err)
		}
		bcrypt.hash(user.password, salt, noop, function(err, hashedPasword){
			if (err){
				return done(err)
			}
			user.password = hashedPassword
			done()
		})
	})
})

// compare passwords
userSchema.methods.checkPassword = function(guess, done){
	bcrypt.compare(guess, this.password, function(err, isMatch){
		done(err, isMatch)
	})
}

// get users name
userSchema.methods.name = function(){
	return this.displayName || this.username
}

// attach schema to actual model
var User = mongoose.model('User', userSchema)

// export model
module.exports = User
