import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';



export default function Inquiry() {
    return (
        <>
            <Row className='mt-3'>
                <Col>
                    <div className='inquiry-box p-3 d-flex br-10 d-flex justify-content-between px-lg-5 align-items-center'>
                        <div>
                            <div className='fs30 fflalezar text-white'>استعلام نوبت</div>
                            <div className='fflalezar text-white ps-5'>با ثبت نام در برنامه های تمرینی برای شما یک کد رهگیری صادر میشود. پس از دریافت آن میتوانید آنرا در فیلد زیر وارد نمایید تا تعداد افرادی که قبل از شما در نوبت دریافت برنامه قرار دارند مطلع شوید.</div>
                            <div>
                                <input type="text" className='c-input mt-4 inquiiry-inp'/>
                                <button className='inq-btn bg-transparent fflalezar text-white fs14'>پیگیری سفارش</button>
                            </div>
                        </div>

                        <div><img src="/images/welcome-banner.png" width={200} alt="" /></div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
