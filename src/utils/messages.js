const generateMessage = (username, text, color, position) => {
    return {
        username,
        text,
        color,
        position,
        createdAt: new Date().getTime()
    }
}


const generateStyle = (username, text, color, position) => {
    return {
        username,
        text,
        color,
        position,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage,
    generateStyle
}