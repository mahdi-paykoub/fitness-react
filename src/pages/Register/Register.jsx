import { React, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FaGoogle } from "react-icons/fa";
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from 'react-router-dom';
import BtnSpiner from '../../components/BtnSpiner/BtnSpiner';


export default function Register() {
    const [btnLoader, setBtnLoader] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const endPoint = useParams().endPoint


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('phone', data.phone)

        setBtnLoader(true)
        fetch(`${baseUrl}register`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                
                if (response.status !== false) {
                    localStorage.setItem('phone', JSON.stringify(response.phone))
                    setBtnLoader(false)
                    reset();
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه',
                    }).then((status) => {
                        navigate(`/verify-phone-number/${endPoint}`);
                    })
                } else {
                    setBtnLoader(false)
                    if (response.unPhone == 1) {
                        swal({
                            title: response.message[0],
                            icon: "error",
                            buttons: 'ورود',
                        }).then((status) => {
                            if (status) {
                                navigate(`/login/${endPoint}`)
                            }
                        })
                    } else {
                        swal({
                            title: response.message[0],
                            icon: "error",
                            buttons: 'باشه',
                        })
                    }

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
                                <img src="/images/banner/Sport Illustration Kit-10.png" className='w-100' alt="" />
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
                    <Col xs={10} xl={7} className='h-100vh'>
                        <Row className='justify-content-center h-100 align-items-center'>
                            <Col lg={6}>
                                <div className='fw-bold text-center fs30'>
                                    به سایت <span className='color-1'>مربی همراه </span> خوش آمدید
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} noValidate>


                                    <div className='fs14 mt-5'>سلام!</div>
                                    <div className='fs14 mt-3'>لطفا اطلاعات خود را وارد نمایید</div>
                                    <input type="text" className='w-100 custom-input px-3 mt-4' placeholder='نام و نام خانوادگی'
                                        {...register('name', formValidation('نام', true, 2, 30))}
                                    />
                                    <p className='mt-2 text-danger px-2 fs13'>
                                        {errors.name?.message}
                                    </p>
                                    <input type="text" className='w-100 custom-input px-3' placeholder='شماره موبایل'
                                        {...register('phone', formValidation('شماره موبایل', true, null, null, /^(?:98|\+98|0098|0)?9[0-9]{9}$/))}
                                    />
                                    <p className='mt-2 text-danger px-2 fs13'>
                                        {errors.phone?.message}
                                    </p>

                                    {
                                        btnLoader === false ?
                                            <button className='login-btn mt-1 w-100 text-white'>ثبت نام</button>
                                            :
                                            <button type='button' className='login-btn mt-1 w-100 text-white'>
                                                <BtnSpiner wid='30px' he='30px' />
                                            </button>
                                    }

                                </form>

                                <div className='fs14 mt-4 pt-2 text-center'>
                                    در صورتی که قبلا ثبت نام کرده اید <Link className='color-1' to={`/login/${endPoint}`}>وارد</Link> شوید
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
