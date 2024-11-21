import { React } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { BsEmojiLaughingFill } from "react-icons/bs";




export default function SuccessPay() {
    const type = useParams().type

    return (
        <>
            <Container>
                <Row className='justify-content-center mt-5 pb-5'>
                    <Col xs='10' md='6' lg='4' className='text-center '>
                        <img src="/images/logo-morabihamrah-dark.png" width={150} alt="" />
                        <div className='bg-white p-5 mt-4' style={{ 'borderRadius': '20px' }}>
                            <img src="/images/2. Love.png" width={140} alt="" />
                            <div className='fflalezar fs17 mt-3' style={{ 'color': '#3eacd9' }}>پرداخت موفق بود</div>
                            {
                                type == 'plan' &&
                                <div className='mt-3 fs14 text-secondary lh2'>

                                    کاربر گرامی با توجه به خرید شما، لازم است حتما نسبت به تکمیل اطلاعات خود اقدام فرمایید.
                                    توجه نمایید تا زمانی که اطلاعات خود را تکمیل نکنید در نوبت دریافت برنامه ورزشی قرار نمی‌گیرد.
                                    برای تکمیل اطلاعات به پنل کاربری خود مراجعه فرمایید.
                                </div>
                            }
                            <Link to='/dashboard' className='mt-4 btn px-5 py-2 text-white fflalezar' style={{ 'borderRadius': '40px', 'background': '#3eacd9' }}>پنل کاربری</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
