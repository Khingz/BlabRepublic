import React, {useEffect} from 'react'
import HeroSection from '../components/heroSection';
import Search from '../components/search';
import Card from '../components/card';
import { usePost } from '../context/postContext';
import { Pagination } from '../components/pagination';
import Spinner from '../components/spinner';

const Home = () => {
  const { posts, fetchData, isLoading } = usePost();
  const postArr = posts && posts.data


  const handlePageChange = (pageNumber) => {
    try {
      fetchData({page: pageNumber})
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full'>
      <HeroSection />
      <Search />
      {/* Upper card section */}

      {/* Lower card section  */}
      {!isLoading && postArr < 1 && (<h1 className='w-full mt-32 text-4xl font-semibold text-center'>No Post at the moment</h1>)}
      {postArr && (<div className="">
        {isLoading ? (<div className='w-full flex items-center justify-center mt-16'>
          <Spinner />
        </div>)
         : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 mb-10 px-10'>
            {
              postArr.map((card) => (
                <Card key={card._id} image={card.img} title={card.title} content={card.content} category={card.category} date={card.createdAt} author={card.author} id={card._id} />

              ))
            }
          </div>
         )
        }
      </div>)}
      {!isLoading && <div className='mb-6'>
        <Pagination currentPage={posts && posts.page} totalPages={posts && posts.totalPages} onPageChange={handlePageChange}/>
      </div>}

    </div>
  )
}

export default Home