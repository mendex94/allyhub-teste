import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import Select from 'react-select';
import { getCityData, getCountryData } from '../utils/fetchData';

interface formData {
  countries: string[],
  cities: string[],
  name: string,
  email: string,
  phone: string,
  cpf: string,
}

const Home: NextPage = () => {
  const countries = useQuery(['countries'], getCountryData)
  const cities = useQuery(['cities'], getCityData)
  for (let i = 0; i < countries.data?.length; i++) {
    countries.data[i].label = countries.data[i].name
    countries.data[i].value = countries.data[i].name
  }
  for (let i = 0; i < cities.data?.length; i++) {
    cities.data[i].label = cities.data[i].name
    cities.data[i].value = cities.data[i].name
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    let formData: formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      cpf: e.target.cpf.value,
      countries: [],
      cities: []
    }
    const countries = e.target.countries
    for (let i = 0; i < countries.length; i++) {
      formData.countries.push(countries[i].value);
    }
    const cities = e.target.cities
    for (let i = 0; i < cities.length; i++) {
      formData.cities.push(cities[i].value);
    }
    alert(JSON.stringify(formData))
  }

  return (
    <div>
      <Head>
        <title>Teste Allyhub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={(e) => handleSubmit(e)} action='submit' className='text-white flex gap-4 w-full h-screen p-16 items-center justify-center'>
        <div className='bg-slate-900 p-4 flex flex-col gap-4 w-1/2'>
          <h2 className='font-bold'>Dados Pessoais</h2>
          <input type="text" placeholder='Nome' className='px-2 rounded text-white bg-[#111]' id='name' required />
          <input type="email" placeholder='E-mail' className='px-2 rounded text-white bg-[#111]' id='email' required />
          <input type="text" placeholder='Telefone' className='px-2 rounded text-white bg-[#111]' id='phone' required />
          <input type="text" placeholder='CPF' className='px-2 rounded text-white bg-[#111]' id='cpf' required />
          <h2 className='font-bold'>Destinos de Interesse</h2>
          <Select
            closeMenuOnSelect={false}
            options={countries.data}
            isMulti
            className='text-black'
            name='countries'
            id='countries'
          />
          <Select
            closeMenuOnSelect={false}
            options={cities.data}
            isMulti
            className='text-black'
            id='cities'
            name='cities'
          />
          <button className='bg-[#111] p-4 font-bold rounded hover:bg-slate-400/50 transition-all' type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default Home
