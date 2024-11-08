import { React, useState, useEffect } from 'react'
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from 'react-bootstrap';
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

export default function Setting() {
    const [tab, setTab] = useState('sms')

    const [adminTsms, setAdminTsms] = useState(null)
    const [adminRsms, setAdminRsms] = useState(null)
    const [userTsms, setUserTsms] = useState(null)
    const [userWsms, setUserWsms] = useState(null)


    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('value1', data.value1)
        formData.append('value2', data.value2)

        fetch(`${baseUrl}admin/admin-phone-number`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    swal({
                        title: 'شماره تماس با موفقیت ثبت شد',
                        icon: "success",
                        buttons: 'باشه'
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


    const getOptions = () => {
        fetch(`${baseUrl}admin/get-all-options`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                res.data.forEach(element => {
                    switch (element.key) {
                        case 'ADMIN_TICKET_SMS':
                            setAdminTsms(Number(element.value));
                            break;
                        case 'ADMIN_REGISTER_SMS':
                            setAdminRsms(Number(element.value));
                            break;
                        case 'USER_TICKET_SMS':
                            setUserTsms(Number(element.value));
                            break;
                        case 'USER_WELCOME_SMS':
                            setUserWsms(Number(element.value));
                            break;
                        case 'ADMIN_TICKET_PHONE':
                            setValue('value1', (element.value == 'undefined' || element.value == null) ? '' : element.value)
                            break;
                        case 'ADMIN_REGISTER_PHONE':
                            setValue('value2', (element.value == 'undefined' || element.value == null) ? '' : element.value)
                            break;

                        default:
                            break;
                    }
                });
            })
    }


    useEffect(() => {
        getOptions()
    }, [])

    const handleChangeOfSelector = (value, key) => {
        console.log(value);

        fetch(`${baseUrl}admin/admin-sms-option`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: JSON.stringify({
                    key: key,
                    value: value,
                })
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    swal({
                        title: 'تنظیمات با موفقیت ذخیره شد',
                        icon: "success",
                        buttons: 'باشه'
                    })
                } else {
                    swal({
                        title: 'مشکلی در ثبت بوجود امد',
                        icon: "error",
                        buttons: 'باشه'
                    })
                }

            })
    }


    return (
        <>
            <div className='bg-body-secondary br-10 d-flex'>
                <div className={`py-3 me-3 ${tab === 'sms' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('sms')}>
                    <HiOutlineChatBubbleBottomCenterText fontSize={20} className='ms-1' />
                    تنظیمات پیامک
                </div>
                <div className={`py-3 me-3 ${tab === 'phoneNumber' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('phoneNumber')}>
                    <AiOutlinePhone fontSize={20} className='ms-1' />
                    شماره پیامک
                </div>

            </div>
            <div className='mt-3 bg-body-secondary br-10 p-4 c-text-secondary'>
                {
                    tab === 'sms' &&
                    <div>
                        <Row>
                            <Col lg='4'>
                                پیامک تیکت به ادمین
                            </Col>
                            <Col lg='8'>
                                <input type="checkbox" className='form-check-input ms-1'
                                    onChange={(e) => {
                                        handleChangeOfSelector(e.target.checked, 'ADMIN_TICKET_SMS')
                                        setAdminTsms(e.target.checked)
                                    }}
                                    checked={adminTsms}
                                />
                                <span className='fs15 text-secondary'>فعال شود؟</span>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg='4'>
                                پیامک ثبت نام به ادمین
                            </Col>
                            <Col lg='8'>
                                <input type="checkbox" className='form-check-input ms-1'
                                    onChange={(e) => {
                                        handleChangeOfSelector(e.target.checked, 'ADMIN_REGISTER_SMS')
                                        setAdminRsms(e.target.checked)
                                    }}
                                    checked={adminRsms}
                                />
                                <span className='fs15 text-secondary'>فعال شود؟</span>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg='4'>
                                پیامک  تیکت به کاربر
                            </Col>
                            <Col lg='8'>
                                <input type="checkbox" className='form-check-input ms-1'
                                    onChange={(e) => {
                                        handleChangeOfSelector(e.target.checked, 'USER_TICKET_SMS')
                                        setUserTsms(e.target.checked)
                                    }}
                                    checked={userTsms}
                                />
                                <span className='fs15 text-secondary'>فعال شود؟</span>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg='4'>
                                پیامک خوش امد گویی به کاربر
                            </Col>
                            <Col lg='8'>
                                <input type="checkbox" className='form-check-input ms-1'
                                    onChange={(e) => {
                                        handleChangeOfSelector(e.target.checked, 'USER_WELCOME_SMS')
                                        setUserWsms(e.target.checked)
                                    }}
                                    checked={userWsms}
                                />
                                <span className='fs15 text-secondary'>فعال شود؟</span>
                            </Col>
                        </Row>
                    </div>
                }
                {
                    tab === 'phoneNumber' &&
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Row className='mt-4'>
                                <Col lg='4'>
                                    شماره موبایل برای دریافت پیامک تیکت
                                </Col>
                                <Col lg='3'>
                                    <input type="text" className='form-control ms-1'
                                        {...register('value1', formValidation('شماره موبایل'))}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col lg='4'>
                                    شماره موبایل برای دریافت پیامک ثبت نام
                                </Col>
                                <Col lg='3'>
                                    <input type="text" className='form-control ms-1'
                                        {...register('value2', formValidation('شماره موبایل'))}
                                    />
                                </Col>
                                <Col className=''>
                                    <button className='btn btn-primary' >ارسال</button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                }






            </div>
        </>
    )
}
