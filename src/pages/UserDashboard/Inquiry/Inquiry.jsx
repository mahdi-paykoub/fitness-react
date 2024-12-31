import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { compareAsc, format, newDate } from "date-fns-jalali";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import PlanRequired from '../../../components/PlanRequired/PlanRequired';

export default function Inquiry() {
    const [inqureyCodes, setInqureyCodes] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;



    const getOrdersInquiry = () => {
        fetch(`${baseUrl}get-inquiry-codes`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setInqureyCodes(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getOrdersInquiry()
    }, [])


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('code', data.code)



        fetch(`${baseUrl}get-order-turn`,
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
                    if (response.data === 0) {
                        swal({
                            title: 'نوبت شما فرا رسیده است.',
                            icon: "success",
                            buttons: 'باشه'
                        }).then(response => {
                            reset();
                        })
                    } else {
                        swal({
                            title: response.data + ' نفر به نوبت این سفارش مانده است. ',
                            icon: "info",
                            buttons: 'باشه'
                        }).then(response => {
                            reset();
                        })
                    }

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
        <PlanRequired>
            <Row className='mt-3'>
                <Col>
                    <div className='inquiry-box p-3 d-flex br-10 d-flex justify-content-between px-lg-5 align-items-center'>
                        <div>
                            <div className='fs30 fflalezar text-white'>استعلام نوبت</div>
                            <div className='fflalezar text-white ps-5'>با ثبت نام در برنامه های تمرینی برای شما یک کد رهگیری صادر میشود. پس از دریافت آن میتوانید آنرا در فیلد زیر وارد نمایید تا تعداد افرادی که قبل از شما در نوبت دریافت برنامه قرار دارند مطلع شوید.</div>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <input type="text" className='c-input mt-4 inquiiry-inp px-2' placeholder='کد پیگیری سفارش'
                                        {...register('code', formValidation('کد پیگیری'))} />

                                    <button className='inq-btn bg-transparent fflalezar text-white fs14'>پیگیری سفارش</button>
                                </form>
                                <p className='mt-2 fflalezar text-white px-2'>
                                    {errors.code?.message}
                                </p>
                            </div>
                        </div>

                        <div className='d-none d-lg-block'><img src="/images/welcome-banner.png" width={200} alt="" /></div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='bg-white p-3 br-10 mt-3'>
                        <div className='fflalezar fs20 c-text-secondary'>
                            سفارشات در نوبت
                        </div>
                        {
                            loader ?
                                <SniperLoader newstyle='mt-5'/>
                                :
                                inqureyCodes.length !== 0 ?
                                    <table className="table fflalezar mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">نام برنامه </th>
                                                <th scope="col">تاریخ سفارش</th>
                                                <th scope="col">کد پیگیری سفارش</th>
                                            </tr>
                                        </thead>
                                        {

                                        }
                                        <tbody className='ticket-table'>
                                            {

                                                inqureyCodes.map((order, index) => {


                                                    return <tr key={order.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{order.orderable.title}</td>
                                                        <td className='c-text-secondary'>{format(new Date(order.created_at), "yyyy-MM-dd")} </td>

                                                        <td>{order.turn_code}</td>

                                                    </tr>
                                                }

                                                )


                                            }

                                        </tbody>
                                    </table>
                                    :
                                    <div className='p-3 mt-3 bg-danger fflalezar text-white br-10'>سفارشی وجود ندارد.</div>

                        }
                    </div>
                </Col>
            </Row>
        </PlanRequired>
    )
}
