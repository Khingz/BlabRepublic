import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { usePost } from '../context/postContext';
import Spinner from './spinner';
import Card from './card';

const FilteredPosts = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const { posts, fetchData, isLoading} = usePost();

    const postArr = posts.data

    let queryParamObj = {};
    for (const [key, value] of queryParams.entries()) {
        queryParamObj[key] = value
    }
    
    useEffect(() => {
        fetchData(queryParamObj)
    }, [])

    return (
        <div className='mt-16 md:mt-32'>
            <div className='pt-12 md:ml-8 ml-2'>
                <h3 className='text-3xl font-light'>{queryParamObj && queryParamObj.search ? `Search Result for: ${queryParamObj.search}` : `Category: ${queryParamObj.category}`}</h3>
            </div>
            <div className='border-t border-gray-200 w-full mt-6'></div>
            {!isLoading && postArr < 1 && (<h1 className='w-full mt-32 text-4xl font-light text-center'>
                {`${queryParamObj && queryParamObj.search ? `No search result for ${queryParamObj.search}` : `No post for category ${queryParamObj.category} yet`}`}
            </h1>)}
            {posts.data && (<div className="">
            {isLoading ? (<div className='w-full flex items-center justify-center mt-16'>
                <Spinner />
            </div>)
                : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-10 px-10'>
                {
                    postArr.map((card) => (
                    <Card key={card._id} image={card.img} title={card.title} content={card.content} category={card.category} date={card.createdAt} author={card.author} id={card._id} />

                    ))
                }
                </div>
                )
            }
            </div>)}
        </div>
    )
}

export default FilteredPosts;