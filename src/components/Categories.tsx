import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (i : number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories : React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

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