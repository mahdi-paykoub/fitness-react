import React, { useEffect, useState } from 'react'
import './style.css'
import { BiSolidChevronLeft } from 'react-icons/bi';
import { BiSolidChevronRight } from 'react-icons/bi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, NavLink, useParams } from 'react-router-dom';


export default function Pagination({
    items,
    itemsCount,
    pathname,
    setShownCourses,
}) {

    const [pagesCount, setPagesCount] = useState(null);
    const { page } = useParams();

    useEffect(() => {
        let endIndex = itemsCount * page;
        let startIndex = endIndex - itemsCount;
        let paginatedItems = items.slice(startIndex, endIndex);
        setShownCourses(paginatedItems);


        let pagesNumber = Math.ceil(items.length / itemsCount);
        setPagesCount(pagesNumber);

    }, [page, items]);

    return (
        <>
            <Container className=''>
                <Row className='mt-4'>
                    <div
                        className='text-start'>

                        <nav className='pagination-box mt-2'>
                            <ul>
                                {Array(pagesCount)
                                    .fill(0)
                                    .map((item, index) =>
                                        <li
                                        key={index}
                                            className="ms-1"
                                        ><NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? "" : isActive ? "active-pagination-cus" : ""
                                            }
                                            to={`${pathname}/${index + 1}`}
                                        >{index + 1}</NavLink></li>

                                    )
                                }


                            </ul>
                        </nav>

                    </div>
                </Row>
            </Container>
        </>
    )
}