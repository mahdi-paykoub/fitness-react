import React, { useEffect, useState } from 'react'
import './style.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";
import { Outlet } from "react-router-dom";


export default function AdminPanel() {
    return (
        <>
            <Container className='admin-panel mw-100 pe-0 bg-white'>
                <Row>
                    <Col lg={2} className='ps-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={10} className='px-4'>
                        <Topbar />


                        <div className='mt-5 pt-5'>
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
