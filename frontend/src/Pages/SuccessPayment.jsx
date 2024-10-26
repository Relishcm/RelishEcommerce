
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const SuccessPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
   

    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                
                const response = await axios.get('http://localhost:5500/paymentRouter/success', {
                    params: { session_id: sessionId }
                    
                });
                setPaymentStatus(response.data.status || 'failed'); 
            } catch (error) {
                console.error('Error verifying payment:', error);
                setPaymentStatus('failed');
            } 
        };

        if (sessionId) {
            verifyPayment();
        } else {
            setPaymentStatus('failed');
            
        }
    }, [sessionId]);

    const handleClick = () => {
        navigate('/');
    };

  

    return (
        <div className='text-center'>
            {paymentStatus === 'completed' ? (
                <>
                      <h2>Payment Failed</h2>
                      <p>There was an issue with your payment. Please try again.</p>
                </>
            ) : (
                <>
                  
                    <h2>Payment Successful</h2>
                    <p>Your payment was successful! Thank you for your purchase.</p>
                </>
            )}
            <button onClick={handleClick}>Go to Home</button>
        </div>
    );
};
