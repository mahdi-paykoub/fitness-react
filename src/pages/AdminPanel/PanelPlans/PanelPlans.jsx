import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import DataBox from "../../../components/AdminPanel/DataBox/DataBox";
import Table from "react-bootstrap/Table";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import FormBox from "../../../components/AdminPanel/FormBox/FormBox";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';

export default function PanelPlans() {
    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(true)
    const [visitPStatus, setVisitPStatus] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('slug', data.slug)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('body', data.body)
        formData.append('visit', data.visit)
        formData.append('duration', data.duration)
        formData.append('visit_price', data.visit_price)


        fetch(`${baseUrl}admin/plan`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                        getPlans()
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


    const getPlans = () => {
        fetch(`${baseUrl}admin/plan`)
            .then(res => res.json())
            .then(res => {
                setPlans(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getPlans()
    }, [])

    const showDescription = (description) => {
        swal({
            text: description,
            buttons: 'باشه'
        })
    }

    const handleDeletePlan = (id) => {
        swal({
            title: 'آیا از حذف اطمینان دارید؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                fetch(`${baseUrl}admin/plan/${id}`, {
                    method: 'DELETE',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'Authorization': `Bearer ${userTokenLS.token}`
                    // }
                })
                    .then(response =>
                        response.json()
                    )
                    .then(res => {

                        if (res.status !== false) {
                            swal({
                                title: "برنامه با موفقیت حذف شد",
                                icon: "success",
                                buttons: 'باشه'
                            }).then(response => {
                                getPlans();
                            })
                        } else {
                            swal({
                                title: "مشکلی در حذف بوجود آمد!",
                                icon: "error",
                                buttons: 'باشه'
                            }).then(response => {
                                getPlans();
                            })
                        }

                    })

            }
        })
    }

    return (
        <>
            <FormBox title='برنامه جدید' >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='mt-4'>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='عنوان برنامه'
                                {...register('title', formValidation('عنوان برنامه'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.title?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='نامک'
                                {...register('slug', formValidation('نامک'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.slug?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='قیمت برنامه'
                                {...register('price', formValidation('قیمت برنامه'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.price?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="number" className='form-control' placeholder='مدت برنامه (ماه)'
                                {...register('duration', formValidation('مدت برنامه'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.duration?.message}
                            </p>
                        </Col>

                        <Row>
                            <Col lg={6} className='mt-3'>
                                <span className='ms-3'>آیا این برنامه میتواند مراجعه حضوری دریافت کند؟</span>
                                <label htmlFor="yes_">بله</label>
                                <input type="radio" id='yes_' value={1}

                                    {...register('visit', formValidation('مراجعه حضوری'))}
                                    onChange={e => {
                                        setVisitPStatus(true)
                                    }}

                                />
                                <label htmlFor="no_" className='me-2'>خیر</label>

                                <input type="radio" id='no_' value={0}

                                    {...register('visit', formValidation('مراجعه حضوری'))}
                                    onChange={e => {
                                        setVisitPStatus(false)
                                    }}

                                />
                                <p className='mt-3 text-danger px-2'>
                                    {errors.visit?.message}
                                </p>
                            </Col>

                            {
                                visitPStatus ? <Col lg={6} className='mt-3'>
                                    <input type="text" className='form-control' placeholder='قیمت برنامه'
                                        {...register('visit_price', formValidation('قیمت مراجعه حضوری', false))}
                                    />
                                </Col> : ''
                            }

                        </Row>

                        <Col lg={12} className='mt-3'>
                            <textarea name="" id="" cols="30" rows="5" className='form-control' placeholder='توضیحات برنامه'
                                {...register('description', formValidation('توضیحات برنامه'))}
                            ></textarea>
                            <p className='mt-3 text-danger px-2'>
                                {errors.description?.message}
                            </p>
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <textarea name="" id="" cols="30" rows="10" className='form-control' placeholder='تکست ادیتور'
                                {...register('body', formValidation('تکست ادیتور'))}
                            ></textarea>
                            <p className='mt-3 text-danger px-2'>
                                {errors.body?.message}
                            </p>
                        </Col>

                        <div className='mt-2'>
                            <button className='btn btn-primary'>
                                ثبت برنامه
                            </button>
                        </div>
                    </Row>
                </form>
            </FormBox>
            <div className='mt-5 mb-5 pb-5'>
                {
                    loader ?
                        <SniperLoader />
                        :
                        plans.length !== 0 ?
                            <DataBox title='برنامه ها'>
                                <Table className='box-child-table' hover>
                                    <thead>
                                        <tr>
                                            <th>نام دوره</th>
                                            <th>نامک</th>
                                            <th>قیمت</th>
                                            <th>توضیحات</th>
                                            <th>حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {plans.map((plan, index) =>
                                            <tr key={plan.id}>

                                                <td>{plan.title}</td>
                                                <td>{plan.slug}</td>
                                                <td>{plan.price === 0 ? 'رایگان' : Number(plan.price).toLocaleString()}</td>
                                                <td>
                                                    <button className='btn btn-primary btn-sm'
                                                        onClick={() => showDescription(plan.description)}
                                                    >
                                                        نمایش
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger btn-sm'
                                                        onClick={() => handleDeletePlan(plan.id)}
                                                    >
                                                        حذف
                                                    </button>
                                                </td>
                                            </tr>)
                                        }


                                    </tbody>
                                </Table>

                            </DataBox>
                            : <ErrorBox text='برنامه ای یافت نشد' />
                }

            </div>
        </>
    )
}
