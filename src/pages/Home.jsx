import React, { useRef } from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

import { useEffect, useState } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';

const Home = () => {

    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { items, status } = useSelector(state => state.pizza)
    const { searchValue, categoryId, currentPage, sortType } = useSelector(state => state.filter)
    const dispatch = useDispatch();

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

        dispatch(fetchPizzas({
            category,
            search,
            sortBy,
            order,
            currentPage
        }))
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
        window.scrollTo(0, 0);
    }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [categoryId, sortType.sortProperty, currentPage])

    const pizzas = items.map((obj) =>
        <Link to={`/pizza/` + obj.id} key={obj.title}>
            <PizzaBlock {...obj} />
        </Link>
        )

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? (<div className='content__error-info'>
                        <h2>Произошла ошибка!</h2>
                        <p>К сожалению не удалось получить пиццы.</p>
                    </div>)
                    : (
                        <div className="content__items">
                            {status === 'loading' ? skeletons : pizzas}
                        </div>
                    )
            }
            <Pagination />
        </div>
    )
}

export default Home;