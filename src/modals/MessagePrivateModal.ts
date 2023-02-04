import messagePrivateInterface from "../interfaces/messagePrivateInterface"
import Message from "./messageModal";
import User from "./userModal";


class MessagePrivate {
    clientA: User;
    clientB: User;
    message: Message;

    constructor(value: messagePrivateInterface) {
        this.clientA = value.clientA;
        this.clientB = value.clientB;
        this.message = value.message;
    }
}

export default MessagePrivate;