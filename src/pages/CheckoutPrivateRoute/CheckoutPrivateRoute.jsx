import { React, useContext, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";
import { Col, Container, Row } from 'react-bootstrap';
import { ShimmerContentBlock, ShimmerDiv, ShimmerSectionHeader, ShimmerText } from 'shimmer-effects-react';

export default function CheckoutPrivateRoute() {
    const authContext = useContext(AuthContext)
    const navigateLOgin = useNavigate();

    return (
        <>
            {
                authContext.isLoggedIn === null ?
                    <Container fluid className='pt-4 px-5 mt-5'>
                        <Row>
                            <Col lg={9}>
                                <ShimmerDiv rounded={1} mode="light" height='200px' width='100%' />
                            </Col>
                            <Col lg={3} className='mt-1'>
                                <ShimmerDiv rounded={1} mode="light" height='50vh' width='100%' />
                            </Col>
                        </Row>
                    </Container>

                    :
                    authContext.isLoggedIn === true ?
                        <>
                            <Outlet />
                        </>

                        :
                        <>
                            <Container>
                                <Row className='justify-content-center mt-5'>
                                    <Col lg='3' className='text-center'>
                                        <div className='fflalezar fs20 c-text-secondary'>
                                            <img src="/images/3. Web Check.png" className='w-100' alt="" />
                                            برای خرید  برنامه ابتدا باید در سایت ثبت نام کنید در صورتی که قبلا ثبت نام کرده اید وارد شوید.
                                        </div>
                                        <div className='mt-4 d-flex justify-content-center'>
                                            <Link to='/login/2' className='fflalezar send-btn px-4 py-2' state={{ endPoint: "/checkout" }}>
                                                ورود
                                            </Link>
                                            <Link to='/register/2' className='fflalezar send-btn px-4 py-2 me-2' state={{ endPoint: "/checkout" }}>
                                                ثبت نام
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </>
            }





        </>


    )
}
