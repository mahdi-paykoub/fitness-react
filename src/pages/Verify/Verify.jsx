import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { TbEditCircle } from "react-icons/tb";
import { Link } from 'react-router-dom';



export default function Verify() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={5} className='p-2 h-100vh'>
                        <div className='letf-login-side h-100'>
                            <div className=''>
                                <img src="images/banner/Sport Illustration Kit-10.png" className='w-100' alt="" />
                                <div className='text-center l-r-text mt-2'>
                                    تایید شماره موبایل
                                </div>
                                <div className='mt-1 text-center text-secondary fs15 px-4 lh2'>
                                    کدی  6 رقمی برای شماره موبایل شما  پیامک شده است. آن را در فیلد روبرو وارد نمایید تا حساب کاربری برای شما ساخته شود.
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7} className='h-100vh'>
                        <Row className='justify-content-center h-100 align-items-center'>
                            <Col lg={6}>
                                <div className='fw-bold text-center fs30'>
                                    تایید  <span className='color-1'>شماره موبایل</span>
                                </div>
                                <div className='text-center text-secondary fs14 mt-4 pt-2'>
                                    کد تائید برای شماره موبایل ۰۹۳۰۹۵۱۹۳۶۶ ارسال گردید
                                    <Link>
                                        <TbEditCircle className='me-2 text-secondary' fontSize={19} />
                                    </Link>
                                </div>

                                <div className='text-center mt-4 pt-3 fw-bold fs14'>
                                    کد تایید را وارد نمایید
                                </div>
                                <div className='mt-4 text-center'>
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                </div>
                                <div className='text-center'>
                                    <button class="login-btn mt-4 fs15 w-100 text-white mt-5">تایید و ادامه</button>
                                </div>
                            </Col>

                        </Row>
                        <div className='ball ball-1'></div>
                        <div className='ball ball-2'></div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
