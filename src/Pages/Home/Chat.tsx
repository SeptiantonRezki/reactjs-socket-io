import { InputGroup, Form } from "react-bootstrap"
import ListMessages from "./ListMessages"

const Chat = ({ ...values }) => {
    return (
        <>
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src={values.user.imageUrl} alt="avatar" />
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0">{values.user.name}</h6>
                            {values.user.statusOnline === true ?
                                <div className="status"> <i className="fa fa-circle online"></i> online </div>
                                :
                                <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                            }
                        </div>
                    </div>
                    {/* 
                                <div className="col-lg-6 hidden-sm text-right">
                                    <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                                </div> 
                                */}
                </div>
            </div>
            <ListMessages group={values.group} />
            <div className="chat-message clearfix">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" onClick={values.sendMessage}><i className="fa fa-send"></i></InputGroup.Text>
                    <Form.Control
                        placeholder="Enter text here..."
                        aria-label="message"
                        aria-describedby="basic-addon1"
                        onChange={(e) => values.onChange(e.target.value)}
                    />
                </InputGroup>

            </div>
        </>
    )
}

export default Chat;