import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { TbEditCircle } from "react-icons/tb";
import { Link, useLocation } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";


export default function Verify() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const phoneNumber = JSON.parse(localStorage.getItem('phone'))



    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('code', data.code)
        formData.append('phone', phoneNumber)


        fetch(`${baseUrl}verify-phone-number`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    localStorage.setItem('phone', JSON.stringify(response.phone))
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
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
                                    کد تائید برای شماره موبایل <span className='ffv'>{phoneNumber}</span> ارسال گردید
                                    <Link>
                                        <TbEditCircle className='me-2 text-secondary' fontSize={19} />
                                    </Link>
                                </div>
                                {/* 
                                <div className='text-center mt-4 pt-3 fw-bold fs14'>
                                    کد تایید را وارد نمایید
                                </div> */}
                                <div className='mt-3 text-center'>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                                        {/* <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' />
                                    <input type="text" className='input-for-verify-code mx-1' /> */}
                                        <input type="text" className='w-100 custom-input text-center px-3 mt-4' placeholder='کد تایید را وارد نمایید'
                                        {...register('code', formValidation('کد'))}
                                        />
                                    </form>
                                </div>
                                <div className='text-center'>
                                    <button class="login-btn mt-4 fs15 w-100 text-white mt-4">تایید و ادامه</button>
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
