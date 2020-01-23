import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    // getUsers,
    getById
    // remove,
    // update
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred);
        return _handleLogin(user);
    } catch (err) {
        console.log('UserService: err in login', err);
    }
}

async function signup(userCred) {
    try {
        const user = await HttpService.post('auth/signup', userCred);
        return _handleLogin(user);
    } catch (err) {
        console.log('UserService: err in signup', err);
    }
}

async function logout() {
    try {
        await HttpService.post('auth/logout');
        localStorage.removeItem('user');
    } catch (err) {
        console.log('UserService: err in logout', err);
    }
}

function _handleLogin(user) {
    localStorage.setItem('user', JSON.stringify(user))
    return user;
}


// function getUsers() {
//     return HttpService.get('user')
// }

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
// function remove(userId) {
//     return HttpService.delete(`user/${userId}`)
// }

// function update(user) {
//     return HttpService.put(`user/${user._id}`, user)
// }
