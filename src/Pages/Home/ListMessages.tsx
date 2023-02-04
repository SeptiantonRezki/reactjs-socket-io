import { useContext } from "react";
import Message from "../../modals/messageModal"
import CurrentUserContext from "../../store/userStore";
import { MyMessage, OthersMessage } from "../Components"

const ListMessages = ({ ...value }) => {
    const { currentUser, dispatch } = useContext(CurrentUserContext);

    return (
        <div className="chat-history" style={{ height: '400px', overflowY: 'scroll' }}>

        <ul className="m-b-0">
            {value.group && value.group.messages.length > 0 &&
                value.group.messages.map((element1: Message) => {
                    if (currentUser!.idUser === element1.user.idUser) {
                        return < MyMessage />
                    } else {
                        return < OthersMessage />
                    }
                })
            }
        </ul>
        </div>
    )
}

export default ListMessages