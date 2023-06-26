import React, {useState, useEffect} from 'react';
import { Country } from './models';
import axios from 'axios'





const App:React.FC = () => {
const [countriesList, setCountriesList] = useState<Country[]>([])


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
      <h3>Countries List</h3>
      {countriesList.map((country) => (
        <div className='country'>
        <p className='country-name'>{country.name}</p>
        <p className='country-region'>{country.region}</p>
        <p className='country-area'>{country.area}</p>
        </div>
      )
      )}
    </div>
  );
}

export default App;
