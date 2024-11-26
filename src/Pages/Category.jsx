import React, { useEffect, useState } from "react";
import Edit from "../../public/edit.png";
import Trash from "../../public/trash.png";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { useDispatch } from "react-redux";
import { removeCategoryAction} from "../redux/userAction";

const Category = () => {
  
  
  const [categories, setCategories] = useState([]);
  
  const dispatch = useDispatch()


  const getCategories = async () => {
    try {
      const { data } = await Axios.get("/catagories");
      console.log(data);
      setCategories(data)
     
    } catch (error) {
      console.log(error.message);
      
    }
  };
const handleRemove = (id)=>{
dispatch(removeCategoryAction(id))
}
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Category
            
          </h2>

          <Link to='/createCategory'>
  <button className='bg-[#7e3af2] text-white px-4 py-2 rounded-md'>
        + Create Category
      </button>
  </Link>
        </div>

        {/* Table */}
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Category with avatars
        </h4>

        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">description</th>
                  <th className="px-4 py-3">parent Category</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {categories.map((user) => (
                  <tr
                    key={user.id}
                    className="text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          {/* <img
                            className="object-cover w-full h-full rounded-full"
                            src={user.avatar}
                            alt=""
                            loading="lazy"
                          /> */}
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          {/* <p className="font-semibold">{user.Image}</p> */}
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.description}</td>
                    <td className="px-4 py-3 text-sm">{user.parentCategory}</td>
                    <td className="px-4 py-3 text-xs flex gap-2">
                      <Link to="/editBlog">
                        <button>
                          <img src={Edit} alt="edit" />
                        </button>
                      </Link>
                      <button onClick={()=>handleRemove(user.id)}>
                        <img src={Trash} alt="trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  {/* Pagination buttons */}
                  {/* ... Previous button, page numbers, and Next button would go here ... */}
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Category;
