// import { useState } from "react";

function Categories({value, onChangeCategory}) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {
          categories.map((el, index) => <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>{el}</li>)
        }
      </ul>
    </div>
  );
}

export default Categories;