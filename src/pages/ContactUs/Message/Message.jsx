import { Col, Row } from "react-bootstrap";
import { BiMessageDetail, BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";

function Message() {
    return (<>
        <Row>
            <Col>
                <div className="bg-white p-4 br-10 mt-3">
                    <div className="fs17 fw-bold c-text-secondary border-bottom pb-3">
                        <BiMessageSquareDetail fontSize={23} />
                        <span className="me-2">پیام ها</span>
                    </div>

                    <div className="d-flex p-3 align-items-center mt-3">
                        <div>
                            <img src="/images/speaker.png" width={50} height={50} alt="" />
                        </div>
                        {/* title */}
                        <div className=" me-2">
                            <div className="fs14">
                                  به جمع  باشگاه مربی همراهی ها خوش آمدید.
                            </div>
                            <div className="mt-2 fs13 text-secondary">
                                از این پس میتوانید با کدمعرف که از ما دریافت میکنید برای کد تخفیف یا تسویه نقدی اقدام نمایید
                            </div>
                        </div>
                    </div>

                    
                  
                </div>
            </Col>
        </Row>
    </>);
}

export default Message;