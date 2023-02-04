import { createContext } from "react";
import User from "../modals/userModal";

interface currentUserInterface {
    currentUser: User | null,
    dispatch: React.Dispatch<React.SetStateAction<User | null>>,
}

const CurrentUserContext = createContext<currentUserInterface>({} as currentUserInterface);

export default CurrentUserContext;
