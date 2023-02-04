import Message from "../../modals/messageModal";

const MyMessage = ({...value}) => {
    return (
        <li className="clearfix">
            <div className="message-data text-right">
                <span className="message-data-time">10:10 AM, Today</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
            </div>
            <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
        </li>
    )
}

export default MyMessage;