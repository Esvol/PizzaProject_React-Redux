import React, { useContext, useRef } from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";

import { useEffect, useState } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';

import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { sortList } from '../components/Sort';

const Home = () => {

    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { searchValue } = useContext(SearchContext)

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort)
    const currentPage = useSelector(state => state.filter.currentPage)
    const dispatch = useDispatch();

    const fetchPizzas = () => {
        setIsLoading(false)

        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const sortBy = sortType.sortProperty.replace('-', '')
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

        axios.get(`https://649040a11e6aa71680cae5fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data);
                setIsLoading(true);
            });
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
            fetchPizzas();
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

    const pizzas = items.map((obj) => <PizzaBlock key={obj.title} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? pizzas : skeletons}
            </div>
            <Pagination />
        </div>
    )
}

export default Home;