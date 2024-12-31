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

export default function UserQuestion({ defaultUserQuestions }) {
    const [physicalInjury, setPhysicalInjury] = useState(false)
    const [heartDisease, setHeartDisease] = useState(false)
    const [gastroSensitivity, setGastroSensitivity] = useState(false)
    const [medicine, setMedicine] = useState(false)
    const [smoking, setSmoking] = useState(false)
    const [liverEnzymes, setLiverEnzymes] = useState(false)
    const [historySteroid, setHistorySteroid] = useState(false)
    const [supplementUse, setSupplementUse] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, unregister, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('us_hsitory', data.us_hsitory)
        formData.append('ideal_body', data.ideal_body)
        formData.append('sport_history', data.sport_history)
        formData.append('training_place', data.training_place)
        formData.append('physical_injury', data.physical_injury)
        formData.append('physical_injury_text', data.physical_injury_text)
        formData.append('heart_disease', data.heart_disease)
        formData.append('heart_disease_text', data.heart_disease_text)
        formData.append('gastro_sensitivity', data.gastro_sensitivity)
        formData.append('gastro_sensitivity_text', data.gastro_sensitivity_text)
        formData.append('body_heat', data.body_heat)
        formData.append('medicine', data.medicine)
        formData.append('medicine_text', data.medicine_text)
        formData.append('smoking', data.smoking)
        formData.append('smoking_text', data.smoking_text)
        formData.append('appetite', data.appetite)
        formData.append('frequency_defecation', data.frequency_defecation)
        formData.append('liver_enzymes', data.liver_enzymes)
        formData.append('liver_enzymes_text', data.liver_enzymes_text)
        formData.append('history_steroid', data.history_steroid)
        formData.append('history_steroid_text', data.history_steroid_text)
        formData.append('supplement_use', data.supplement_use)
        formData.append('supplement_use_text', data.supplement_use_text)
        formData.append('final_question', data.final_question)




        fetch(`${baseUrl}user-question`,
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

            <div className='box-for-get-data bg-white mt-3 br-10 p-3 mb-4'>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>
                        <div className='color-2'>باید کامل آنالیز شوید پس لطفا پاسخ سوالات زیر را تایپ کنید  </div>


                        <Col xs='12' className='mt-5'>
                            <div className='c-text-secondary fs15'>
                                1-
                                آیا سابقه دریافت برنامه تمرینی از مربی همراه را دارید؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='us_h_yes'
                                            {...register('us_hsitory', formValidation('سابقه دریافت برنامه'))}
                                        />
                                        <label htmlFor="us_h_yes" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='us_h_no'
                                            {...register('us_hsitory', formValidation('سابقه دریافت برنامه'))}
                                        />
                                        <label htmlFor="us_h_no" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.us_hsitory?.message}
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs='12' className=''>
                            <div className='c-text-secondary fs15'>
                                2-
                                اندام ایده آل و هدفتون رو شرح بدید؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <textarea className='c-input w-100 c-textarea p-2'
                                        {...register('ideal_body', formValidation('اندام ایده آل'))}
                                    ></textarea>
                                    <p className=' text-danger px-2 fs14'>
                                        {errors.ideal_body?.message}
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs='12' className=''>
                            <div className='c-text-secondary fs15'>
                                3-
                                تمامی سوابق ورزشی خود را شرح دهید؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <textarea className='c-input w-100 c-textarea p-2'
                                        {...register('sport_history', formValidation('سوابق ورزشی'))}
                                    ></textarea>
                                    <p className=' text-danger px-2 fs14'>
                                        {errors.sport_history?.message}
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs='12' className=''>
                            <div className='c-text-secondary fs15'>
                                4-
                                محل تمرین شما؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div>
                                    <input type="radio" className="form-check-input" defaultValue='باشگاه' id='clob_ID'
                                        {...register('training_place', formValidation('محل تمرین'))}
                                    />
                                    <label htmlFor="clob_ID" className='me-2'>باشگاه</label>
                                </div>


                                <div className='mt-2'>
                                    <input type="radio" className="form-check-input" defaultValue='خانه' id='home_ID'
                                        {...register('training_place', formValidation('محل تمرین'))}
                                    />
                                    <label htmlFor="home_ID" className='me-2'>خانه</label>
                                </div>
                                <p className='mt-3 text-danger px-2 fs14'>
                                    {errors.training_place?.message}
                                </p>
                            </div>
                        </Col>

                        <Col xs='12' className='mt-2'>
                            <div className='c-text-secondary fs15'>
                                5-
                                آسیب دیدگی فیزیکی یا محدودیت در اجرای تمرین خاصی را دارید؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='physical_injury_yes_ID'
                                            {...register('physical_injury', formValidation('آسیب دیدگی فیزیکی'))}
                                            onClick={() => {
                                                setPhysicalInjury(true)
                                            }}
                                        />
                                        <label htmlFor="physical_injury_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='physical_injury_no_ID'
                                            {...register('physical_injury', formValidation('آسیب دیدگی فیزیکی'))}
                                            onClick={() => {
                                                setPhysicalInjury(false)
                                                unregister('physical_injury_text')
                                            }}
                                        />
                                        <label htmlFor="physical_injury_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.physical_injury?.message}
                                    </p>
                                </div>

                                {
                                    physicalInjury === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='مشکلات ژنتیکی، اسکلتی، عضلانی و... بطور کامل شررح دهید'
                                            {...register('physical_injury_text', formValidation('توضیحات سوابق ورزشی'))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.physical_injury_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>


                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                6-
                                آیا بیماری و یا ضعف قلبی عروقی و یا تنفسی دارید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='heart_disease_yes_ID'
                                            {...register('heart_disease', formValidation('آسیب دیدگی فیزیکی'))}
                                            onClick={() => {
                                                setHeartDisease(true)
                                            }}
                                        />
                                        <label htmlFor="heart_disease_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='heart_disease_no_ID'
                                            {...register('heart_disease', formValidation('آسیب دیدگی فیزیکی'))}
                                            onClick={() => {
                                                setHeartDisease(false)
                                                unregister('heart_disease_text')
                                            }}
                                        />
                                        <label htmlFor="heart_disease_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.heart_disease?.message}
                                    </p>
                                </div>

                                {
                                    heartDisease === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='هرنوع بیماری و یا احساس مشکل را شرح دهید'
                                            {...register('heart_disease_text', formValidation('توضیحات  مشکلات قلبی تنفسی'))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.heart_disease_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                7-
                                آیا حساسیت گوارشی دارید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='gastro_sensitivity_yes_ID'
                                            {...register('gastro_sensitivity', formValidation('حساسیت گوارشی'))}
                                            onClick={() => {
                                                setGastroSensitivity(true)
                                            }}
                                        />
                                        <label htmlFor="gastro_sensitivity_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='gastro_sensitivity_no_ID'
                                            {...register('gastro_sensitivity', formValidation('حساسیت گوارشی'))}
                                            onClick={() => {
                                                setGastroSensitivity(false)
                                                unregister('gastro_sensitivity_text')
                                            }}
                                        />
                                        <label htmlFor="gastro_sensitivity_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.gastro_sensitivity?.message}
                                    </p>
                                </div>

                                {
                                    gastroSensitivity === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='هرگونه حساسیت به مواد غذایی و یا مکمل را شرح دهید'
                                            {...register('gastro_sensitivity_text', formValidation('توضیحات حساسیت گوارشی  '))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.gastro_sensitivity_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                8-
                                حرارت بدن شما بطور معمول چگونه است؟                                                                                     </div>
                            <div className='mt-3'>
                                <div>
                                    <input type="radio" className="form-check-input" defaultValue='پایین' id='low_ID'
                                        {...register('body_heat', formValidation('حرارت بدن'))}
                                    />
                                    <label htmlFor="low_ID" className='me-2'>پایین</label>
                                </div>


                                <div className='mt-2'>
                                    <input type="radio" className="form-check-input" defaultValue='متوسط' id='middle_ID'
                                        {...register('body_heat', formValidation('حرارت بدن'))}
                                    />
                                    <label htmlFor="middle_ID" className='me-2'>متوسط</label>
                                </div>
                                <div className='mt-2'>
                                    <input type="radio" className="form-check-input" defaultValue='بالا' id='high_ID'
                                        {...register('body_heat', formValidation('حرارت بدن'))}
                                    />
                                    <label htmlFor="high_ID" className='me-2'>بالا</label>
                                </div>
                                <p className='mt-3 text-danger px-2 fs14'>
                                    {errors.body_heat?.message}
                                </p>
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                9-
                                آیا داروی خاصی مصرف میکنید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='medicine_yes_ID'
                                            {...register('medicine', formValidation('دارو'))}
                                            onClick={() => {
                                                setMedicine(true)
                                            }}
                                        />
                                        <label htmlFor="medicine_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='medicine_no_ID'
                                            {...register('medicine', formValidation('دارو'))}
                                            onClick={() => {
                                                setMedicine(false)
                                                unregister('medicine_text')
                                            }}
                                        />
                                        <label htmlFor="medicine_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.medicine?.message}
                                    </p>
                                </div>

                                {
                                    medicine === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='نام دارو، دوز مصرف بطور دقیق شرح دهید'
                                            {...register('medicine_text', formValidation('دارو'))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.medicine_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                10-
                                آیا سیگار یا الکل مصرف میکنید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='smoking_yes_ID'
                                            {...register('smoking', formValidation('سیگار یا الکل'))}
                                            onClick={() => {
                                                setSmoking(true)
                                            }}
                                        />
                                        <label htmlFor="smoking_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='smoking_no_ID'
                                            {...register('smoking', formValidation('سیگار یا الکل'))}
                                            onClick={() => {
                                                setSmoking(false)
                                                unregister('smoking_text')
                                            }}
                                        />
                                        <label htmlFor="smoking_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.smoking?.message}
                                    </p>
                                </div>

                                {
                                    smoking === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='میزان مصرف'
                                            {...register('smoking_text', formValidation(' سیگار یا الکل '))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.smoking_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                11-
                                اشتهای شما به غذا چگونه است؟
                            </div>
                            <div className='mt-3'>
                                <div>
                                    <input type="radio" className="form-check-input" defaultValue='کم' id='low_appetite_ID'
                                        {...register('appetite', formValidation('اشتها'))}
                                    />
                                    <label htmlFor="low_appetite_ID" className='me-2'>کم</label>
                                </div>


                                <div className='mt-2'>
                                    <input type="radio" className="form-check-input" defaultValue='متوسط' id='middle_appetite_ID'
                                        {...register('appetite', formValidation('اشتها'))}
                                    />
                                    <label htmlFor="middle_appetite_ID" className='me-2'>متوسط</label>
                                </div>
                                <div className='mt-2'>
                                    <input type="radio" className="form-check-input" defaultValue='بالا' id='high_appetite_ID'
                                        {...register('appetite', formValidation('اشتها'))}
                                    />
                                    <label htmlFor="high_appetite_ID" className='me-2'>بالا</label>
                                </div>
                                <p className='mt-3 text-danger px-2 fs14'>
                                    {errors.appetite?.message}
                                </p>
                            </div>
                        </Col>

                        <Col xs='12' className=''>
                            <div className='c-text-secondary fs15'>
                                12-
                                دفعات حدودی دفع مدفوع طی روز یا هفته را شرح دهید؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <textarea className='c-input w-100 c-textarea p-2'
                                        {...register('frequency_defecation', formValidation('دفعات دفع'))}
                                    ></textarea>
                                    <p className=' text-danger px-2 fs14'>
                                        {errors.frequency_defecation?.message}
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                13-
                                آیا آزمایش آنزیم های کبدی داده اید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='liver_enzymes_yes_ID'
                                            {...register('liver_enzymes', formValidation('سیگار یا الکل'))}
                                            onClick={() => {
                                                setLiverEnzymes(true)
                                            }}
                                        />
                                        <label htmlFor="liver_enzymes_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='liver_enzymes_no_ID'
                                            {...register('liver_enzymes', formValidation('سیگار یا الکل'))}
                                            onClick={() => {
                                                setLiverEnzymes(false)
                                                unregister('liver_enzymes_text')
                                            }}
                                        />
                                        <label htmlFor="liver_enzymes_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.liver_enzymes?.message}
                                    </p>
                                </div>

                                {
                                    liverEnzymes === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='وضعیت و نتیجه آزمایش'
                                            {...register('liver_enzymes_text', formValidation(' سیگار یا الکل '))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.liver_enzymes_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                14-
                                سابقه مصرف مکمل یا دارو های استروئیدی دارید؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='history_steroid_yes_ID'
                                            {...register('history_steroid', formValidation('سابقه مصرف'))}
                                            onClick={() => {
                                                setHistorySteroid(true)
                                            }}
                                        />
                                        <label htmlFor="history_steroid_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='history_steroid_no_ID'
                                            {...register('history_steroid', formValidation('سابقه مصرف'))}
                                            onClick={() => {
                                                setHistorySteroid(false)
                                                unregister('history_steroid_text')
                                            }}
                                        />
                                        <label htmlFor="history_steroid_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.history_steroid?.message}
                                    </p>
                                </div>

                                {
                                    historySteroid === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='نام، زمان و مقدار هر کدام را کامل شرح دهید'
                                            {...register('history_steroid_text', formValidation('سابقه مصرف '))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.history_steroid_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className='mt-4'>
                            <div className='c-text-secondary fs15'>
                                15-
                                آیا در این دوره تمایل به مصرف مکمل دارید(جهت طراحی زمان و مقدار مصرف)؟
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <div>
                                        <input type="radio" className="form-check-input" defaultValue={1} id='supplement_use_yes_ID'
                                            {...register('supplement_use', formValidation('سابقه مصرف'))}
                                            onClick={() => {
                                                setSupplementUse(true)
                                            }}
                                        />
                                        <label htmlFor="supplement_use_yes_ID" className='me-2'>بله</label>
                                    </div>


                                    <div className='mt-2'>
                                        <input type="radio" className="form-check-input" defaultValue={0} id='supplement_use_no_ID'
                                            {...register('supplement_use', formValidation('سابقه مصرف'))}
                                            onClick={() => {
                                                setSupplementUse(false)
                                                unregister('supplement_use_text')
                                            }}
                                        />
                                        <label htmlFor="supplement_use_no_ID" className='me-2'>خیر</label>
                                    </div>
                                    <p className='mt-3 text-danger px-2 fs14'>
                                        {errors.supplement_use?.message}
                                    </p>
                                </div>

                                {
                                    supplementUse === true &&
                                    <>
                                        <textarea className='c-input w-100 c-textarea p-2' placeholder='سقف بودجه مدنظر را بنویسید'
                                            {...register('supplement_use_text', formValidation('سابقه مصرف '))}
                                        ></textarea>
                                        <p className='text-danger px-2 fs14'>
                                            {errors.supplement_use_text?.message}
                                        </p>
                                    </>
                                }
                            </div>
                        </Col>

                        <Col xs='12' className=''>
                            <div className='c-text-secondary fs15'>
                                16-
                                هر موردی که داخل سوالات ما نبود ولی احساس میکنی باید بدونیم را کامل بنویس؟
                                <span className='text-danger'>*</span>
                            </div>
                            <div className='mt-3'>
                                <div className="mb-3">
                                    <textarea className='c-input w-100 c-textarea p-2'
                                        {...register('final_question', formValidation('توضیحات', false))}
                                    ></textarea>
                                    <p className=' text-danger px-2 fs14'>
                                        {errors.final_question?.message}
                                    </p>
                                </div>
                            </div>
                        </Col>


                    </Row>
                    {
                        defaultUserQuestions != null ?
                            defaultUserQuestions.length === 0 ?
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
                </form>
            </div>
        </>
    )
}
