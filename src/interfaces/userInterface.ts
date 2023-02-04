interface userInterface {
    idUser: string,
    idSocket?: string | null,
    name: string,
    username: string,
    password: string,
    imageUrl: string,
    statusOnline: Boolean,
    lastOnline?: string | null,
}

export default userInterface;