import React, { useEffect, useState } from 'react'
import DataBox from '../../../components/AdminPanel/DataBox/DataBox'
import Table from "react-bootstrap/Table";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import BtnSpiner from '../../../components/BtnSpiner/BtnSpiner';
import { Row, Col } from 'react-bootstrap';
import Pagination from '../../../components/Pagination/Pagination';

export default function PanelOrders() {
    const [planTypeFilter, setPlanTypeFilter] = useState(0)
    const [statusFilter, setStatusFilter] = useState('complete')

    const [orders, setOrders] = useState([])
    const [courses, setCourses] = useState([])
    const [searchBtnLoader, setSearchBtnLoader] = useState(false)
    const [shownOrders, setShownOrders] = useState([])
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))



    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        setLoader(true)
        setSearchBtnLoader(true)
        let formData = new FormData()
        formData.append('day1', data.day1)
        formData.append('month1', data.month1)
        formData.append('year1', data.year1)
        formData.append('day2', data.day2)
        formData.append('month2', data.month2)
        formData.append('year2', data.year2)


        fetch(`${baseUrl}admin/get-orders-by-date`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                setShownOrders(response.data.filter(order => (order.status === 'complete')))
                setOrders(response.data)
                setSearchBtnLoader(false)
                setLoader(false)
            })
    }

    let statusText = ''
    let statusClass = ''
    const getOrders = () => {
        fetch(`${baseUrl}admin/order`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setOrders(res.data)
                setShownOrders(res.data.filter(order => (order.status === 'complete')))
                setLoader(false)
            })
        fetch(`${baseUrl}admin/plan`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setCourses(res.data)
            })
    }

    useEffect(() => {
        getOrders()
    }, [])


    const handleStatusFilter = (value, type) => {
        switch (value) {
            case 'complete':
                {
                    if (type != 0) {
                        const orderedCourses = orders.filter(order => (order.status === 'complete' && order.orderable_id == type))
                        setShownOrders(orderedCourses)
                    } else {
                        const orderedCourses = orders.filter(order => (order.status === 'complete'))
                        setShownOrders(orderedCourses)
                    }

                    break;
                }
            case 'paid_uncomplete':
                {
                    if (type != 0) {
                        console.log(type);

                        const orderedCourses = orders.filter(order => (order.status === 'paid_uncomplete' && order.orderable_id == type))
                        setShownOrders(orderedCourses)
                    } else {
                        const orderedCourses = orders.filter(order => (order.status === 'paid_uncomplete'))
                        setShownOrders(orderedCourses)
                    }
                    break;
                }
            case 'received_program':
                {
                    if (type != 0) {
                        const orderedCourses = orders.filter(order => (order.status === 'received_program' && order.orderable_id == type))
                        setShownOrders(orderedCourses)
                    } else {
                        const orderedCourses = orders.filter(order => (order.status === 'received_program'))
                        setShownOrders(orderedCourses)
                    }
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
                <div className='fs20 text-primary mb-4 d-flex justify-content-between'>
                    <div>سفارشات</div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='d-flex align-items-center fs15'>
                            <div> از تاریخ</div>
                            <div className='d-flex'>
                                <input type="text" className='form-control ciw me-3' placeholder='روز'
                                    {...register('day1', formValidation('روز'))}
                                />
                                <input type="text" className='form-control ciw me-2' placeholder='ماه'
                                    {...register('month1', formValidation('ماه'))}
                                />
                                <input type="text" className='form-control ciw me-2' placeholder='سال'
                                    {...register('year1', formValidation('سال'))}
                                />
                            </div>
                            <div className='me-3'>
                                تا
                            </div>
                            <div className='d-flex'>
                                <input type="text" className='form-control ciw me-3' placeholder='روز'
                                    {...register('day2', formValidation('روز'))}
                                />
                                <input type="text" className='form-control ciw me-2' placeholder='ماه'
                                    {...register('month2', formValidation('ماه'))}
                                />
                                <input type="text" className='form-control ciw me-2' placeholder='سال'
                                    {...register('year2', formValidation('سال'))}
                                />
                            </div>
                            {
                                searchBtnLoader === false ?
                                    <button className='btn btn-primary btn-s me-3'>جستجو</button>
                                    :
                                    <button type='button' className='btn btn-primary  me-3'>
                                        <BtnSpiner wid='20px' he='20px' />
                                    </button>
                            }

                        </div>
                    </form>
                </div>

                <Row className='bg-body-secondary p-3'>
                    <Col lg='3'>
                        <div className=''>
                            <div className='fs15'>بر اساس تکمیل اطلاعات کاربر</div>
                            <Form.Select size="sm" className='mt-2'
                                onChange={(e) => {
                                    setStatusFilter(e.target.value)
                                    handleStatusFilter(e.target.value, planTypeFilter)

                                }}
                            >
                                <option value='complete'>سفارش تکمیل شده  </option>
                                <option value='paid_uncomplete'>سفارش تکمیل نشده  </option>
                                <option value='received_program'> برنامه دریافت کرده ها</option>
                            </Form.Select>
                        </div>
                    </Col>
                    <Col lg='3'>
                        <div className=''>
                            <div className='fs15'>بر اساس نوع برنامه سفارشی  </div>
                            <Form.Select size="sm" className='mt-2'
                                onChange={(e) => {
                                    setPlanTypeFilter(e.target.value)
                                    handleStatusFilter(statusFilter, e.target.value)
                                }}
                            >
                                <option value={0}>همه برنامه ها</option>
                                {
                                    courses.length != 0 &&
                                    courses.map(course =>
                                        <option value={course.id}>{course.title}</option>
                                    )
                                }

                            </Form.Select>
                        </div>
                    </Col>


                </Row>


                <div className='mt-5 mb-5 pb-5'>
                    {
                        loader ?
                            <SniperLoader />
                            :
                            shownOrders.length !== 0 ?

                                <>
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
                                                        <Link to={`/admin-panel/order-detail/${order.id}/${order.user.id}`} className='btn btn-primary btn-sm'>
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
                                    {/* {
                                        shownOrders.length != 0 &&
                                        <Pagination
                                            items={shownOrders}
                                            itemsCount={1}
                                            pathname={`/admin-panel/orders`}
                                            setShownCourses={setShownOrders}
                                        />
                                    } */}
                                </>



                                : <ErrorBox text='سفارشی یافت نشد' />
                    }

                </div>
            </div>
        </>
    )
}
