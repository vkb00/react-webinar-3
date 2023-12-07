import { memo, useState } from "react";
import './style.css';
import { paginationFormat } from "../../utils"
function Pagination({ limitProductsOnPage, allProductsCount, paginate, currentPage }) {
  const [addClassCurrent, setClassCurrent] = useState(false);
  const pageNumbers = [];
  let arr = [];
  for (let i = 1; i < Math.ceil(allProductsCount / limitProductsOnPage); i++) {
    pageNumbers.push(i)
  }
  arr = paginationFormat(pageNumbers, currentPage)
  console.log(arr)
  return (
    <div className="Pagination" >
      {
        arr.map(number => {
          if (number < 0)
            return (
              <li key={number}>
                ...
              </li>
            )
          else
            return (
              <li key={number} >
                <a className={currentPage === number ? "current" : "page"}
                  onClick={() => { paginate(number); setClassCurrent(true) }}>{number}</a>
              </li>
            )
        })
      }
    </div >
  );
}



export default Pagination;
