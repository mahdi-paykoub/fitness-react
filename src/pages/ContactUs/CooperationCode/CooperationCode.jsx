import { Col, Row } from "react-bootstrap";
import { React, useState, useEffect } from 'react'
import { CiBarcode } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import './style.css';
import { FaStar } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

function CooperationCode() {
    const [code, setCode] = useState(null);
    const [forW, setForW] = useState('');

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
  
    const getCode = () => {
        fetch(`${baseUrl}get-user-subscribe-code`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {                
                setCode(res.data)
                if(res.data != null){
                    if (res.data.for == 'plan') {
                        setForW('دوره')
                    } if (res.data.for == 'course') {
                        setForW('برنامه')
                    } if (res.data.for == 'all') {
                        setForW('برنامه و دوره')
                    }
                }
            })
    }


    useEffect(() => {
        getCode()
    }, [])


    return (<>


        {
            code != null ?
                <>
                    <Row className="mt-3">
                        <Col>
                            <div className="bg-white br-10 p-3 fs14 lh2">
                                <div className="fflalezar fs18 text-secondary d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <CiBarcode fontSize={25} className="color-2" />
                                        <div className=" me-1">کد اشتراک در فروش شما:</div>
                                    </div>
                                    <div className="me-2 d-flex align-items-center">
                                        <div>{code.code}</div>
                                        <IoCopyOutline className="me-2" />

                                    </div>
                                </div>

                            </div>

                        </Col>
                    </Row >
                    <Row>
                        <Col>
                            <div className="bg-white br-10 p-3 lh2 mt-3">
                                <Row className="align-items-center">
                                    <Col lg='6' className="text-center">
                                        <div className="pe-4 fflalezar text-secondary fs18">
                                            <div className="d-flex align-items-center">
                                                <div>از نوع:</div>
                                                <div className="me-1">{
                                                    code.type == 'percent' ? 'درصدی' : 'مبلغ ثابت'
                                                }</div>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <div>میزان تخفیف :</div>
                                                <div className="me-1">{
                                                    code.type == 'percent' ?
                                                        <span>{code.value} %</span>
                                                        :
                                                        <>
                                                            {Number(code.value).toLocaleString()}
                                                            <span className="fs14"> تومان</span>
                                                        </>
                                                }</div>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <div>برای  :</div>
                                                <div className="me-1">
                                                    {forW}
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <div>وضعیت  :</div>
                                                <div className="me-1 color-2">{code.status == 1 ? 'فعال' : 'غیر فعال'}</div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg='6' className="text-center">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div className="circle-box-usage text-center d-flex align-items-center justify-content-center fs30 fflalezar text-secondary mx-auto">
                                                    {code.usage}
                                                </div>
                                                <div className="mt-2 fflalezar text-secondary d-flex align-items-center justify-content-center">
                                                    <MdOutlineNumbers className="ms-2 text-secondary" fontSize={20} />

                                                    <div className="mt-1 ">
                                                        تعداد استفاده
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="me-4">
                                                <div className="circle-box-usage text-center bg-warning d-flex align-items-center justify-content-center fs30 fflalezar text-white mx-auto"
                                                >
                                                       {code.score}
                                                </div>
                                                <div className="mt-2 fflalezar text-secondary d-flex align-items-center justify-content-center ">
                                                    <FaStar className="ms-2 text-warning" fontSize={20} />

                                                    <div className="pt-1">امتیاز شما</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                    </Row>
                </>
                :
                <Row className="mt-3">
                    <Col>
                        <div className="bg-white br-10 p-3 fs14 lh2">
                            <div className='text-center mt-4'>
                                <img src="/images/undraw_no_data_re_kwbl.svg" className='w-25' alt="" />
                                <div className='mt-3 text-secondary fflalezar'>
                                    کدی برای شما اختصاص نیافته است.
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row >
        }


    </>);
}

export default CooperationCode;