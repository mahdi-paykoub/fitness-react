import { React, useContext, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";
import { Col, Container, Row } from 'react-bootstrap';
import { ShimmerContentBlock, ShimmerDiv, ShimmerSectionHeader, ShimmerText } from 'shimmer-effects-react';
import NotAccess from '../../components/NotAccess/NotAccess';

export default function UserPanelPrivateRoute() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(authContext);


    return (
        <>
            {
                authContext.isLoggedIn === null ?
                    <Container fluid className='pt-4 px-5'>
                        <Row>
                            <Col lg={2}>
                                <ShimmerDiv rounded={1} mode="light" height='93vh' width='100%' />
                            </Col>
                            <Col lg={10} className='mt-1'>
                                <ShimmerDiv rounded={1} mode="light" height={100} width='100%' />
                                <ShimmerText className='mt-4' mode="light" line={10} gap={15} />
                                <ShimmerText className='mt-4' mode="light" line={10} gap={15} />

                            </Col>
                        </Row>
                    </Container>
                    :
                    (authContext.isLoggedIn === true) ?
                        JSON.parse(authContext.userInfo.data.status)  != null ?
                            JSON.parse(authContext.userInfo.data.status).length > 0 ?
                                <>
                                    <Outlet />
                                </>
                                :
                                <NotAccess />
                            :
                            <NotAccess />


                        :
                        <NotAccess />
            }
        </>
    )
}
