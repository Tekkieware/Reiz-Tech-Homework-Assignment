import React, {useState, useEffect} from 'react';
import { Country } from './models';
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import {Container, Row, Col, Form} from 'react-bootstrap'



const App:React.FC = () => {
  
const [currentPage, setCurrentPage] = useState<number>(1)
const countriesPerPage: number = 5
const lastIndex: number = currentPage * countriesPerPage
const firstIndex: number = lastIndex - countriesPerPage
const [countriesList, setCountriesList] = useState<Country[]>([])
const currentPageData: Country[] = countriesList.slice(firstIndex, lastIndex)
const noOfPages: number = Math.ceil(countriesList.length / countriesPerPage)
const pageNumbers: number[] = [...Array(noOfPages + 1).keys()].slice(1)

useEffect (()=>{
  const config = {
    method: 'get',
    url: 'https://restcountries.com/v2/all?fields=name,region,area',
  };

axios(config)
.then(function (response) {
  setCountriesList(response.data)
})
.catch(function (error) {
  console.log(error);
});
},[])

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


const filterByValue = (e: React.FormEvent, region: string) =>{
  e.preventDefault()
  if(region){
    setCountriesList(countriesList.filter(country => country.region === "Oceania"))
}
  }
  

  const sort = (e: React.FormEvent, order: string) =>{
    e.preventDefault()
    if(order === "ascending"){
      const sortedCountries = countriesList.sort((a, b) => (a.name < b.name ? -1 : 1))  
      setCountriesList([...sortedCountries])
  }else{
    if(order === "descending"){
    const sortedCountries = countriesList.sort((a, b) => (a.name > b.name ? -1 : 1));
    setCountriesList([...sortedCountries])
    }
    
  }
    }
    



  return (
    <div className="countries-list">
      <Container fluid>
      <h4>Countries List</h4>
      <Row className='mb-4'>
        <Col md={3}>
      <Form.Select size="sm" onChange={((e) => filterByValue(e, e.target.value))}>
        <option>filter by region</option>
        <option value="Oceania">Oceania</option>
      </Form.Select>
        </Col>
        <Col md={3}>
        <Form.Select size="sm">
        <option>filter by area</option>
        <option>smaller than lithuana</option>
        <option>larger than lithuana</option>
      </Form.Select>
        </Col>
        <Col md={3} className='offset-md-3'>
        <Form.Select size="sm" onChange= {((e) => sort(e, e.target.value))}>
          <option>sort</option>
        <option value="ascending">ascending(A-Z)</option>
        <option  value="descending">descending(Z-A)</option>
      </Form.Select>
        </Col>
      </Row>
      {currentPageData.map((country, index) => (
        <Row className='country' key={index}>
        <p className='country-name'>{country.name}</p>
        <p className='country-region'>{country.region}</p>
        <p className='country-area'>{country.area}</p>
        </Row>
      )
      )}
      <Row>
        <Col>
      <Pagination>
       <Pagination.Prev onClick={prevPage} />
        {
          pageNumbers.map((number, index) =>(
            <Pagination.Item className={number === currentPage ? 'active': ''} key={index} onClick={()=>changeCurrentPage(number)}>{number}</Pagination.Item>
          ))
        }
       <Pagination.Next onClick={nextPage} />
      </Pagination>
      </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
