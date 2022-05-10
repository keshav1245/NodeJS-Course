const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt : new Date().getTime()
    }
}

const generatedLocationMessage = (username, url) => {
    console.log({
        username,
        url,
        createdAt : new Date().getTime()
    })
    return {
        url,
        createdAt : new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generatedLocationMessage
}