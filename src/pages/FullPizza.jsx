import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pizza, setPizza] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`https://649040a11e6aa71680cae5fe.mockapi.io/items/${id}`)
                setPizza(res.data)
            } catch (error) {
                alert("Error here!");
                navigate('/')
            }
        }
        
        fetchData();
        console.log(pizza);

    }, [])

    if (!pizza){
     return "Загрузка..."   
    }
    return (
        <div className='container'>
            <img alt='pizza' src={pizza.imageUrl} />
            <h2>{pizza.rating}</h2>
            <p>{pizza.title}</p>
            <h4>{pizza.price}</h4>
        </div>
    )
}

export default FullPizza