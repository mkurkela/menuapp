const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {     
    createUser: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }

        try {
            const exUser = await User.findOne({ name: args.userInput.name })
            if (exUser) {
                throw new Error('User exists already.');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                name: args.userInput.name, 
                password: hashedPassword
            });
            const res = await user.save();
            return { 
                ...res._doc,
                password: null,
                _id: res.id
            }; 
        } catch(err) {
                throw err;
        }
    },
    login: async ({ username, password }) => {
        const user = await User.findOne({ name: username });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Invalid credentials');
        }

        token = await jwt.sign({ userId: user.id, username: user.name },
                               'SECRET_KEY',
                               { expiresIn: '15m' });

        return { userId: user.id, token: token, tokenExpiration: 15 }

    }
};
