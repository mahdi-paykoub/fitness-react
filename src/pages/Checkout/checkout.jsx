import { React, useContext } from 'react'
import './style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { CartContext } from "../../Context/CartContext";
import { json } from 'react-router-dom';
import swal from "sweetalert";
import { formValidation } from "../../utils/Validations";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import PlanCheckOut from '../../components/PlanCheckOut/PlanCheckOut';
import CourseCheckOut from '../../components/CourseCheckOut/CourseCheckOut';


export default function Checkout() {
    const cartContext = useContext(CartContext)
    // const baseUrl = process.env.REACT_APP_BASE_URL
    // const userTokenLS = JSON.parse(localStorage.getItem('user'))

    // const navigate = useNavigate();

    // const form = useForm();
    // const { register, control, handleSubmit, formState, reset } = form
    // const { errors } = formState;


    const item = cartContext.cartItem



    // const onSubmit = (data) => {
    //     let formData = new FormData()
    //     formData.append('id', data.id)
    //     formData.append('type', data.type)

    //     fetch(`${baseUrl}payment`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${userTokenLS.token}`
    //             },
    //             body: formData
    //         })
    //         .then(res => res.json())
    //         .then(response => {
    //             console.log(response);
    //             if (response.action) {
    //                 window.location = response.action;
    //             } else {
    //                 swal({
    //                     title: 'مشکلی در ارتباز با درگاه پرداخت بوجود آمد.',
    //                     icon: "error",
    //                     buttons: 'باشه'
    //                 })
    //             }

    //         })
    // }


    return (
        <>
            {
                item.length !== 0 &&
                    item[1] === 'plan' ?
                    <PlanCheckOut />
                    :
                    <CourseCheckOut />

            }

        </>
    )
}
