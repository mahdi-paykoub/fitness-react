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

export default function PanelAddCourses() {
    const [editorPlanBody, setEditorPlanBody] = useState('')
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const baseUrl = process.env.REACT_APP_BASE_URL


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('slug', data.slug)
        formData.append('image', data.image[0])
        formData.append('price', data.price)
        formData.append('off_price', data.off_price)
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
                        setEditorPlanBody('');
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
                        <Col lg={6} className='mt-3'>
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
                                ثبت دوره
                            </button>
                        </div>
                    </Row>
                </form>
            </FormBox>

        </>
    )
}
