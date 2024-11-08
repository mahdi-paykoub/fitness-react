import { React, useState, useContext } from 'react'
import { Col, Form, Row, Container } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { CartContext } from "../../Context/CartContext";
import { json } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { FaLastfm } from 'react-icons/fa';

export default function PlanCheckOut() {
    const cartContext = useContext(CartContext)
    const item = cartContext.cartItem

    const [visitOption, setVisitOption] = useState(0)
    const [totalPrice, setTotalPrice] = useState(item[0].price)


    const baseUrl = process.env.REACT_APP_BASE_URL
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
  
    const navigate = useNavigate();

    const form = useForm();
    const { register, control, handleSubmit, formState, reset } = form
    const { errors } = formState;






    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('id', data.id)
        formData.append('type', data.type)
        formData.append('visit', visitOption)

        fetch(`${baseUrl}payment`,
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
                if (response.action) {
                    window.location = response.action;
                } else {
                    swal({
                        title: 'مشکلی در ارتباط با درگاه پرداخت بوجود آمد.',
                        icon: "error",
                        buttons: 'باشه'
                    })
                }

            })
    }



    const handleVisit = (e) => {
        if (e.target.checked === true) {
            setVisitOption(1)
            setTotalPrice(Number(item[0].visit_price) + Number(totalPrice))
        } else {
            setVisitOption(0)
            setTotalPrice(Number(totalPrice) - Number(item[0].visit_price))
        }
    }

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col lg={12}>

                        <div>
                            <GoDotFill />
                            <span className='fs30 fflalezar me-2'>پرداخت</span>
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Col lg={9}>
                        {
                            item[0].visit === 1 &&
                            <div className='mt-4 bg-white br-10 p-4 mt-4'>
                                <div className='fflalezar c-text-secondary fs18 d-flex justify-content-between'>
                                    <div>
                                        آیا مراجعه حضوری جهت آنالیز خواهید داشت؟
                                        <span className='me-3 fs15 badge bg-secondary'>{Number(item[0].visit_price).toLocaleString()} تومان</span>
                                    </div>
                                    <div>
                                        <label class="switch">
                                            <input type="checkbox" onChange={(e) => {
                                                handleVisit(e)
                                            }} />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>

                                </div>
                                {
                                    visitOption === 1 &&
                                    <>
                                        <div className='fs14 mt-3 lh2'>
                                            زمان مراجعه شما حداکثر تا 7 روز بعد ثبت نام و فقط در روز های یکشنبه و پنجشنبه ساعت 14 میباشد.یعنی در صورت ثبت نام در هر روز هفته در اولین یکشنبه و پنجشنبه باید مراجعه گردد. ارسال برنامه 4 الی 7 روز کاری بعد از مراجعه میباشد.نیاز به هماهنگی و تماس قبل از مراجعه نمیباشد. در صورت مراجعه در روز های دیگر به هیچ وجه امکان پذیرش وجود ندارد.
                                        </div>
                                        <div className='mt-3 d-flex align-items-center'>
                                            <input type="checkbox" id='accept_id' class="form-check-input" />
                                            <label htmlFor="accept_id" className='me-2 mt-1 fs13'>شرایط مراجعه حضوری را به طور کامل خواندم
                                            </label>

                                        </div>
                                    </>

                                }

                            </div>
                        }

                        <div className='bg-white br-10 p-4 mt-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <img src="/images/banner/Sport Illustration Kit-08.png" width={250} height={180} className='object-fit-cover br-10' alt="" />
                                    <div className='fflalezar  c-text-secondary me-3'>
                                        <span className='fs25'> {item[0].title}</span>
                                        <div className='mt-4 d-flex align-items-center'>
                                            <span>
                                                <svg className='color-2' width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle opacity="0.15" cx="13.0035" cy="14.2262" r="8.07682" transform="rotate(-36.651 13.0035 14.2262)" fill="currentColor"></circle>
                                                    <path d="M3.15389 7.70712C7.35899 10.1461 7.88486 10.1461 12.0899 7.70712C16.295 5.26812 16.295 5.26812 12.0899 2.82914C7.88486 0.390149 7.35899 0.390142 3.15389 2.82914C1.05134 4.04863 6.10352e-05 4.65838 6.10352e-05 5.26813V10.7559C6.10352e-05 11.0926 0.273054 11.3656 0.609809 11.3656C0.946563 11.3656 1.21956 11.0926 1.21956 10.7559L1.21956 6.77631C1.21956 6.67967 1.32672 6.62118 1.40856 6.67255C1.87465 6.96515 2.45643 7.30259 3.15389 7.70712Z" fill="currentColor"></path>
                                                    <path d="M3.15389 8.31691C7.35899 10.7559 7.88486 10.7559 12.0899 8.31691L12.3298 8.17775C12.5202 8.06725 12.7602 8.18843 12.7742 8.4081C12.7953 8.74004 12.8048 9.11436 12.8048 9.53637C12.8048 12.5851 11.5853 13.1949 7.60095 13.1949C3.35013 13.1949 2.43905 12.5851 2.43905 9.53637C2.43905 9.11456 2.44809 8.74039 2.46848 8.40857C2.48201 8.18842 2.72242 8.06653 2.91317 8.17725L3.15389 8.31691Z" fill="currentColor"></path>
                                                </svg>

                                            </span>
                                            <span className='fs14 fflalezar me-2 text-secondary'>پشتبان :</span>
                                            <span className='fs14 me-1 fflalezar text-secondary'>تیم مربی همراه</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fs25 color-2 fflalezar'>
                                        {Number(item[0].price).toLocaleString()}
                                    </div>
                                    <div className='me-1 color-2 fflalezar'>تومان</div>
                                    <div className='me-4 '>
                                        <GoTrash fontSize={25} className='color-2 cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className='bg-white p-3 br-10 mt-4'>
                            <div className='fs30 fflalezar color-2 pb-4 border-bottom'>
                                اطلاعات پرداخت
                            </div>
                            <div className='mt-4 pb-4 border-bottom'>
                                <div className='fflalezar c-text-secondary'>کد معرف</div>
                                <div className='mt-2 position-relative'>
                                    <input type="text" className='w-100 c-input px-2' placeholder='کد معرف را وارد کنید' />
                                    <button className='fs15 fflalezar position-absolute send-btn cc-inp'>اعمال</button>
                                </div>
                            </div>
                            <div className='pt-4 d-flex justify-content-between align-items-center'>
                                <div className='fflalezar fs18 c-text-secondary'>جمع کل</div>
                                <div className='fflalezar fs18 c-text-secondary'>   {Number(totalPrice).toLocaleString()} <span className='fs15 fflalezar'>تومان</span></div>
                            </div>
                            <div className='pt-4 d-flex justify-content-between align-items-center border-bottom pb-4'>
                                <div className='fflalezar fs18 c-text-secondary color-1'> تخفیف</div>
                                <div className='fflalezar fs18 c-text-secondary color-1'> 590,000 <span className='fs15 fflalezar color-1'>تومان</span></div>
                            </div>
                            <div className='pt-4 d-flex justify-content-between align-items-center'>
                                <div className='fflalezar fs18 c-text-secondary color-1'> مبلغ قابل پرداخت</div>
                                <div className='fflalezar fs18 c-text-secondary color-1'> 590,000 <span className='fs15 fflalezar color-1'>تومان</span></div>
                            </div>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <input type="hidden" value={item[0].id}
                                        {...register('id', formValidation('id'))}
                                    />
                                    <input type="hidden" value={item[1]}
                                        {...register('type', formValidation('نوع محصول'))} />
                                    <button className='send-btn fflalezar w-100 mt-4 fs18'>پرداخت</button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
