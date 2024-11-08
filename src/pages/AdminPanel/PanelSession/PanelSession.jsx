import React, { useEffect, useState } from 'react'
import DataBox from "../../../components/AdminPanel/DataBox/DataBox";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { formValidation } from "../../../utils/Validations";
import swal from "sweetalert";
import FormBox from "../../../components/AdminPanel/FormBox/FormBox";

export default function PanelSession() {
    const [courses, setCourses] = useState([])
    const [courseID, setCourseID] = useState(null)
    const [sessions, setSessions] = useState([])
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const baseUrl = process.env.REACT_APP_BASE_URL
    const form = useForm()
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState


    const getCourses = () => {
        fetch(`${baseUrl}admin/course`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setCourses(res.data)
                console.log(res.data);
            })
    }
    useEffect(() => {
        getCourses()
    }, [])

    const getSessions = () => {
        courseID !== null &&
            fetch(`${baseUrl}admin/session/${courseID}}`, {
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
            })
                .then(res => res.json())
                .then(res => {
                    setSessions(res.data)
                })
    }
    useEffect(() => {
        getSessions()
    }, [courseID])

    const onSubmit = (data) => {
        let formData = new FormData()
        console.log(data.free)
        formData.append('title', data.title)
        formData.append('time', data.time)
        formData.append('video', data.video[0])
        formData.append('is_free', data.is_free)
        formData.append('course_id', data.course_id)
        formData.append('description', data.description)

        fetch(`${baseUrl}admin/session`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                // setCourseID(response.data.course_id)
                if (response.status !== false) {
                    swal({
                        title: "جلسه با موفقیت افزوده شد",
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                    })
                } else {
                    swal({
                        title: "خطایی در ثبت جلسه بوجود آمد.",
                        icon: "error",
                        buttons: 'باشه'
                    }).then(response => {
                        reset();
                    })
                }
            })
    }

    return (
        <>
            <FormBox title='جلسه جدید'>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>

                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='عنوان جلسه'
                                {...register('title', formValidation('عنوان جلسه'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.title?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='زمان دوره'
                                {...register('time', formValidation('زمان دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.time?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <select className='form-control'
                                {...register('course_id', formValidation('دوره'))}
                            >
                                <option value="">
                                    دوره مورد نظر را انتخاب نمایید
                                </option>
                                {courses.length !== 0 && courses.map(course => <option key={course.id}
                                    value={course.id}>{course.title}</option>)}
                            </select>
                            <p className='mt-3 text-danger px-2'>
                                {errors.course_id?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <select className='form-control'
                                {...register('is_free', formValidation('فیلد'))}
                            >
                                <option value="">
                                    انتخاب نمایید
                                </option>
                                <option value={1}>رایگان</option>
                                <option value={0}>پولی</option>
                            </select>
                            <p className='mt-3 text-danger px-2'>
                                {errors.is_free?.message}
                            </p>
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <label htmlFor="" className='mb-2'>ویدیو جلسه</label>
                            <input type="file" className='form-control'
                                {...register('video', formValidation('ویدیو'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.video?.message}
                            </p>
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <label htmlFor="" className='mb-2'>ویدیو جلسه</label>
                            <textarea name="" id="" cols="30" rows="10" className='form-control' placeholder='توضیحات دوره'
                                {...register('description', formValidation('توضیحات جلسه'))}
                            ></textarea>
                            <p className='mt-3 text-danger px-2'>
                                {errors.description?.message}
                            </p>
                        </Col>
                        <div className='mt-3'>
                            <button className='btn btn-primary'>ثبت جلسه</button>
                        </div>
                    </Row>
                </form>
            </FormBox>



            <div className='mt-5 mb-5 pb-5'>
                <DataBox title='جلسات دوره'>
                    <div className="px-3">
                        <select className="form-control" name="" id=""
                            onChange={(event) => {
                                setCourseID(event.target.value)
                            }}
                        >
                            <option value="">دوره مورد نظر را انتخاب نمایید</option>
                            {courses.length !== 0 && courses.map(course =>
                                <option key={course.id}
                                    selected={course.id == courseID ? true : false}
                                    value={course.id}>{course.title}</option>)}
                        </select>
                    </div>
                    {

                        <div className='mt-4'>
                            {
                                sessions.length === 0 ?
                                    <ErrorBox text='جلسه ای یافت نشد' /> :
                                    <Table className='box-child-table' hover>
                                        <thead>
                                            <tr>
                                                <th>شناسه</th>
                                                <th>عنوان جلسه</th>
                                                <th>وضعیت</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {sessions.map((session, index) =>
                                                <tr key={session.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{session.title}</td>
                                                    <td>{
                                                        session.free === 'free' ? 'رایگان' : 'پولی'
                                                    }</td>
                                                    {/*<td>{session.course.name}</td>*/}
                                                    <td>
                                                        <button className='btn btn-danger'
                                                        // onClick={() => handleDeleteSession(session.id)}
                                                        >
                                                            حذف
                                                        </button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </Table>
                            }
                        </div>
                    }
                </DataBox>
            </div>

        </>
    )
}
