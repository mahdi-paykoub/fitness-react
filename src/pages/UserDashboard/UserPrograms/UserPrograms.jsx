import { React, useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { compareAsc, format, newDate } from "date-fns-jalali";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import PlanRequired from '../../../components/PlanRequired/PlanRequired';
import { ShimmerTable } from 'shimmer-effects-react';


export default function UserPrograms() {
    const [orders, setOrders] = useState([])
    const [loder, setLoader] = useState(true)

    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const baseUrl = process.env.REACT_APP_BASE_URL

    let statusColor = ''
    let statusText = ''


    const getUserInfoStatus = () => {
        fetch(`${baseUrl}get-order-by-user`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setOrders(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getUserInfoStatus()
    }, [])

    return (
        <PlanRequired>
            <Row className='mt-3'>
                <Col>
                    <div className='bg-white p-4 br-10'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <div className='fflalezar fs20 c-text-secondary'>  سفارشات من</div>
                                <div className='fs13 mt-2'>برای مشاهده برنامه تمرینی هر سفارش، روی دکمه مشاهده کلیک نمایید.</div>
                            </div>
                            <div>
                                <Link to='/plans' className='send-btn fflalezar py-2 px-4'>تمدید برنامه</Link>
                            </div>
                        </div>


                        {
                            loder ?
                                <div className='mt-4'>
                                    <ShimmerTable className='mt-5' mode="light" row={3} col={4} border={1} borderColor={"#cbd5e1"} rounded={0.25} rowGap={16} colPadding={[10, 5, 10, 5]} />
                                </div>
                                :
                                orders.length !== 0 ?
                                    <table className="table box-child-table mt-5 fflalezar">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">نام برنامه </th>
                                                <th scope="col">تاریخ شفارش</th>
                                                <th scope="col">وضعیت</th>
                                                <th scope="col">عملیات</th>
                                            </tr>
                                        </thead>
                                        {

                                        }
                                        <tbody className='ticket-table'>
                                            {

                                                orders.reverse().map((order, index) => {
                                                    if (order.status === 'paid_uncomplete') {
                                                        statusColor = 'btn-danger';
                                                        statusText = 'تکمیل نشده'
                                                    }
                                                    if (order.status === 'complete') {
                                                        statusColor = 'btn-success';
                                                        statusText = 'تکمیل شده'

                                                    }
                                                    if (order.status === 'received_program') {
                                                        statusColor = 'btn-secondary';
                                                        statusText = 'برنامه دریافت کرده'

                                                    }

                                                    return <tr key={order.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td><Link to={`/dashboard/program-detail/${order.id}`} className='c-text-secondary'>{order.orderable.title} </Link></td>
                                                        <td className='c-text-secondary'>{format(new Date(order.created_at), "yyyy-MM-dd")} </td>

                                                        <td><span className={`btn btn-sm ffir fs12 ${statusColor}`}>{statusText}</span></td>
                                                        <td><Link to={`/dashboard/program-detail/${order.id}`} className='btn fs12 btn-primary ffir btn-sm'>مشاهده</Link></td>

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
