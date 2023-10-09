// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import OrderDetails from '../Pages/Order/OrderDetails';

const AppRouter: React.FC = () => {
  
  return (
    <>
     
      <Routes>
        <Route path="/"   Component={Home} />
        <Route path="/Order"   Component={OrderDetails} />
        {/* <Route path='/Checkout'   Component={} /> */}
      </Routes>  
    
    </>
  );
};

export default React.memo(AppRouter);


