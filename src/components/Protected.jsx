import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

export default function Protected(props) {
    const {Component}=props;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            toast.error('You have to login first');
            navigate('/');
        }
    }, [token]);
  return (
    <div>
    <Component/>
    </div>
  )
}
