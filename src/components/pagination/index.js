import { memo, useState } from "react";
import './style.css';
import { paginationFormat } from "../../utils"
function Pagination({ limitProductsOnPage, allProductsCount, paginate, currentPage }) {

  const pageNumbers = [];
  let arr = [];
  for (let i = 1; i < (allProductsCount / limitProductsOnPage) + 1; i++) {
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
              <li key={number} className={"space"}>
                ...
              </li>
            )
          else
            return (
              <li key={number}
                className={currentPage === number ? "page current" : "page"}
                onClick={() => { paginate(number); }}
              >
                <a
                >{number}</a>
              </li>
            )
        })
      }
    </div >
  );
}
export default Pagination;
