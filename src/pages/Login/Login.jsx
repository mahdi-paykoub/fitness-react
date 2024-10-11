import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FaGoogle } from "react-icons/fa";



export default function Login() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={5} className='p-2 h-100vh'>
                        <div className='letf-login-side h-100'>
                            <div className=''>
                                <img src="images/banner/Sport Illustration Kit-10.png" className='w-100' alt="" />
                                <div className='text-center l-r-text mt-2'>
                                    ساخت حساب کاربری
                                </div>
                                <div className='mt-1 text-center text-secondary fs15 px-4 lh2'>
                                    با ثبت نام امکان خرید برنامه های تمرینی و دوره های ویدیویی برای شما فراهم میشود
                                    ابتدا شماره موبایل خود را وارد نمایید و در صفحه بعد آن را تایید کنید.
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7} className='h-100vh'>
                        <Row className='justify-content-center h-100 align-items-center'>
                            <Col lg={6}>
                                <div className='fw-bold text-center fs30'>
                                    به سایت <span className='color-1'>مربی همراه </span> خوش آمدید
                                </div>
                                <div className='fs14 mt-5'>سلام!</div>
                                <div className='fs14 mt-3'>لطفا شماره موبایل خود را وارد نمایید</div>
                                <input type="text" className='w-100 custom-input px-3 mt-4' placeholder='' />
                                <button className='login-btn mt-4 w-100 text-white'>ورود</button>
                                <div className='d-flex my-4 align-items-center justify-content-center'>
                                    <hr className='w-25' />
                                    <div className='fs12 text-secondary px-3'>ادامه دادن با</div>
                                    <hr className='w-25' />
                                </div>
                                {/* <div className='d-flex justify-content-center w-100'>
                                    <div className='google-box rounded-circle d-flex justify-content-center align-items-center'>
                                        <FaGoogle className='text-white' fontSize={20} />
                                    </div>
                                </div>
                                 */}
                                <button className='login-btn w-100 text-white fs14'>
                                <FaGoogle className='text-white ms-2' fontSize={18} />
                                    ورود با گوگل
                                   
                                </button>

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
