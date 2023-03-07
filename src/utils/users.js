const users = []




const addUser = ({ id, colour, room }) => {
    colour = colour.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!colour || !room) {
        return {
            error: 'colour and room are required!'
        }
    }    const existingUser = users.find((user) => {
        return user.room === room && user.colour === colour
    })

    if (existingUser) {
        return {
            error: 'colour is in use!'
        }
    }

    colors = ['#8800ff', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000'];
userColorIndex = Math.floor(Math.random() * 8);
userColor = colors[userColorIndex];


positions = ['anchor_1', 'anchor_2', 'anchor_3', 'anchor_4', 'anchor_5'];
userPositionIndex = Math.floor(Math.random() * 5);
userPosition = positions[userPositionIndex];

console.log(userColor);

    const user = { id, colour, room, userColor, userPosition }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => {
    return users.find((user) => user.id === id)

}

const getColor = () => {
    return users.find((user) => user.userColor === userColor)
}

const getPosition = () => {
    return users.find((user) => userPosition)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getColor,
    getPosition
    
}