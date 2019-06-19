module.exports = { // this is to have one place to keep secret messages
    jwtSecret: process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable',
}
