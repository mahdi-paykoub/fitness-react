import { React, useState, useContext, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { HiOutlineCamera } from "react-icons/hi";
import { AuthContext } from "../../../Context/AuthContext";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import UserImage from '../../../components/UserPanel/UserImage';
import UserSize from '../../../components/UserPanel/UserSize';
import UserQuestion from '../../../components/UserPanel/UserQuestion';
import PlanRequired from '../../../components/PlanRequired/PlanRequired';
import { FaStar } from 'react-icons/fa';

export default function UserInfo() {
    const [tab, setTab] = useState('size')
    const [personalInfo, setPersonalInfo] = useState(null)
    const [defaultSize, setDefaulSize] = useState([])
    const [defaultQuestion, setDefaultQuestion] = useState([])
    const [defaultImage, setDefaultImage] = useState([])
    const [knowStatus, setKnowStatus] = useState('')
    const authContext = useContext(AuthContext)
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('state', data.state)
        formData.append('city', data.city)
        formData.append('year', data.year)
        formData.append('month', data.month)
        formData.append('day', data.day)
        formData.append('gender', data.gender)
        formData.append('how_know', data.how_know)
        formData.append('how_know_text', data.how_know_text)


        fetch(`${baseUrl}add-personal-info`,
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


    const getPersonalInfo = () => {
        fetch(`${baseUrl}get-personal-info`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setPersonalInfo(res.data)
            })
        fetch(`${baseUrl}get-default-infos`, {
            headers: {
                Authorization: `Bearer ${userTokenLS.token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setDefaulSize(res.size)
                setDefaultQuestion(res.question)
                setDefaultImage(res.image)
            })
    }


    useEffect(() => {
        getPersonalInfo()
    }, [])

    return (
        <PlanRequired>
            {authContext.isLoggedIn &&
                <Row className='mt-4 fflalezar'>
                    <div className='fflalezar fs30 c-text-secondary mb-4 d-flex align-items-center'>
                        <FaStar fontSize={25} />
                        <div className='me-1 mt-1'>تکمیل پروفایل</div>
                    </div>
                    <Col lg={4} className=''>
                        <div className='user-personal-info bg-white mb-4 br-10 top-5px sticky-lg-top'>
                            <div className='position-relative'>
                                <img src="/images/user-grid-bg1.png" className='w-100 backeimg' alt="" />
                                <img src="/images/avatar-1.jpg" width={100} height={100} className='rounded-circle position-absolute user-avatar-img' alt="" />
                            </div>
                            <div className='text-center fflalezar fs20 mt-5 pt-2 c-text-secondary'>
                                {authContext.userInfo.data.name}
                            </div>
                            <div className='mt-1 fflalezar text-center c-text-secondary border-bottom pb-3'>
                                example@gmail.com
                                {
                                    personalInfo == null &&
                                    <div className='color-2 mt-1 text-center'>
                                        این قسمت حتما تکمیل شود.
                                    </div>
                                }

                            </div>


                            <div className='px-3'>

                                {
                                    personalInfo == null ?
                                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                            <div className=' mt-4 fflalezar c-text-secondary'>نحوه آشنایی</div>
                                            <select className='c-input w-100 mt-1'
                                                {...register('how_know', formValidation('نحوه آشنایی'))}
                                                onChange={(e) => setKnowStatus(e.target.value)}>
                                                <option value="اینستاگرام">اینستاگرام</option>
                                                <option value="یوتیوب">یوتیوب</option>
                                                <option value="گوگل">گوگل</option>
                                                <option value="تبلیغات">تبلیغات</option>
                                                <option value="سایر">سایر</option>
                                                <option value="دوستان">دوستان</option>
                                            </select>
                                            <p className='text-danger px-2'>
                                                {errors.how_know?.message}
                                            </p>
                                            {
                                                knowStatus === 'دوستان' &&
                                                <>
                                                    <div className='mt-4 fflalezar c-text-secondary'>
                                                        نام دوست معرف
                                                    </div>
                                                    <input type="text" className='mt-1 c-input w-100 px-2'
                                                        {...register('how_know_text', formValidation('نام دوست معرف'))}
                                                    />
                                                    <p className='text-danger mt-2'>
                                                        {errors.how_know_text?.message}
                                                    </p>
                                                </>
                                            }



                                            <div className='mt-4 fflalezar c-text-secondary'>
                                                لطفا استان را انتخاب نمایید
                                            </div>
                                            <select className='c-input w-100 mt-1'
                                                {...register('state', formValidation('استان'))} >
                                                <option value="تهران">تهران</option>
                                                <option value="گیلان">گیلان</option>
                                                <option value="آذربایجان شرقی">آذربایجان شرقی</option>
                                                <option value="خوزستان">خوزستان</option>
                                                <option value="فارس">فارس</option>
                                                <option value="اصفهان">اصفهان</option>
                                                <option value="خراسان رضوی">خراسان رضوی</option>
                                                <option value="قزوین">قزوین</option>
                                                <option value="سمنان">سمنان</option>
                                                <option value="قم">قم</option>
                                                <option value="مرکزی">مرکزی</option>
                                                <option value="زنجان">زنجان</option>
                                                <option value="مازندران">مازندران</option>
                                                <option value="گلستان">گلستان</option>
                                                <option value="اردبیل">اردبیل</option>
                                                <option value="آذربایجان غربی">آذربایجان غربی</option>
                                                <option value="همدان">همدان</option>
                                                <option value="کردستان">کردستان</option>
                                                <option value="کرمانشاه">کرمانشاه</option>
                                                <option value="لرستان">لرستان</option>
                                                <option value="بوشهر">بوشهر</option>
                                                <option value="کرمان">کرمان</option>
                                                <option value="هرمزگان">هرمزگان</option>
                                                <option value="چهارمحال و بختیاری">چهارمحال و بختیاری</option>
                                                <option value="یزد">یزد</option>
                                                <option value="سیستان و بلوچستان">سیستان و بلوچستان</option>
                                                <option value="ایلام">ایلام</option>
                                                <option value="کهگلویه و بویراحمد">کهگلویه و بویراحمد</option>
                                                <option value="خراسان شمالی">خراسان شمالی</option>
                                                <option value="خراسان جنوبی">خراسان جنوبی</option>
                                                <option value="البرز">البرز</option>
                                            </select>
                                            <div className='mt-4 fflalezar c-text-secondary' >
                                                نام شهر
                                            </div>

                                            <input type="text" className='mt-1 c-input w-100 px-2'
                                                placeholder='نام شهر'
                                                {...register('city', formValidation('نام شهر'))}
                                            />
                                            <p className='mt-3 text-danger fs14'>
                                                {errors.city?.message}
                                            </p>

                                            <div className=' mt-4 fflalezar c-text-secondary'>تاریخ تولد</div>
                                            <div className='d-flex birth-inp-p justify-content-between mt-1'>

                                                <input type="number" className='c-input px-2' placeholder='روز'
                                                    {...register('day', {
                                                        required: {
                                                            value: true,
                                                            message: `روز تولد الزامی است `
                                                        },
                                                        valueAsNumber: {
                                                            value: true,
                                                            message: 'روز تولد باید عددی باشد'
                                                        },
                                                        max: {
                                                            value: 31,
                                                            message: 'روز تولد باید عددی بین 1 تا 31 باشد'
                                                        },
                                                        min: {
                                                            value: 1,
                                                            message: 'روز تولد باید عددی بین 1 تا 31 باشد'
                                                        },
                                                    })}

                                                />
                                                <input type="number" className='c-input px-2' placeholder='ماه'
                                                    {...register('month', {
                                                        required: {
                                                            value: true,
                                                            message: `ماه تولد الزامی است `
                                                        },
                                                        valueAsNumber: {
                                                            value: true,
                                                            message: 'ماه تولد باید عددی باشد'
                                                        },
                                                        max: {
                                                            value: 12,
                                                            message: 'ماه تولد باید عددی بین 1 تا 12 باشد'
                                                        },
                                                        min: {
                                                            value: 1,
                                                            message: 'ماه تولد باید عددی بین 1 تا 12 باشد'
                                                        },
                                                    })}

                                                />
                                                <input type="number" min={1330} max={1400} className='c-input px-2' placeholder='سال'
                                                    {...register('year', {
                                                        required: {
                                                            value: true,
                                                            message: `سال تولد الزامی است `
                                                        },
                                                        valueAsNumber: {
                                                            value: true,
                                                            message: 'سال تولد باید عددی باشد'
                                                        },
                                                        max: {
                                                            value: 1400,
                                                            message: 'سال تولد باید عددی بین 1330 تا 1400 باشد'
                                                        },
                                                        min: {
                                                            value: 1330,
                                                            message: 'سال تولد باید عددی بین 1330 تا 1400 باشد'
                                                        },
                                                    })}

                                                />
                                            </div>
                                            <p className='mt-3 fs14 text-danger'>
                                                {errors.day?.message}
                                            </p>
                                            <p className='mt-1 fs14 text-danger'>
                                                {errors.month?.message}
                                            </p>
                                            <p className='mt-1 fs14 text-danger'>
                                                {errors.year?.message}
                                            </p>
                                            <div className='mt-4 c-text-secondary'>
                                                <input type="radio" className='form-check-input ms-1' id='male_' value='male'
                                                    {...register('gender', formValidation('جنسیت'))}
                                                />
                                                <label htmlFor="male_">
                                                    آقا
                                                </label>


                                                <input type="radio" className='form-check-input me-3 ms-1' id='fmale_' value='female'
                                                    {...register('gender', formValidation('جنسیت'))}
                                                />
                                                <label htmlFor="fmale_">
                                                    خانوم
                                                </label>
                                            </div>
                                            <p className='mt-3 text-danger px-2 fs14'>
                                                {errors.gender?.message}
                                            </p>

                                            <div className='mt-4 pb-4'>
                                                <button className='send-btn w-100 fflalezar'>
                                                    ارسال
                                                </button>
                                            </div>
                                        </form>
                                        :

                                        <form>
                                            <div className=' mt-4 fflalezar c-text-secondary'>نحوه آشنایی</div>
                                            <select className='c-input w-100 mt-1' >
                                                <option>{personalInfo.how_know}</option>
                                            </select>

                                            {
                                                knowStatus === 'دوستان' &&
                                                <>
                                                    <div className='mt-4 fflalezar c-text-secondary'>
                                                        نام دوست معرف
                                                    </div>
                                                    <input type="text" className='mt-1 c-input w-100 px-2'
                                                        {...register('how_know_text', formValidation('نام دوست معرف'))}
                                                    />

                                                </>
                                            }



                                            <div className='mt-4 fflalezar c-text-secondary'>
                                                لطفا استان را انتخاب نمایید
                                            </div>
                                            <select className='c-input w-100 mt-1'>
                                                <option>{personalInfo.state}</option>
                                            </select>
                                            <div className='mt-4 fflalezar c-text-secondary' >
                                                نام شهر
                                            </div>

                                            <input type="text" className='mt-1 c-input w-100 px-2'
                                                placeholder='نام شهر' defaultValue={personalInfo.city}
                                                disabled={true}
                                            />


                                            <div className=' mt-4 fflalezar c-text-secondary'>تاریخ تولد</div>
                                            <div className='d-flex birth-inp-p justify-content-between mt-1'>

                                                <input type="text" className='c-input' placeholder='روز'
                                                    disabled={true}
                                                    defaultValue={personalInfo.day}
                                                />
                                                <input type="text" className='c-input' placeholder='ماه'
                                                    defaultValue={personalInfo.month}
                                                    disabled={true}
                                                />
                                                <input type="text" className='c-input' placeholder='سال'
                                                    defaultValue={personalInfo.year}
                                                    disabled={true}
                                                />
                                            </div>
                                            <p className='mt-3 text-danger'>
                                                {errors.day?.message}
                                            </p>
                                            <p className='mt-1 text-danger'>
                                                {errors.month?.message}
                                            </p>
                                            <p className='mt-1 text-danger'>
                                                {errors.year?.message}
                                            </p>
                                            <div className='pb-3 d-flex justify-content-between px-2 mt-4'>
                                                <div className='c-text-secondary'> جنسیت :
                                                </div>
                                                <div className='text-primary'>
                                                    {
                                                        personalInfo.gender === 'male' ? 'آقا' : 'خانم'
                                                    }
                                                </div>
                                            </div>


                                        </form>
                                }

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
                        {/* size */}
                        {
                            tab === 'size' &&
                            <UserSize defaultUserSize={defaultSize} />
                        }

                        {/* images */}
                        {
                            tab === 'image' &&
                            <UserImage defaultUserImage={defaultImage} />
                        }

                        {/* questions */}
                        {
                            tab === 'question' &&
                            <UserQuestion defaultUserQuestions={defaultQuestion} />
                        }
                    </Col>
                </Row>
            }

        </PlanRequired>
    )
}
