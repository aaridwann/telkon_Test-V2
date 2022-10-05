import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import CardComponent from '../src/component/card'
import useSWR from 'swr'
import BASE_URL from '../src/Constant/BASE_URL'
import Fetcher from '../src/utils/Fetcher'
import { useEffect, useState } from 'react'
import { addUser } from '../src/Redux/Features/Users'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const {data,error} = useSWR(BASE_URL,Fetcher)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [dataUser,setDataUser ] = useState([])


  useEffect(() => {
    if(data){
      dispatch(addUser(data))
      setDataUser(data.slice(0,3))
    }
  },[data])



  if(error) return <p>Error</p>
  if(!data) return <p>Loading</p>
  return (
    <div className=' bg-white '>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className=' bg-gray-100 w-full  min-h-screen flex flex-col items-center justify-center'>
        {/* ==== Fisrt Component === */}

          
        <div className=' w-1/2 rounded-bl-[200px] shadow-lg  bg-rose-700 z-10  flex flex-col items-center justify-start'>
          <div className=' w-full mx-10 bg-white py-4 rounded-bl-[200px] pb-10  text-gray-700 flex flex-col gap-4 px-10'>
           <div className=' w-full flex items-center justify-between'>
            <h2 className=' text-gray-700 font-bold text-4xl'>Repository</h2>
              <input placeholder='search ...' className=' bg-transparent border rounded-lg px-2 text-center'/>
           </div>
            <CardTop />
          </div>





          <div onScroll={(e) => console.log(e)} className=' overflow-hidden overflow-x-auto flex items-center justify-start w-full px-20 py-10 gap-5 rounded-bl-[170px] bg-rose-700' >
            {dataUser.map((item,i) => (
              <div onClick={() => router.push(`/user/${item.login}`)} key={i}>
              <CardComponent name={item.login} avatar={item.avatar_url} />
              </div>
            ))}
            
          </div>

         
        </div>


      </main>


    </div>
  )
}

function CardTop({ }) {
  return (
  <div className=' flex flex-col items-center gap-4'>
    <div className=' flex items-center gap-4'>
      <div className=' rounded-full w-32 h-32 bg-red-400 overflow-hidden flex items-start justify-center '>
        <img className=' w-full ' src={'https://i.pinimg.com/564x/28/ac/9b/28ac9bf9ab8c69154eaa9aed61c44953.jpg'} />
      </div>
      <div className=' flex flex-col'>
        <p className=' text-lg font-semibold'>Name</p>
        <p className=' text-xs '>Captions</p>
      </div>
    </div>
    <div className=' max-w-sm '>
    <p className=' text-sm '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
    </div>
    <div className=' flex gap-4 text-lg font-semibold'>
      <p className=' text-lg text-center '>1200<br/> Repo</p>
      <p className=' text-lg text-center'>1200<br/> Repo</p>
    </div>
  </div>);
}
