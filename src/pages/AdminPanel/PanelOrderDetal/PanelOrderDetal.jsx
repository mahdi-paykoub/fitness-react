import React, { useEffect, useState } from 'react'
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { formValidation } from "../../../utils/Validations";
import { useForm } from "react-hook-form";
import MyModal from '../../../components/MyModal/MyModal';
import { SiAnswer } from "react-icons/si";
import { GoFileZip } from "react-icons/go";
import { IoMdCloudDownload } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";


export default function PanelOrderDatail() {
    const [tab, setTab] = useState('size')
    const [userSize, setUserSize] = useState([])
    const [programs, setPrograms] = useState([])

    const [modalShow, setModalShow] = useState(false);

    const orderId = useParams().id
    const baseUrl = process.env.REACT_APP_BASE_URL

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;


    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('user_info_status_id', data.user_info_status_id)
        // formData.append('file', data.file)


        fetch(`${baseUrl}admin/program`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if (response.status !== false) {
                    swal({
                        title: response.message[0],
                        icon: "success",
                        buttons: 'باشه'
                    }).then((res) => {
                        reset()
                        getUserInfo()
                        setModalShow(false)

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


    const getUserInfo = () => {
        fetch(`${baseUrl}admin/get-user-info-by-order/${orderId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.programs);

                setUserSize(res.userSize)
                setPrograms(res.programs)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            <div className='admin-Data-box w-100 br-10 p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <span className='fs15 ms-2'>برنامه سفارش داده شده:</span>
                        نام برنامه
                    </div>
                    <div className='d-flex align-items-center'>
                        {
                            programs.length === 0 ?
                                <div className='fs15 ms-2 text-danger'>
                                    برنامه ارسال نشده است
                                </div>
                                :
                                <div className='fs15 ms-2 text-primary'>
                                    {programs.length}
                                    <span className='me-1'>برنامه ارسال شده است</span>
                                </div>
                        }

                        <button className='btn btn-primary me-2' variant="primary" onClick={() => setModalShow(true)}>
                            ارسال برنامه
                        </button>

                    </div>
                </div>
            </div>
            <div className='admin-Data-box w-100 br-10 px-3 mt-3'>
                {/* tabs */}
                <div className='left-user-info-box bg-white br-10'>
                    <div className='d-flex align-items-center'>
                        <div className={`py-3 me-1 ${tab === 'size' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('size')}>
                            <BiBaguette fontSize={20} />
                            <span className='fflalezar me-1'>سایز ها</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'image' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('image')}>
                            <IoMdImages fontSize={20} />
                            <span className='fflalezar me-1 c-text-secondary'> تصاویر</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'question' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('question')}>
                            <LuClipboardCheck fontSize={19} />
                            <span className='fflalezar me-1 c-text-secondary'>سوالات</span>
                        </div>
                        <div className={`py-3 me-4 ${tab === 'programs' ? 'c-tab-active' : ''} cursor-pointer`} onClick={e => setTab('programs')}>
                            <GoFileZip fontSize={19} />
                            <span className='fflalezar fs15 me-1 c-text-secondary'>برنامه های ارسال شده</span>
                        </div>

                    </div>
                </div>

            </div>
            {
                userSize.length !== 0 &&
                <>
                    <div className='admin-Data-box w-100 py-4 br-10 px-3 mt-3'>
                        <div>
                            {
                                tab === 'size' &&
                                <Row className=''>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>قد</div>
                                            <div>{userSize.height}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>وزن</div>
                                            <div>{userSize.weight}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور گردن</div>
                                            <div>{userSize.neck}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور شانه  </div>
                                            <div>{userSize.shoulder}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور بازو در حالت عادی</div>
                                            <div>{userSize.arm}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور بازو در حالت منقبض</div>
                                            <div>{userSize.contracted_arm}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور ساعد</div>
                                            <div>{userSize.forearm}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور مچ دست</div>
                                            <div>{userSize.wrist}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور سینه</div>
                                            <div>{userSize.chest}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور شکم</div>
                                            <div>{userSize.belly}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور کمر</div>
                                            <div>{userSize.waist}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور باسن</div>
                                            <div>{userSize.hips}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور ران</div>
                                            <div>{userSize.thigh}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور ساق</div>
                                            <div>{userSize.leg}</div>
                                        </div>
                                    </Col>
                                    <Col lg='4' className='mt-3'>
                                        <div className='d-flex justify-content-between bg-c-sec br-10 p-3'>
                                            <div>دور مچ پا</div>
                                            <div>{userSize.ankle}</div>
                                        </div>
                                    </Col>


                                </Row>
                            }

                            {/* second */}
                            {
                                tab === 'image' &&
                                <div>image</div>
                            }
                            {/* second */}
                            {
                                tab === 'question' &&
                                <div>questions</div>
                            }

                            {
                                tab === 'programs' &&
                                <>
                                    {
                                        programs.length !== 0 ?
                                            programs.map((program, index) =>
                                                <div key={program.id} className='d-flex justify-content-between align-items-center p-2 br-10 px-3 bg-body-tertiary mt-3'>
                                                    <div>
                                                        {index + 1}.
                                                        <span className='me-1'>{program.title}</span>

                                                    </div>
                                                    <div className='text-primary cursor-pointer d-flex align-items-center'>

                                                        <IoMdCloudDownload fontSize={25} />
                                                        <div className='me-2 mt-1'>دانلود برنامه</div>
                                                    </div>
                                                </div>)
                                            :
                                            <div className='fflalezar bg-danger text-white br-10 p-3'>برنامه ای وجود ندار.</div>
                                    }
                                </>
                            }


                        </div>

                    </div>
                    <div className='admin-Data-box w-100 py-4 br-10 px-3 mt-3'>
                        <FiShoppingBag fontSize={19} />
                        <span className='fflalezar fs15 me-1 c-text-secondary'>سفارشات قبلی کاربر</span>
                    </div>
                </>
            }
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <div className='p-4'>
                    <div className='fflalezar fs20 color-2'>
                        <SiAnswer fontSize={20} className='ms-2' />
                        ارسال برنامه
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='mt-3'>
                            <input type="hidden" value={userSize.user_info_status_id}
                                {...register('user_info_status_id', formValidation('آیدی'))}
                            />
                            <input type="text" className='px-1 mt-1 c-input w-100' placeholder='عنوان برنامه'
                                {...register('title', formValidation('عنوان'))}
                            />
                            <p className='mt-2 text-danger px-2 fs13 fflalezar'>
                                {errors.title?.message}
                            </p>
                        </div>
                        <div className='text-start mt-2'>
                            <button className='fflalezar send-btn px-4'>ارسال </button>
                        </div>
                    </form>
                </div>

            </MyModal>
        </>
    )
}
