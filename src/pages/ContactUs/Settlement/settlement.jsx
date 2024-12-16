import { React, useState, useEffect } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import { TbCubeSend } from 'react-icons/tb';
import swal from "sweetalert";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';

function Settlement() {
    const [settles, setSettles] = useState([]);
    const [loader, setLoader] = useState(true)
    let txt = ''
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const handleSendSettlement = (type) => {

        fetch(`${baseUrl}add-settlement`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: JSON.stringify({
                    type
                })
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(res => {
                        getSettlements()
                    })

                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    })
                }

            })
    }

    const getSettlements = () => {
        fetch(`${baseUrl}get-user-settlements`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setSettles(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getSettlements()
    }, [])

    const handleShowMessage = (id) => {
        swal({
            text: settles.find((stl) => stl.id == id).message,

            buttons: 'باشه'
        }).then(res => {
            getSettlements()
        })
    }
    return (<>
        <Row className="mb-5">
            <Col xs='12'>
                <div className="bg-white br-10 p-4 mt-3">
                    <Row className="justify-content-center">          
                        <Col lg='7'>
                            <div className="fs15 lh2 text-justify">
                                کاربر گرامی، شما میتوانید با توجه به میزان امتیازتان در سایت،کد تخفیف برای خرید دوره های سایت و یا برنامه های  تمرینی سایت درخواست کنید.
                                درضمن  این قابلیت نیز فراهم شده  که اگر امتیازتان به حد نساب رسیده باشد میتوانید آن را به صورت نقدی دریافت کنید
                                . توجه فرمایید بعد از ارسال درخواست،  بعد از تایید ادمین نتیجه درخواست توسط نوتیف های همین پنل برای شما ارسال خواهد شد
                                همچنین درصورتی که درخواست تسویه حساب به صورت نقدی را داشته باشید حتما باید اطلاعات حساب بانکی خود را تکمیل نمایید.
                            </div>
                            <div className="mt-4">
                                <div>
                                    <button className="send-btn fs14" style={{ 'width': '315px' }}
                                        onClick={() => handleSendSettlement('plan')}
                                    >
                                        درخواست کد تخفیف برای خرید دوره آموزشی
                                    </button>
                                </div>
                                <div>
                                    <button className="send-btn fs14 mt-3" style={{ 'width': '315px' }}
                                        onClick={() => handleSendSettlement('course')}
                                    >
                                        درخواست کد تخفیف برای خرید برنامه ورزشی
                                    </button>
                                </div>
                                <div>
                                    <button className="send-btn fs14 mt-3" style={{ 'width': '315px' }}
                                        onClick={() => handleSendSettlement('cash')}
                                    >
                                        درخواست تسویه به صورت نقدی
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col lg='5' className="text-center">
                            <div>
                                <img src="/images/12.png" className="w-100" alt="" />
                            </div>

                        </Col>
                    </Row>
                </div>
            </Col>

            <Col xs='12'>
                <div className='bg-white br-10 p-4 mt-3'>
                    {
                        loader ?
                            <SniperLoader />
                            :
                            settles.length !== 0 ?

                                <>
                                    <div className='text-secondary fflalezar'>
                                        درخواست های تسویه
                                    </div>
                                    <Table Table className='box-child-table mt-4 fflalezar' hover>
                                        <thead>
                                            <tr>
                                                <th>نوع درخواست</th>
                                                <th>وضعیت</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {settles.reverse().map((settle, index) => {
                                                if (settle.type == 'plan') {
                                                    txt = 'کد تخفیف برای خرید برنامه'
                                                } if (settle.type == 'course') {
                                                    txt = 'کد تخفیف برای خرید دوره'
                                                } if (settle.type == 'cash') {
                                                    txt = 'درخواست دریافت نقدی'
                                                }
                                                return <tr key={settle.id}>
                                                    <td>
                                                        {txt}
                                                    </td>
                                                    <td>
                                                        {settle.status == 0 ?
                                                            <button className='btn btn-danger btn-sm'>در انتطار بررسی</button>
                                                            :
                                                            <button className='btn btn-primary btn-sm'
                                                                onClick={() => handleShowMessage(settle.id)}
                                                            >
                                                                مشاهده پیام
                                                            </button>
                                                        }
                                                    </td>

                                                </tr>
                                            }
                                            )
                                            }
                                        </tbody>
                                    </Table>
                                </>


                                : <div className='text-center mt-4'>
                                    <img src="/images/undraw_no_data_re_kwbl.svg" className='w-25' alt="" />
                                    <div className='mt-3 text-secondary fs13'>
                                        درخواستی ارسال نشده
                                    </div>
                                </div>
                    }
                </div>
            </Col>

        </Row>
    </>);
}

export default Settlement;