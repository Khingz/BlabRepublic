import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import { updateUserRole } from '../services/auth.api';
import { toast } from 'react-toastify';

const UserCard = ({id, firstname, lastname, username, role}) => {
  const [roleStatus, setRoleStatus] = useState(role)
  const {user} = useAuth()

  const updateRole = async (e) => {
    try {
        await updateUserRole(id, e.target.value)
        setRoleStatus(e.target.value)
        toast.success(`${username} role updated successfully`)
    } catch (err) {
        toast(err.message)
    }
  }

  useEffect(() => {
    setRoleStatus(role)
  }, [])

  return (
    <div>
        {user && (
            <div className='flex items-center justify-between rounded overflow-hidden shadow-md p-6 mx-auto md:w-11/12 mt-4'>
                <Link to={id !== user._id ? `/users/${id}` : '/profile'}>
                    <p>{`${firstname} ${lastname}`} <span>{`(${username})`}</span></p>
                </Link>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-1'>
                        <input type="radio" name={id} value='admin' onChange={(e) => {}} onClick={updateRole} checked={roleStatus === 'admin'} />
                        <label htmlFor="admin">Admin</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" name={id} value='editor' onChange={(e) => {}} onClick={updateRole} checked={roleStatus === 'editor'}  />
                        <label htmlFor="editor">Editor</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" name={id} value='user' onChange={(e) => {}} onClick={updateRole} checked={roleStatus === 'user'} />
                        <label htmlFor="user">User</label>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default UserCard;