import React, { useEffect, useState } from 'react'

const Post = () => {

    const [posts , setPosts] = useState([])
    const [loading , setLoading] = useState(true);
    const [currentPage , setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)

    useEffect(() => {
    getData();
    },[])

    const getData = async () => {
        const url = ' https://jsonplaceholder.typicode.com/posts'

        const result = await fetch(url);
        const response = await result.json();

        setPosts(response);
        setLoading(false)
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost , indexOfLastPost)

    const totalPages = Math.ceil(posts.length / postsPerPage);

     const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
     }

     const renderPagination = () => {
        const pageNumbers = [];
        for(let i = 1 ; i <= totalPages; i++){
            pageNumbers.push(
                <li
                key={i}
                id={i}
                onClick={handleClick}
                className='m-2'
                //className={currentPage === i ? 'active' :''}
                >{i}</li>
            );
        }
        return pageNumbers;
     }

     const deletepost = (id) => {
        setPosts(posts.filter(post => post.id !== id));
     }

  return (
    <div className='justify-center items-center w-full'>
        <div className='flex-1 flex-wrap flex-column justify-center w-full'>
      {loading ?  <p> loading...</p> : (
        <ul className='flex w-full h-full flex-wrap justify-center items-center'>{currentPosts.map(post => (
            <div className='m-5 w-96'>
            <li key={post.id} className='posts bg-white w-96'>
                <h4 className=' text-red-500' onClick={() => deletepost(post.id)}>X</h4>
                <h2>{post.id}</h2>
               <h2 className=' font-bold'>{post.title}</h2>
               <p>{post.body}</p>
            </li>
            </div>
        ))}</ul>
      )}
      </div>

     <ul className='page-numbers text-white'>
        {renderPagination()}
     </ul>
    </div>
  )
}

export default Post
