import { React, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BiBaguette } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { HiOutlineCamera } from "react-icons/hi";


export default function UserInfo() {
    const [tab, setTab] = useState('size')


    return (
        <>
            <Row className='mt-4 fflalezar'>
                <div className='fflalezar fs30 c-text-secondary mb-4'>تکمیل پروفایل</div>
                <Col lg={4}>
                    <div className='user-personal-info bg-white mb-4 br-10'>
                        <div className='position-relative'>
                            <img src="/images/user-grid-bg1.png" className='w-100 backeimg' alt="" />
                            <img src="/images/avatar-1.jpg" width={100} height={100} className='rounded-circle position-absolute user-avatar-img' alt="" />
                        </div>
                        <div className='text-center fflalezar fs20 mt-5 pt-2 c-text-secondary'>
                            نام و نام خانوادگی
                        </div>
                        <div className='mt-1 fflalezar text-center c-text-secondary border-bottom pb-3'>
                            ifrandom@gmail.com
                        </div>
                        <div className='mt-3 px-3'>
                            <div className='fflalezar c-text-secondary'>
                                نام
                            </div>
                            <div>
                                <input type="text" className='px-1 mt-1 c-input w-100' />
                            </div>
                        </div>
                        <div className='mt-3 px-3'>
                            <div className='fflalezar c-text-secondary'>
                                نام خانوادگی
                            </div>
                            <div>
                                <input type="text" className='px-1 mt-1 c-input w-100' />
                            </div>
                        </div>
                        <div className='mt-3 px-3'>
                            <div className='fflalezar c-text-secondary'>
                                ایمیل
                            </div>
                            <div>
                                <input type="text" className='px-1 mt-1 c-input w-100' />
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
                            <button className='send-btn w-100 fflalezar'>
                                ارسال
                            </button>
                        </div>
                    </div>

                </Col>
                <Col lg={8}>
                    {/* tabs */}
                    <div className='left-user-info-box bg-white br-10'>
                        <div className='d-flex align-items-center'>
                            <div className='py-3 me-3 c-tab-active cursor-pointer' onClick={e => setTab('size')}>
                                <BiBaguette fontSize={20}  />
                                <span className='fflalezar me-1'>دریافت سایز</span>
                            </div>
                            <div className='me-4 py-3 cursor-pointer' onClick={e => setTab('image')}>
                                <IoMdImages fontSize={20} />
                                <span className='fflalezar me-1 c-text-secondary'>آپلود تصاویر</span>
                            </div>
                            <div className='me-4 py-3 cursor-pointer' onClick={e => setTab('question')}>
                                <LuClipboardCheck fontSize={19}  />
                                <span className='fflalezar me-1 c-text-secondary'>سوالات</span>
                            </div>
                        </div>
                    </div>
                    {/* first */}
                    {
                        tab === 'size' &&
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
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            وزن
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور گردن
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور شانه
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور بازو در حالت عادی
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور بازو در حالت منقبض
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور ساعد
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور مچ دست
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور سینه
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور شکم
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور کمر
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور باسن
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور ران
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور ساق
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='mt-3 px-3'>
                                        <div className='fflalezar c-text-secondary'>
                                            دور مچ پا
                                        </div>
                                        <div>
                                            <input type="text" className='px-1 mt-1 c-input w-100' />
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
                    }


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
                    {/* second */}

                </Col>
            </Row>
        </>
    )
}
