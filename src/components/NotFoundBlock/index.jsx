import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {

    console.log(styles)
    return (
            <div className={styles.root}>
                <div>
                <h1>
                    <span>☹️</span>
                    <br/>
                    Ничего не найдено :\
                </h1>
            </div>
            <p className={styles.description}> К сожалению данная интернет-страница отстутствует в нашем магазине</p>
            </div>

    )
}

export default NotFoundBlock
