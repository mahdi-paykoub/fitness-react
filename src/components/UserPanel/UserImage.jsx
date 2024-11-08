import { React, useState, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { HiOutlineCamera } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";

export default function UserImage({ defaultUserImage }) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [selectedFile2, setSelectedFile2] = useState()
    const [preview2, setPreview2] = useState()

    const [selectedFile3, setSelectedFile3] = useState()
    const [preview3, setPreview3] = useState()


    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;



    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('front', data.front[0])
        formData.append('back', data.back[0])
        formData.append('side', data.side[0])



        fetch(`${baseUrl}uer-images`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userTokenLS.token}`
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
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





    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }





    useEffect(() => {
        if (!selectedFile) {
            setPreview2(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile2)
        setPreview2(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile2])

    const onSelectFile2 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile2(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile2(e.target.files[0])
    }




    useEffect(() => {
        if (!selectedFile3) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile3)
        setPreview3(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile3])

    const onSelectFile3 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile3(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile3(e.target.files[0])
    }

    return (
        <>

            <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>
                <div className='c-text-secondary d-flex align-items-center'>
                    <GoDotFill />
                    <div className='fflalezar fs20 me-1'>آپلود تصاویر</div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className='px-2'>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر جلوی بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage1'
                                {...register('front',
                                    formValidation('تصویر پهلو بدن'),
                                )}
                            // onChange={onSelectFile}
                            />
                            <label style={{ 'height': "150px" }} htmlFor="uploadImage1" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>
                                {
                                    defaultUserImage != null &&
                                    defaultUserImage.back != null &&
                                    <img src={`${baseUrl}${defaultUserImage.back}`} className='w-100 position-absolute object-fit-cover inn-im' alt="" />
                                }
                                {selectedFile && <img src={preview} className='w-100 position-absolute object-fit-cover inn-im' />}
                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.front?.message}
                            </p>
                        </Col>

                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر پشت بدن
                            </div>
                            <input type="file" className='d-none' id='uploadImage2'
                                {...register('back', formValidation('تصویر پشت بدن'))}
                            // onChange={onSelectFile2}
                            />
                            <label style={{ 'height': "150px" }} htmlFor="uploadImage2" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>
                                {
                                    defaultUserImage != null &&
                                    defaultUserImage.back != null &&
                                    <img src={`${baseUrl}${defaultUserImage.back}`} className='w-100 position-absolute object-fit-cover inn-im' alt="" />
                                }
                                {selectedFile2 && <img src={preview2} className='w-100 position-absolute object-fit-cover inn-im' />}

                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.back?.message}
                            </p>
                        </Col>
                        <Col lg={4} className='mt-4'>
                            <div className='fflalezar'>
                                تصویر از پهلو
                            </div>
                            <input type="file" className='d-none' id='uploadImage3'
                                {...register('side', formValidation('تصویر پهلو بدن'))}
                            // onChange={onSelectFile3}
                            />
                            <label style={{ 'height': "150px" }} htmlFor="uploadImage3" className='w-100 mt-2 cursor-pointer position-relative w-100 w-100 br-10 d-flex justify-content-center align-items-center'>
                                {
                                    defaultUserImage != null &&
                                    defaultUserImage.side != null &&
                                    <img src={`${baseUrl}${defaultUserImage.side}`} className='w-100 position-absolute object-fit-cover inn-im' alt="" />
                                }
                                {selectedFile3 && <img src={preview3} className='w-100 position-absolute object-fit-cover inn-im' />}
                                <div className='un-img position-absolute' >
                                    <HiOutlineCamera fontSize={40} color='#ecedee' />
                                </div>
                            </label>
                            <p className='mt-3 text-danger px-2'>
                                {errors.side?.message}
                            </p>
                        </Col>
                        {
                            defaultUserImage != null ?
                            defaultUserImage.length === 0 ?
                                    <div className='text-start'>
                                        <button className='send-btn fflalezar px-4 mt-4'>ارسال</button>
                                    </div> :

                                    <div className='text-start'>
                                        <button className='send-btn fflalezar px-4 mt-4'>آپدیت</button>
                                    </div>
                                :
                                <div className='text-start'>
                                    <button className='send-btn fflalezar px-4 mt-4'>ارسال</button>
                                </div>

                        }

                    </Row>
                </form>
            </div>

        </>
    )
}
