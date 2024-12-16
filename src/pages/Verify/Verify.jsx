import { React, useContext, useState } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { TbEditCircle } from "react-icons/tb";
import { Link, useLocation, useParams } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import BtnSpiner from '../../components/BtnSpiner/BtnSpiner';


export default function Verify() {

    const [btnLoader, setBtnLoader] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const phoneNumber = JSON.parse(localStorage.getItem('phone'))
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
    const endPoint = useParams().endPoint


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('code', data.code)
        formData.append('phone', phoneNumber)
        setBtnLoader(true)


        fetch(`${baseUrl}verify-phone-number`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    authContext.login(response.token)
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        setBtnLoader(false)


                        switch (Number(endPoint)) {
                            case 1:
                                {
                                    console.log(endPoint);
                                    navigate('/');
                                    break;
                                }
                            case 2:
                                {
                                    navigate('/checkout');
                                    break;
                                }
                            case 3:
                                {
                                    navigate('/get-free-plans');
                                    break;
                                }
                            case 4:
                                {
                                    navigate('/cooperate-with-us');
                                    break;
                                }

                            default:
                                break;
                        }

                    })
                } else {
                    swal({
                        title: response.message[0],
                        icon: "error",
                        buttons: 'باشه'
                    }).then(() => {
                        setBtnLoader(false)
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
                                <img src="/images/banner/Sport Illustration Kit-10.png" className='w-100' alt="" />
                                <div className='text-center l-r-text mt-2'>
                                    تایید شماره موبایل
                                </div>
                                <div className='mt-1 text-center text-secondary fs15 px-4 lh2'>
                                    کدی  6 رقمی برای شماره موبایل شما  پیامک شده است. آن را در فیلد روبرو وارد نمایید تا حساب کاربری برای شما ساخته شود.
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} xl={7} className='h-100vh'>
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
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className='mt-3 text-center'>
                                        <input type="text" className='w-100 custom-input text-center px-3 mt-4' placeholder='کد تایید را وارد نمایید'
                                            {...register('code', formValidation('کد', true, 6, 6, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13'>
                                            {errors.code?.message}
                                        </p>
                                    </div>
                                    <div className='text-center'>

                                        {
                                            btnLoader === false ?
                                                <button class="login-btn mt-1 fs15 w-100 text-white">تایید و ادامه</button>
                                                :
                                                <button type='button' className='login-btn mt-1 w-100 text-white'>
                                                    <BtnSpiner wid='30px' he='30px' />
                                                </button>
                                        }
                                    </div>
                                </form>
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
