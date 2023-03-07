const generateMessage = (colour, text, color, position) => {
    return {
        colour,
        text,
        color,
        position,
        createdAt: new Date().getTime()
    }
}


const generateStyle = (colour, text, color, position) => {
    return {
        colour,
        text,
        color,
        position,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (colour, url) => {
    return {
        colour,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage,
    generateStyle
}