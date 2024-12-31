import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from "react-bootstrap";
import FormBox from "../../../components/AdminPanel/FormBox/FormBox";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ErrorBox from '../../../components/AdminPanel/ErrorBox/ErrorBox';
import DataBox from '../../../components/AdminPanel/DataBox/DataBox';
import SniperLoader from '../../../components/SniperLoader/SniperLoader';

function PanelFreePlans() {
    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(true)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('file', data.file[0])



        fetch(`${baseUrl}admin/freeplan`,
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
                    }).then(response => {
                        reset();
                        getCourses()
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



    const getCourses = () => {
        fetch(`${baseUrl}admin/freeplan`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setPlans(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])

    const handleDeletePlan = (id) => {

        swal({
            title: 'آیا از حذف اطمینان دارید؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                fetch(`${baseUrl}admin/freeplan/1`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userTokenLS.token}`
                    },
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

                                getCourses();
                            })
                        } else {
                            swal({
                                title: "مشکلی در حذف بوجود آمد!",
                                icon: "error",
                                buttons: 'باشه'
                            }).then(response => {
                                getCourses();
                            })
                        }

                    })

            }
        })
    }

    return (
        <>
            <FormBox title='برنامه رایگان' >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='mt-4'>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='عنوان'
                                {...register('title', formValidation('عنوان'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.title?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="file" className='form-control' placeholder='فایل برنامه'
                                {...register('file', formValidation('فایل برنامه'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.file?.message}
                            </p>
                        </Col>
                        <div className="text-start mt-2">
                            <button className="btn btn-primary">افزودن</button>
                        </div>
                    </Row>
                </form>
            </FormBox>
            {
                loader ?
                    <SniperLoader />
                    :
                    plans.length !== 0 ?
                        <DataBox title='برنامه های رایگان'>
                            <Table className='box-child-table mt-4' hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>عنوان برنامه</th>
                                        <th>فایل برنامه</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {plans.map((plan, index) =>
                                        <tr key={plan.id}>

                                            <td>{index + 1}</td>
                                            <td>{plan.title}</td>
                                            <td>
                                                <a className='btn btn-primary btn-sm' href={`${baseUrl}${plan.file}`}>
                                                    دانلود برنامه
                                                </a>
                                            </td>

                                            <td>

                                                <button className='btn btn-danger btn-sm me-2'
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
                        : <ErrorBox text='دوره ای یافت نشد' />
            }
        </>
    );
}

export default PanelFreePlans;