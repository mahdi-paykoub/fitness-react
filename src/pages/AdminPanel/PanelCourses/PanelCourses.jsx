import React, { useEffect, useState } from 'react'
import './style.css'
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default function PanelCourses() {
    const [courses, setCourses] = useState([])
    const [loader, setLoader] = useState(true)
    const [editorPlanBody, setEditorPlanBody] = useState('')
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
   
    const baseUrl = process.env.REACT_APP_BASE_URL


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;


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

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('slug', data.slug)
        formData.append('image', data.image[0])
        formData.append('price', data.price)
        formData.append('body', editorPlanBody)


        fetch(`${baseUrl}admin/course`,
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

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const file = await loader.file;
                        const response = await axios.request({
                            method: "POST",
                            url: `${baseUrl}admin/upload-ck-image`,
                            data: {
                                files: file
                            },
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });


                        resolve(
                            {
                                default: `${baseUrl}${response.data.url}`
                            }
                        );
                    } catch (error) {
                        reject("Hello");
                    }
                });
            },
            abort: () => { }
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    return (
        <>
            <FormBox title='دوره جدید' >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='mt-4'>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='نام دوره'
                                {...register('title', formValidation('نام دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.title?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='نامک'
                                {...register('slug', formValidation('نام دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.slug?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='قیمت دوره'
                                {...register('price', formValidation('نام دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.price?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="file" className='form-control' placeholder='تصویر'
                                {...register('image', formValidation('نام دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.image?.message}
                            </p>
                        </Col>
                        <Col lg={12} className='mt-3 ffir'>

                            <CKEditor
                                config={{
                                    // @ts-ignore
                                    extraPlugins: [uploadPlugin]
                                }}
                                editor={ClassicEditor}
                                data={editorPlanBody}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setEditorPlanBody(data)
                                }}
                            />

                        </Col>
                        <div className='mt-2'>
                            <button className='btn btn-primary mt-4'>
                                ثبت دوره
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
                        courses.length !== 0 ?
                            <DataBox title='دوره ها'>
                                <Table className='box-child-table' hover>
                                    <thead>
                                        <tr>
                                            <th>تصویر شاخص</th>
                                            <th>نام دوره</th>
                                            <th>قیمت</th>
                                            <th>حذف</th>
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
                                                <td>
                                                    <button className='btn btn-danger'
                                                        onClick={() => handleDeleteCourse(course.id)}
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
