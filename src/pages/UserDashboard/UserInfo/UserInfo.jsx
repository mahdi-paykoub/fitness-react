import { React, useState, useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { HiOutlineCamera } from "react-icons/hi";
import { AuthContext } from "../../../Context/AuthContext";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";

export default function UserInfo() {
    const [tab, setTab] = useState('size')
    const authContext = useContext(AuthContext)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;



    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('height', data.height)
        formData.append('weight', data.weight)
        formData.append('neck', data.neck)
        formData.append('shoulder', data.shoulder)
        formData.append('arm', data.arm)
        formData.append('contracted_arm', data.contracted_arm)
        formData.append('forearm', data.forearm)
        formData.append('wrist', data.wrist)
        formData.append('chest', data.chest)
        formData.append('belly', data.belly)
        formData.append('waist', data.waist)
        formData.append('hips', data.hips)
        formData.append('thigh', data.thigh)
        formData.append('leg', data.leg)
        formData.append('ankle', data.ankle)


        fetch(`${baseUrl}user-size`,
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

    return (
        <>
            {authContext.isLoggedIn &&
                <Row className='mt-4 fflalezar'>
                    <div className='fflalezar fs30 c-text-secondary mb-4'>تکمیل پروفایل</div>
                    <Col lg={4}>
                        <div className='user-personal-info bg-white mb-4 br-10'>
                            <div className='position-relative'>
                                <img src="/images/user-grid-bg1.png" className='w-100 backeimg' alt="" />
                                <img src="/images/avatar-1.jpg" width={100} height={100} className='rounded-circle position-absolute user-avatar-img' alt="" />
                            </div>
                            <div className='text-center fflalezar fs20 mt-5 pt-2 c-text-secondary'>
                                {authContext.userInfo.data.name}
                            </div>
                            <div className='mt-1 fflalezar text-center c-text-secondary border-bottom pb-3'>
                                example@gmail.com
                            </div>
                            <div className='mt-3 px-3'>
                                <div className='fflalezar c-text-secondary'>
                                    نام
                                </div>
                                <div>
                                    <input type="text" className='px-1 mt-1 c-input w-100' value={authContext.userInfo.data.name} />
                                </div>
                            </div>

                            <div className='mt-3 px-3'>
                                <div className='fflalezar c-text-secondary'>
                                    شماره تلفن
                                </div>
                                <div>
                                    <input type="text" className='px-1 mt-1 c-input w-100 disabled' defaultValue='09309519365' disabled={true} />
                                </div>
                            </div>
                            <div className='mt-4 px-3 pb-4'>
                                <button className='send-btn w-100 fflalezar' disabled={true} style={{ 'cursor': 'no-drop' }}>
                                    ارسال
                                </button>
                            </div>
                        </div>

                    </Col>
                    <Col lg={8}>
                        {/* tabs */}
                        <div className='left-user-info-box bg-white br-10'>
                            <div className='d-flex align-items-center'>
                                <div className={`py-3 me-3 ${tab === 'size' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('size')}>
                                    <BiBaguette fontSize={20} />
                                    <span className='fflalezar me-1'>دریافت سایز</span>
                                </div>
                                <div className={`py-3 me-4 ${tab === 'image' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('image')}>
                                    <IoMdImages fontSize={20} />
                                    <span className='fflalezar me-1 c-text-secondary'>آپلود تصاویر</span>
                                </div>
                                <div className={`py-3 me-4 ${tab === 'question' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('question')}>
                                    <LuClipboardCheck fontSize={19} />
                                    <span className='fflalezar me-1 c-text-secondary'>سوالات</span>
                                </div>
                            </div>
                        </div>
                        {/* first */}
                        {
                            tab === 'size' &&
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>
                                    <div className='c-text-secondary d-flex align-items-center'>
                                        <GoDotFill />
                                        <div className='fflalezar fs20 me-1'>دریافت سایز</div>
                                    </div>
                                    <Row>

                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    قد
                                                    <span className='text-danger'>*</span>
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('height', formValidation('قد'))}
                                                    />
                                                    <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                                        {errors.height?.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    وزن
                                                    <span className='text-danger'>*</span>
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('weight', formValidation('وزن'))}
                                                    />
                                                    <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                                        {errors.weight?.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور گردن
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('neck', formValidation('دور گردن', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور شانه
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('shoulder', formValidation('دور شانه', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور بازو در حالت عادی
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('arm', formValidation('دور بازو در حالت عادی', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور بازو در حالت منقبض
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('contracted_arm', formValidation(' دور بازو در حالت منقبض', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور ساعد
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('forearm', formValidation('دور ساعد', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور مچ دست
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('wrist', formValidation(' دور مچ دست', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور سینه
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('chest', formValidation('دور سینه', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور شکم
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('belly', formValidation('دور شکم', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور کمر
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('waist', formValidation('دور کمر', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور باسن
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('hips', formValidation('دور باسن', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور ران
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('thigh', formValidation('دور ران', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور ساق
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('leg', formValidation('دور ساق', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='mt-3 px-3'>
                                                <div className='fflalezar c-text-secondary'>
                                                    دور مچ پا
                                                </div>
                                                <div>
                                                    <input type="text" className='px-1 mt-1 c-input w-100'
                                                        {...register('ankle', formValidation('دور مچ پا', false))}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className='text-start'>
                                                <button className='send-btn fflalezar px-4 mt-4'>ثبت</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </form>
                        }

                        {/* second */}
                        {
                            tab === 'image' &&
                            <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>
                                <div className='c-text-secondary d-flex align-items-center'>
                                    <GoDotFill />
                                    <div className='fflalezar fs20 me-1'>آپلود تصاویر</div>
                                </div>

                                <Row className='px-2'>
                                    <Col lg={4} className='mt-4'>
                                        <div className='fflalezar'>
                                            تصویر جلوی بدن
                                        </div>
                                        <input type="file" className='d-none' id='uploadImage1' />
                                        <label htmlFor="uploadImage1" className='w-100 mt-2 cursor-pointer'>
                                            <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                                <HiOutlineCamera fontSize={40} color='#ecedee' />
                                            </div>
                                        </label>
                                    </Col>

                                    <Col lg={4} className='mt-4'>
                                        <div className='fflalezar'>
                                            تصویر پشت بدن
                                        </div>
                                        <input type="file" className='d-none' id='uploadImage2' />
                                        <label htmlFor="uploadImage2" className='w-100 mt-2 cursor-pointer'>
                                            <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                                <HiOutlineCamera fontSize={40} color='#ecedee' />
                                            </div>
                                        </label>
                                    </Col>
                                    <Col lg={4} className='mt-4'>
                                        <div className='fflalezar'>
                                            تصویر از پهلو
                                        </div>
                                        <input type="file" className='d-none' id='uploadImage3' />
                                        <label htmlFor="uploadImage3" className='w-100 mt-2 cursor-pointer'>
                                            <div className='un-img w-100 br-10 d-flex justify-content-center align-items-center' >
                                                <HiOutlineCamera fontSize={40} color='#ecedee' />
                                            </div>
                                        </label>
                                    </Col>
                                    <Col xs={12}>
                                        <div className='text-start'>
                                            <button className='send-btn fflalezar px-4 mt-4'>ثبت</button>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        }


                    </Col>
                </Row>
            }

        </>
    )
}
