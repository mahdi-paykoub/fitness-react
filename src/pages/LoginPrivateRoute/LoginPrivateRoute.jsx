import { React, useContext, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";
import { Col, Container, Row } from 'react-bootstrap';
import { ShimmerContentBlock, ShimmerDiv, ShimmerSectionHeader, ShimmerText } from 'shimmer-effects-react';

export default function LoginPrivateRoute() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <>
            {
                authContext.isLoggedIn === null ?
                    <Container fluid className='pt-4 px-5'>
                        <Row>
                            <Col lg={6}>
                                <ShimmerDiv rounded={1} mode="light" height='93vh' width='100%' />
                            </Col>
                            <Col lg={6} className='mt-1'>
                                <ShimmerDiv rounded={1} mode="light" height={100} width='100%' />
                                <ShimmerText className='mt-4' mode="light" line={10} gap={15} />
                                <ShimmerText className='mt-4' mode="light" line={10} gap={15} />

                            </Col>
                        </Row>
                    </Container>

                    :
                    authContext.isLoggedIn === false ?
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
                                            شما قبلا وارد سایت شده اید.
                                        </div>
                                        <div className='mt-4 d-flex justify-content-center'>
                                            <Link to='/' className='fflalezar send-btn px-4 py-2 '>
                                                خانه
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
