import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword,setKeyword]=useState('');

  const searchHandler = (e)=>{
    e.preventDefault();
    navigate(`/search/${keyword}`);
  }

  const clearKeyword =()=>{
    setKeyword("");
  }

  useEffect(()=>{
    if(location.pathname == '/'){
      clearKeyword();
    }
  },[location])
  return (
    <form onSubmit={searchHandler}>
        <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition">
            <input
              type="text"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 text-sm outline-none rounded-l-full"
            />
            <button className="px-4 py-2 text-gray-500 hover:text-emerald-500 transition">
              <FiSearch size={18} />
            </button>
          </div>
    </form>
  )
}

export default Search
