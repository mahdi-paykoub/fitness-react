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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


let nextId = 0;
export default function PanelUpdatePlan() {
    const [name, setName] = useState('');
    const [artists, setArtists] = useState([]);
    const [editorPlanBody, setEditorPlanBody] = useState('')

    const [visitPStatus, setVisitPStatus] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;


    const onSubmit = (data) => {

        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('slug', data.slug)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('off_price', data.off_price)
        formData.append('body', editorPlanBody)
        formData.append('visit', data.visit)
        formData.append('duration', data.duration)
        formData.append('visit_price', data.visit_price)
        formData.append('features', JSON.stringify(artists))
        formData.append('_method', 'PUT')


        fetch(`${baseUrl}admin/plan/${slug}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
              let ss=response.data.slug
                
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then(response => {
                        // navigate(`/admin-panel/update-plan/${response.data.slug}`)
                        navigate(`/admin-panel/update-plan/${ss}`)
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


    const handleDeleteItems = (id) => {
        let newItems = artists.filter((item) => item.id !== id)
        setArtists(newItems)
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
        fetch(`${baseUrl}admin/plan/${slug}`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            },
        })
            .then(res => res.json())
            .then(res => {

                setValue('title', res.data.title)
                setValue('slug', res.data.slug)
                setValue('description', res.data.description)
                setValue('price', res.data.price)
                setValue('off_price', res.data.off_price == null ? '' : res.data.off_price)
                setValue('duration', res.data.duration)
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
                    آپدیت <span className='text-primary'> برنامه </span>
                </h3>
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
                            <input type="text" className='form-control' placeholder='قیمت با تخفیف'
                                {...register('off_price', formValidation('قیمت با تخفیف', false))}
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

                        <Col lg={12} className='mt-3'>
                            <textarea name="" id="" cols="30" rows="3" className='form-control' placeholder='توضیحات برنامه'
                                {...register('description', formValidation('توضیحات برنامه'))}
                            ></textarea>
                            <p className='mt-3 text-danger px-2'>
                                {errors.description?.message}
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

                        <div className='mt-4'>
                            <button className='btn btn-primary'>
                                آپدیت 
                            </button>
                        </div>
                    </Row>
                </form>
            </div>

        </>
    )
}
