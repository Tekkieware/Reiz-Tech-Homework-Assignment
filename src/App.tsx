import React, {useState, useEffect} from 'react';
import { Country } from './models';
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';



const App:React.FC = () => {
  
const [currentPage, setCurrentPage] = useState<number>(1)
const countriesPerPage: number = 10
const lastIndex: number = currentPage * countriesPerPage
const firstIndex: number = lastIndex - countriesPerPage
const [countriesList, setCountriesList] = useState<Country[]>([])
const currentPageData: Country[] = countriesList.slice(firstIndex, lastIndex)
const noOfPages: number = Math.ceil(countriesList.length / countriesPerPage)
const pageNumbers: number[] = [...Array(noOfPages + 1).keys()].slice(1)

const prevPage = () =>{
if(currentPage !== 1){
  setCurrentPage(currentPage - 1)
}
}

const nextPage = () =>{
  if(currentPage !== noOfPages){
    setCurrentPage(currentPage + 1)
  }
}

const changeCurrentPage = (number:number) =>{
setCurrentPage(number)
}


useEffect (()=>{
  const config = {
    method: 'get',
    url: 'https://restcountries.com/v2/all?fields=name,region,area',
  };

axios(config)
.then(function (response) {
  setCountriesList(response.data)
  console.log(countriesList)
})
.catch(function (error) {
  console.log(error);
});
},[countriesList])

  return (
    <div className="countries-list">
      <h4>Countries List</h4>
      {currentPageData.map((country, index) => (
        <div className='country' key={index}>
        <p className='country-name'>{country.name}</p>
        <p className='country-region'>{country.region}</p>
        <p className='country-area'>{country.area}</p>
        </div>
      )
      )}
      <Pagination>
       <Pagination.Prev onClick={prevPage} />
        {
          pageNumbers.map((number, index) =>(
            <Pagination.Item className={number === currentPage ? 'active': ''} key={index} onClick={()=>changeCurrentPage(number)}>{number}</Pagination.Item>
          ))
        }
       <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
}

export default App;
