import { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;


function Sidebar() {
    let [categories, setCategories]= useState([])

    const fetchCategories=async()=>{
        try{
            const result= await axios.get(`${API}/api/categories/`)
            setCategories(result.data.categories)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchCategories();
    },[])
  return (
    <div className='pt-5 pr-10 space-y-5'>
       {categories.map((item) => (
          <li key={item.name} className=''>
            <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-200 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:translate-x-2">
              {item.icon}
              <span className="font-medium">{item.name.toUpperCase()}</span>
            </button>
          </li>
       ))}
    </div>
  )
}

export default Sidebar
