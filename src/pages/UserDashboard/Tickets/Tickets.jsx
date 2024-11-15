import { React, useState, useEffect } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsTicket } from "react-icons/bs";
import { PiTicketBold } from "react-icons/pi";
import { BiCube } from "react-icons/bi";
import { compareAsc, format, newDate } from "date-fns-jalali";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';



export default function Tickets() {
    const [tickets, setTickets] = useState([])
    const [loader, setLoader] = useState(true)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
  


    let statusColor = '';
    let statusText = '';

    const getTickets = () => {
        fetch(`${baseUrl}get-user-tickets`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setTickets(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getTickets()
    }, [])

    return (
        <>

            <Row className='mt-3'>
                <Col xl={9}>

                    <div className='ticket-box-status d-flex position-relative py-3'>
                        <img src="/images/1-C-Qe7Wvt.png" alt="" />
                        <div>
                            <div className='fs30 fflalezar text-white me-4 mt-4'>تیکت های پشتیبانی</div>
                            <div className='mt-3 text-white fs15 fflalezar pe-4 ps-5'>چنان چه در اجرا برنامه ها دچار مشکل شدید میتوانید با ارسال تیکت ما را مطلع نمایید تا در اسرع وقت به مشکل شما رسیدگی شود.</div>
                            <div className='me-4 mt-4 pt-3'>
                                <Link to='/dashboard/send-ticket' className='fflalezar fs15 text-white send-t-page-btn'>
                                    ارسال تیکت
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={3} className='mt-xl-0 mt-3'>
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

            <Row className='mt-4 mb-5'>
                <Col>
                    <div className='all-tickets-box bg-white p-4'>
                        <div className='fflalezar fs20 c-text-secondary'>تیکت ها</div>
                        {
                            loader ?
                                <SniperLoader />
                                :
                                tickets.length !== 0 ?
                                    <table class="table box-child-table fflalezar mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">عنوان</th>
                                                <th scope="col">تاریخ</th>
                                                <th scope="col">از طرف</th>
                                                <th scope="col">وضعیت</th>
                                                <th scope="col">عملیات</th>
                                            </tr>
                                        </thead>
                                        {

                                        }
                                        <tbody className='ticket-table'>
                                            {

                                                tickets.reverse().map((ticket, index) => {
                                                    if (ticket.status === 'open') {
                                                        statusColor = 'bg-danger';
                                                        statusText = 'باز'
                                                    }
                                                    if (ticket.status === 'close') {
                                                        statusColor = 'bg-secondary';
                                                        statusText = 'بسته'

                                                    }
                                                    if (ticket.status === 'review') {
                                                        statusColor = 'bg-primary';
                                                        statusText = 'در حال بررسی'

                                                    }
                                                    if (ticket.status === 'answered') {
                                                        statusColor = 'bg-success'
                                                        statusText = 'پاسخ داده شده'

                                                    }
                                                    return <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td><Link to={`/dashboard/ticket-detail/${ticket.id}`} className='c-text-secondary'>{ticket.title} </Link></td>
                                                        <td>{format(new Date(ticket.created_at), "yyyy-MM-dd")}</td>
                                                        <td>{ticket.admin ? 'ادمین' : 'شما'}</td>
                                                        <td><span className={`badge ${statusColor}`}>{statusText}</span></td>
                                                        <td><Link to={`/dashboard/ticket-detail/${ticket.id}`} className='btn  btn-primary btn-sm'>مشاهده </Link></td>
                                                    </tr>
                                                }

                                                )


                                            }

                                        </tbody>
                                    </table>
                                    :
                                    <div className='p-3 mt-3 bg-danger fflalezar text-white br-10'>تیکتی وجود ندارد.</div>

                        }
                    </div>
                </Col>
            </Row>
        </>
    )
}
