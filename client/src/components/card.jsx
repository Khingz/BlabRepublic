import React from 'react'
import { formatDate, getCategoryColor } from '../utility/postUtils';
import { Link } from 'react-router-dom'

const Card = ({ image, title, content, category, date, id }) => {
  const formattedDate = formatDate(date);

  return (
    <div className="rounded overflow-hidden shadow-sm">
      <div className='w-full h-72 relative'>
        <img className="w-full h-full object-cover" src={image} alt={id} />
      </div>
      <div className='flex items-center justify-start gap-2 font-semibold my-2 mx-3'>
        <p className={`${getCategoryColor(category.toLowerCase())}`}>{category || 'General'}</p>
        <p className='text-gray-800'>|</p>
        <p className='text-gray-800'>{formattedDate}</p>
      </div>
      <div className="font-medium text-xl mx-3">
        <h3>{title.slice(0, 90)}</h3>
      </div>
      <div>
        <p className="text-gray-700 text-base mx-3">{`${content.slice(0, 300)}...`}</p>
      </div>
      <div className='mt-4 mb-4 mx-2'>
        <Link to={`/posts/${id}`} className='bg-none border border-black text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-center rounded-sm px-3 py-2'>Read more</Link>
      </div>
    </div>
  )
}

export default Card;