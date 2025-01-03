import { React, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { GoDotFill } from "react-icons/go";
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";

export default function UserSize({ defaultUserSize }) {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))


    const form = useForm();
    const { register, control, handleSubmit, formState, reset, setValue } = form
    const { errors } = formState;
    useEffect(() => {
        if (defaultUserSize != null) {
            setValue('height', (defaultUserSize.height == 'undefined' || defaultUserSize.height == null) ? '' : defaultUserSize.height)
            setValue('weight', (defaultUserSize.weight == 'undefined' || defaultUserSize.weight == null) ? '' : defaultUserSize.weight)
            setValue('neck', (defaultUserSize.neck == 'undefined' || defaultUserSize.neck == null) ? '' : defaultUserSize.neck)
            setValue('shoulder', (defaultUserSize.shoulder == 'undefined' || defaultUserSize.shoulder == null) ? '' : defaultUserSize.shoulder)
            setValue('arm', (defaultUserSize.arm == 'undefined' || defaultUserSize.arm == null) ? '' : defaultUserSize.arm)
            setValue('contracted_arm', (defaultUserSize.contracted_arm == 'undefined' || defaultUserSize.contracted_arm == null) ? '' : defaultUserSize.contracted_arm)
            setValue('forearm', (defaultUserSize.forearm == 'undefined' || defaultUserSize.forearm == null) ? '' : defaultUserSize.forearm)
            setValue('wrist', (defaultUserSize.wrist == 'undefined' || defaultUserSize.wrist == null) ? '' : defaultUserSize.wrist)
            setValue('chest', (defaultUserSize.chest == 'undefined' || defaultUserSize.chest == null) ? '' : defaultUserSize.chest)
            setValue('belly', (defaultUserSize.belly == 'undefined' || defaultUserSize.belly == null) ? '' : defaultUserSize.belly)
            setValue('waist', (defaultUserSize.waist == 'undefined' || defaultUserSize.waist == null) ? '' : defaultUserSize.waist)
            setValue('hips', (defaultUserSize.hips == 'undefined' || defaultUserSize.hips == null) ? '' : defaultUserSize.hips)
            setValue('thigh', (defaultUserSize.thigh == 'undefined' || defaultUserSize.thigh == null) ? '' : defaultUserSize.thigh)
            setValue('leg', (defaultUserSize.leg == 'undefined' || defaultUserSize.leg == null) ? '' : defaultUserSize.leg)
            setValue('ankle', (defaultUserSize.ankle == 'undefined' || defaultUserSize.ankle == null) ? '' : defaultUserSize.ankle)
        }
    }, [defaultUserSize]);


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
            {
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
                                            {...register('height', formValidation('قد', true, null, null, /^\d+$/))}
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
                                            {...register('weight', formValidation('وزن', true, null, null, /^\d+$/))}
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

                                            {...register('neck', formValidation('دور گردن', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.neck?.message}
                                        </p>
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

                                            {...register('shoulder', formValidation('دور شانه', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.shoulder?.message}
                                        </p>
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

                                            {...register('arm', formValidation('دور بازو در حالت عادی', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.arm?.message}
                                        </p>
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

                                            {...register('contracted_arm', formValidation(' دور بازو در حالت منقبض', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.contracted_arm?.message}
                                        </p>
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

                                            {...register('forearm', formValidation('دور ساعد', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.forearm?.message}
                                        </p>
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

                                            {...register('wrist', formValidation(' دور مچ دست', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.wrist?.message}
                                        </p>
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

                                            {...register('chest', formValidation('دور سینه', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.chest?.message}
                                        </p>
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

                                            {...register('belly', formValidation('دور شکم', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.belly?.message}
                                        </p>
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

                                            {...register('waist', formValidation('دور کمر', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.waist?.message}
                                        </p>
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

                                            {...register('hips', formValidation('دور باسن', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.hips?.message}
                                        </p>
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

                                            {...register('thigh', formValidation('دور ران', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.thigh?.message}
                                        </p>
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

                                            {...register('leg', formValidation('دور ساق', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.leg?.message}
                                        </p>
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
                                            {...register('ankle', formValidation('دور مچ پا', false, null, null, /^\d+$/))}
                                        />
                                        <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                            {errors.ankle?.message}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                {
                                    defaultUserSize != null ?
                                        defaultUserSize.length === 0 ?
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

                            </Col>
                        </Row>
                    </div>
                </form>
            }

        </>
    )
}
