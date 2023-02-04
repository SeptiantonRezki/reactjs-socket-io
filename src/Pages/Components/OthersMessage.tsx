import Message from "../../modals/messageModal";

const OthersMessage = ({...value}) => {
    return (
        <li className="clearfix">
            <div className="message-data">
                <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">Are we meeting today?</div>
        </li>
    )
}

export default OthersMessage;