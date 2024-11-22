import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import DataBox from "../../../components/AdminPanel/DataBox/DataBox";
import Table from "react-bootstrap/Table";
import ErrorBox from "../../../components/AdminPanel/ErrorBox/ErrorBox";
import SniperLoader from '../../../components/SniperLoader/SniperLoader';
import { Link } from 'react-router-dom';


export default function PanelCourses() {
    const [courses, setCourses] = useState([])
    const [loader, setLoader] = useState(true)
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL

    const getCourses = () => {
        fetch(`${baseUrl}admin/course`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setCourses(res.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])

    const handleDeleteCourse = (id) => {
        swal({
            title: 'آیا از حذف اطمینان دارید؟',
            icon: "error",
            buttons: ['خیر', 'بله']
        }).then(response => {
            if (response) {
                fetch(`${baseUrl}admin/course/${id}`, {
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
                                title: "دوره با موفقیت حذف شد",
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
            <div className='mt-5 mb-5 pb-5'>
                {
                    loader ?
                        <SniperLoader />
                        :
                        courses.length !== 0 ?
                            <DataBox title='دوره ها'>
                                <Table className='box-child-table mt-4' hover>
                                    <thead>
                                        <tr>
                                            <th>تصویر شاخص</th>
                                            <th>نام دوره</th>
                                            <th>قیمت  اصلی</th>
                                            <th>قیمت با تخفیف</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {courses.map((course, index) =>
                                            <tr key={course.id}>
                                                <td>
                                                    <img width={180} height={110} className="br10 object-cover br-10 object-fit-cover" src={baseUrl + course.image}
                                                        alt="" />
                                                </td>
                                                <td>{course.title}</td>
                                                <td>{course.price === 0 ? 'رایگان' : Number(course.price).toLocaleString()}</td>
                                                <td>{course.off_price === null ? 'ندار' : Number(course.off_price).toLocaleString()}</td>
                                                <td>
                                                    <Link className='btn btn-primary btn-sm'
                                                        to={`/admin-panel/update-course/${course.slug}`}
                                                    >
                                                        آپدیت
                                                    </Link>
                                                    <button className='btn btn-danger btn-sm me-2'
                                                        onClick={() => handleDeleteCourse(course.slug)}
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

            </div>
        </>
    )
}
