import React from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsTicket } from "react-icons/bs";
import { PiTicketBold } from "react-icons/pi";
import { BiCube } from "react-icons/bi";



export default function Tickets() {
    return (
        <>

            <Row className='mt-3'>
                <Col lg={9}>

                    <div className='ticket-box-status d-flex position-relative py-3'>
                        <img src="/images/1-C-Qe7Wvt.png" alt="" />
                        <div>
                            <div className='fs30 fflalezar text-white me-4 mt-4'>تیکت های پشتیبانی</div>
                            <div className='mt-3 text-white fs15 fflalezar pe-4 ps-5'>چنان چه در اجرا برنامه ها دچار مشکل شدید میتوانید با ارسال تیکت ما را مطلع نمایید تا در اسرع وقت به مشکل شما رسیدگی شود.</div>
                            <div className='me-4 mt-4 pt-3'>
                                <Link className='fflalezar fs15 text-white send-t-page-btn'>
                                    ارسال تیکت
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className='left-ticket-box p-3 h-100'>
                        <div className='d-flex justify-content-between'>
                            <div className=''>
                                <BiCube fontSize={20} />
                                <span className='fflalezar me-2 c-text-secondary'>مجموع تیکت ها</span>
                            </div>

                            <div>
                                <span className='fflalezar color-2'>20</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <div className=''>
                                <BsTicket fontSize={20} />
                                <span className='fflalezar me-2 c-text-secondary'>تیکت های باز</span>
                            </div>

                            <div>
                                <span className='fflalezar color-2'>8</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                            <div className=''>
                                <PiTicketBold fontSize={20} />
                                <span className='fflalezar me-2 c-text-secondary'>تیکت های بسته</span>
                            </div>

                            <div>
                                <span className='fflalezar color-2'>15</span>
                            </div>
                        </div>
                    </div>
                </Col>

            </Row>

            <Row className='mt-4'>
                <Col>
                    <div className='all-tickets-box bg-white p-4'>
                        <div className='fflalezar fs20 c-text-secondary'>تیکت ها</div>
                        <table class="table fflalezar mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">عنوان</th>
                                    <th scope="col">تاریخ</th>
                                    <th scope="col">وضعیت</th>
                                </tr>
                            </thead>
                            <tbody className='ticket-table'>
                                <tr>
                                    <th scope="row">1</th>
                                    <td><Link className='c-text-secondary'> مشکل در پرداخت های درون شبکه ایرون شبکه ای</Link></td>
                                    <td>1402/2/3</td>
                                    <td><span className='badge bg-success'>بسته شده</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td><Link className='c-text-secondary'> مشکل در پرداخت های درون شبکه ایرون شبکه ای</Link></td>
                                    <td>1402/2/3</td>
                                    <td><span className='badge bg-info'>منتظر پاسخ </span></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td><Link className='c-text-secondary'> مشکل در پرداخت های درون شبکه ایرون شبکه ای</Link></td>
                                    <td>1402/2/3</td>
                                    <td><span className='badge bg-danger'>باز</span></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </>
    )
}
