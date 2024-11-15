import { React, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";

export default function PlanRequired(props) {
    const authContext = useContext(AuthContext)


    return (
        <> {
            JSON.parse(authContext.userInfo.data.status).includes("plan") ?
                props.children
                :
                <Row>
                    <Col>
                        <div className='mt-4 bg-white br-10 p-4 fflalezar justify-content-center'>
                            <Row className='justify-content-center'>
                                <Col lg='5' className='text-center'>
                                    <img src="/images/Email Campaign.png" alt="" className='w-50' />
                                    <div className='fs18 text-secondary mt-2'>
                                        برای دسترسی به این قسمت لازم است برنامه ورزشی خریداری کرده باشید
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
        }

        </>
    )
}
