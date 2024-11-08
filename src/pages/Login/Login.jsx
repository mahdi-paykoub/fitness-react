import { React, useContext } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";


export default function Login() {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;



    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('phone', data.phone)


        fetch(`${baseUrl}login`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {

                if (response.status !== false) {
                    localStorage.setItem('phone', JSON.stringify(response.phone))
                    reset();
                    navigate('/verify-phone-number');
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
                <Row className='justify-content-center'>
                    <Col xl={5} className='p-2 h-100vh d-none d-xl-block'>
                        <div className='letf-login-side h-100'>
                            <div className=''>
                                <img src="images/banner/Sport Illustration Kit-10.png" className='w-100' alt="" />
                                <div className='text-center l-r-text mt-2'>
                                    ورود به حساب کاربری
                                </div>
                                <div className='mt-1 text-center text-secondary fs15 px-4 lh2'>
                                    با ثبت نام امکان خرید برنامه های تمرینی و دوره های ویدیویی برای شما فراهم میشود
                                    ابتدا شماره موبایل خود را وارد نمایید و در صفحه بعد آن را تایید کنید.
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} xl={7} className='h-100vh'>
                        <Row className='justify-content-center h-100 align-items-center'>
                            <Col lg={6}>
                                <div className='fw-bold text-center fs30'>
                                    به سایت <span className='color-1'>مربی همراه </span> خوش آمدید
                                </div>
                                <div className='fs14 mt-5'>سلام!</div>
                                <div className='fs14 mt-3'>لطفا شماره موبایل خود را وارد نمایید</div>
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <input type="text" className='w-100 custom-input px-3 mt-4' placeholder=''
                                        {...register('phone', formValidation('شماره موبایل'))}
                                    />
                                    <p className='mt-2 text-danger px-2 fs13'>
                                        {errors.phone?.message}
                                    </p>
                                    <button className='login-btn mt-2 w-100 text-white'>ورود</button>

                                </form>
                                {/* <div className='d-flex my-4 align-items-center justify-content-center'>
                                        <hr className='w-25' />
                                        <div className='fs12 text-secondary px-3'>ادامه دادن با</div>
                                        <hr className='w-25' />
                                    </div>
                                <div className='d-flex justify-content-center w-100'>
                                    <div className='google-box rounded-circle d-flex justify-content-center align-items-center'>
                                        <FaGoogle className='text-white' fontSize={20} />
                                    </div>
                                </div>
                                
                                <button className='login-btn w-100 text-white fs14'>
                                    <FaGoogle className='text-white ms-2' fontSize={18} />
                                    ورود با گوگل

                                </button> */}
                                <div className='fs14 mt-4 pt-2 text-center'>
                                    در صورتی که قبلا ثبت نام نکرده‌اید اید <Link className='color-1' to='/register'>ثبت نام</Link> کنید
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
