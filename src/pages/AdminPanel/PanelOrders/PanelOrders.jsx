import React, { useEffect, useState } from 'react'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import Table from "react-bootstrap/Table";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';

export default function PanelOrders() {
    const [orders, setOrders] = useState([])
    const [shownOrders, setShownOrders] = useState([])
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL



    let statusText = ''
    let statusClass = ''
    const getOrders = () => {
        fetch(`${baseUrl}admin/order`)
            .then(res => res.json())
            .then(res => {
                setOrders(res.data)
                setShownOrders(res.data.filter(order => (order.status === 'complete')))
                setLoader(false)
            })
    }


    useEffect(() => {
        getOrders()
    }, [])


    const handleStatusFilter = (value) => {
        switch (value) {
            case 'complete':
                {
                    const orderedCourses = orders.filter(order => (order.status === 'complete'))
                    setShownOrders(orderedCourses)
                    break;
                }
            case 'paid_uncomplete':
                {
                    const orderedCourses = orders.filter(order => (order.status === 'paid_uncomplete'))
                    setShownOrders(orderedCourses)
                    break;
                }
            case 'received_program':
                {
                    const orderedCourses = orders.filter(order => (order.status === 'received_program'))
                    setShownOrders(orderedCourses)
                    break;
                }

            default:
                {
                    setShownOrders([])
                    break;
                }

        }
    }

    return (
        <>
            <div className='admin-Data-box w-100 py-4 br-10 px-3'>
                <div className='d-flex justify-content-between'>
                    <div className='fs20 text-primary'>
                        سفارشات
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='fs15'>فیلتر</div>
                        <Form.Select size="sm" className='me-2'
                            onChange={(e) => {
                                handleStatusFilter(e.target.value)
                            }}
                        >
                            <option value='complete'>سفارش تکمیل شده  </option>
                            <option value='paid_uncomplete'>سفارش تکمیل نشده  </option>
                            <option value='received_program'> برنامه دریافت کرده ها</option>
                        </Form.Select>
                    </div>
                </div>


                <div className='mt-5 mb-5 pb-5'>
                    {
                        loader ?
                            <SniperLoader />
                            :
                            shownOrders.length !== 0 ?

                                <Table className='box-child-table' hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>نام کاربر</th>
                                            <th>شماره تلفن</th>
                                            <th>وضعیت سفارش </th>
                                            <th>مراجعه حضوری</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {shownOrders.map((order, index) => {
                                            // if (order.status === 'complete') {
                                            switch (order.status) {
                                                case 'complete':
                                                    statusText = 'تکمیل اطلاعات'
                                                    statusClass = 'btn-success'
                                                    break;
                                                case 'paid_uncomplete':
                                                    statusText = 'تکمیل نشده'
                                                    statusClass = 'btn-danger'
                                                    break;
                                                case 'received_program':
                                                    statusText = 'برنامه دریافت کرده'
                                                    statusClass = 'btn-secondary'
                                                    break;

                                                default:
                                                    break;
                                            }
                                            return <tr key={order.id}>
                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    {order.user.name}
                                                </td>

                                                <td>
                                                    {order.user.phone}
                                                </td>
                                                <td>
                                                    <button className={`btn btn-sm ${statusClass}`}>
                                                        {statusText}
                                                    </button>
                                                </td>
                                                <td>
                                                    {
                                                        order.visit ?
                                                            <button className='btn btn-info fflalezar btn-sm text-white'>دارد</button>
                                                            :
                                                            <button className='btn btn-danger fflalezar btn-sm '>ندارد</button>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/admin-panel/order-detail/${order.id}`} className='btn btn-primary btn-sm'>
                                                        مشاهده
                                                    </Link>
                                                </td>

                                            </tr>
                                            // }
                                        }

                                        )
                                        }


                                    </tbody>
                                </Table>


                                : <ErrorBox text='سفارشی یافت نشد' />
                    }

                </div>
            </div>
        </>
    )
}
