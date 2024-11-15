import React, { useEffect, useState } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import FormBox from "../../../components/AdminPanel/FormBox/FormBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PanelUpdateCourse() {
    const [editorPlanBody, setEditorPlanBody] = useState('')
    const [image, setImage] = useState('')
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    const { slug } = useParams();
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_BASE_URL


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('slug', data.slug)
        formData.append('image', data.image[0])
        formData.append('price', data.price)
        formData.append('off_price', data.off_price)
        formData.append('body', editorPlanBody)
        formData.append('_method', 'PUT')

        fetch(`${baseUrl}admin/course/${slug}`,
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
                    }).then(() => {
                        navigate(`/admin-panel/update-course/${response.data.slug}`)
                        setImage(response.data.image)
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



    const getCourses = () => {
        fetch(`${baseUrl}admin/course/${slug}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                setImage(res.data.image)
                setValue('title', res.data.title)
                setValue('slug', res.data.slug)
                setValue('image', res.data.image)
                setValue('price', res.data.price)
                setValue('off_price', res.data.off_price == null ? '' : res.data.off_price)
                setEditorPlanBody(res.data.body)
            })
    }


    useEffect(() => {
        getCourses()
    }, [])

    return (
        <>
            <div className='admin-form py-5 px-4 br5 bg-white br-10 mb-5'>
                <h3>
                    آپدیت <span className='text-primary'> دوره  </span>
                </h3>
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
                                {...register('slug', formValidation('نامک دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.slug?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='قیمت دوره'
                                {...register('price', formValidation('قیمت دوره'))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.price?.message}
                            </p>
                        </Col>
                        <Col lg={6} className='mt-3'>
                            <input type="text" className='form-control' placeholder='قیمت با تخفیف'
                                {...register('off_price', formValidation('قیمت با تخفیف', false))}
                            />
                            <p className='mt-3 text-danger px-2'>
                                {errors.price?.message}
                            </p>
                        </Col>
                        <Col lg={12} className='mt-3'>
                            {
                                image != '' &&
                                <img src={baseUrl + image} className='w-100 object-fit-cover br-10' height={200} alt="" />
                            }
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <input type="file" className='form-control' placeholder='تصویر'
                                {...register('image', formValidation('تصویر شاخص'))}
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
                                آپدیت 
                            </button>
                        </div>
                    </Row>
                </form>
            </div>


        </>
    )
}
