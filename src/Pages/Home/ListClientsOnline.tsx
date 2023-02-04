import { useEffect } from "react";
import User from "../../modals/userModal";

const ListClientsOnline = ({ ...value }) => {

    return (
        <ul className="list-unstyled chat-list mt-2 mb-0">
            {value.users && value.users.length > 0 &&
                value.users.map((element1: User) => {
                    return (
                        <li className="clearfix" onClick={() => value.handleSelectedClient(element1)}>
                            <img src={element1.imageUrl} alt="avatar" />
                            <div className="about">
                                <div className="name">{element1.name}</div>
                                {element1.statusOnline === true ?
                                    <div className="status"> <i className="fa fa-circle online"></i> online </div>
                                    :
                                    <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ListClientsOnline;