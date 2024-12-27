import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);
   const [filter, setFilter] = useState('');
   const [sort, setSort] = useState('');
   const [totalPages, setTotalPages] = useState(1);
   const limit = 10;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('/api/items', {
               params: { page, limit, sort, filter },
            });
            setData(response.data.data);
            setTotalPages(Math.ceil(response.data.total / limit));
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, [page, sort, filter]);

   return (
      <div>
         <h1>Data Table</h1>
         <div>
            <input
               type="text"
               placeholder="Filter by name"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
            />
            <select onChange={(e) => setSort(e.target.value)} defaultValue="">
               <option value="">Sort by</option>
               <option value="name">Name</option>
               <option value="date">Date</option>
            </select>
         </div>
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Rating</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item) => (
                  <tr key={item.id}>
                     <td>{item.name}</td>
                     <td>{item.date}</td>
                     <td>{item.rating}</td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div>
            {Array.from({ length: totalPages }, (_, index) => (
               <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  disabled={page === index + 1}
               >
                  {index + 1}
               </button>
            ))}
         </div>
      </div>
   );
};

export default MainPage;
