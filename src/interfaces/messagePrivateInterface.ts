import Message from "../modals/messageModal";
import User from "../modals/userModal";

interface messagePrivateInterface {
    clientA: User,
    clientB: User,
    message: Message
}

export default messagePrivateInterface