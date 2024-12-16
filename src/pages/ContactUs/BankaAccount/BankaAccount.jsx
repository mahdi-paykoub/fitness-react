import { React, useState, useEffect } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { TbCubeSend } from 'react-icons/tb';
function BankaAccount() {
    const [bankAc, setBankAc] = useState(null);
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('sheba', data.sheba)
        formData.append('cart_number', data.cart_number)


        fetch(`${baseUrl}add-bank-info`,
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
                        title: response.message[0],
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


    const getBankAccount = () => {
        fetch(`${baseUrl}get-user-bank-info`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                if (res.data != null) {
                    setValue('sheba', (res.data.sheba == 'undefined' || res.data.sheba == null) ? '' : res.data.sheba)
                    setValue('cart_number', (res.data.cart_number == 'undefined' || res.data.cart_number == null) ? '' : res.data.cart_number)
                    setValue('name', (res.data.name == 'undefined' || res.data.name == null) ? '' : res.data.name)
                }
            })
    }


    useEffect(() => {
        getBankAccount()
    }, [])
    return (
        <Row className="mt-3">
            <Col xs='12'>
                <div className="bg-white br-10 p-3 fs14 lh2">

                    <Row>
                        <Col xl='9'>
                            <Row className='justify-content-center'>
                                <Col xl='8' className='text-center'>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <div className='text-end fs14 mb-1 mt-3'>
                                             نام دارنده حساب
                                        </div>
                                        <div className=''>
                                            <input type="text" id='messsc_file' className='c-input ffir w-100 px-3'
                                                {...register('name', formValidation('نام'))} />

                                        </div>
                                        <div className='text-end fs14 mb-1 mt-3'>
                                            شماره شبا
                                        </div>
                                        <div className='position-relative'>

                                            <input type="text" id='mess_file' dir='ltr' className='c-input w-100 ps-5 ffir pe-3'
                                                {...register('sheba', formValidation('شبا'))} />
                                            <div className='position-absolute sheba-ir-text d-flex fs17 justify-content-center align-items-center'>
                                                IR
                                            </div>

                                        </div>
                                        <div className='text-end fs14 mb-1 mt-3'>
                                            شماره کارت
                                        </div>
                                        <div className=''>
                                            <input type="text" id='mess_file' dir='ltr' className='c-input ffir w-100 px-3'
                                                {...register('cart_number', formValidation('شماره کارت'))} />

                                        </div>
                                        <div className='text-end mt-4'>
                                            <button className="send-btn fflalezar px-3">ذخیره تنظیمات</button>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl='3'>
                            <div className="bg-secondary lh2 text-white br-10 p-4 mt-xl-0 mt-4">
                                لطفا تنها شماره حساب فردی را در این بخش وارد کنید
                                که کارت ملی ایشان با نام و نام خانوادگی ثبت نام شده در سایت برابر باشد.
                                عدم توجه به این نکته میتواند باعث عدم تایید شماره حساب شما شود.
                            </div>
                        </Col>
                    </Row>


                </div>

            </Col>
        </Row >
    );
}

export default BankaAccount;