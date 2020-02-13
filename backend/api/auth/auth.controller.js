const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
        req.session.save();
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: 'could not login, please try later' })
    }
}

async function signup(req, res) {
    try {
        const { firstName, lastName, email, password, username } = req.body
        logger.debug(firstName + "," + lastName + "," + email + ", " + username + ', ' + password)
        const account = await authService.signup(firstName, lastName, email, password, username)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(email, password)
        req.session.user = user
        req.session.save();
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: 'could not signout, please try later' })
    }
}

async function getLoggedInUser(req, res) {
    try {

        if (req.session.user) {
            req.session.save();
            res.json(req.session.user);
        } else {
            res.json({});
        }     
    } catch (err) {
        logger.error('no signedin users', err);
        res.status(500).send({ error: 'no signedin users' });
    }
}

module.exports = {
    login,
    signup,
    logout,
    getLoggedInUser
}