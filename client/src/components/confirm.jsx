import React, { useState } from 'react'
import { useConfirm } from '../context/confirmContext';
import SpinnerSmall from './spinnerSmall';

const Confirm = ({handleDelete, title}) => {
  const { handleConfirmClose } = useConfirm();
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    try {
      setIsLoading(true)
      await handleDelete()
      setIsLoading(false)
    } catch(err) {
      console.log(err);
      setIsLoading(false)
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50'>
        <div className="bg-white rounded-lg p-8">
        <div className="">
          <h1 className='text-xl'>{title}</h1>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleConfirmClose}
            className='bg-red-400 py-2 px-4 font-semibold rounded-sm text-white'
          >
            Cancel
          </button>
          <button onClick={handleContinue} className='bg-green-400 py-2 px-4 font-semibold rounded-sm text-white flex gap-2'>
            {isLoading && <SpinnerSmall />}
            <p>Continue</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm;