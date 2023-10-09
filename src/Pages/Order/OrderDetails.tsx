 import  { useEffect, useState } from "react";
import './order.css'
import { SearchOutlined,CheckCircleOutlined,CheckOutlined, ClockCircleOutlined, CheckSquareOutlined,PhoneOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../Home/IHome";
import { useQueryClient } from "react-query";
  
  const OrderDetails =() => {
    debugger
    // const RdxUser:{user :UserDetail}  = useSelector( (state:any) => state.User  );
    const navigate = useNavigate()
    // const dispatch = useDispatch() 
    // const [userDetail,setUserDetail] = useState<UserDetail>(RdxUser.user)
    const queryClient = useQueryClient()

    const userDetail:UserDetail|undefined = queryClient.getQueryData('user')
    const OrderMeal = queryClient.getQueryData('orderMeal')
    debugger
    useEffect(()=>{
        if(!userDetail){
            navigate('/')
        }
    },[])

    return (
        <div className=" bg-ancent ">
        <div className="row d-flex cart align-items-center justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="d-flex justify-content-center border-bottom">
                        <div className="p-3">
                            <div className="progresses">
                                <div className="steps"> <span><CheckCircleOutlined className="fw-bold" style={{fontSize:17}} /></span> </div> <span className="line"></span>
                                <div className="steps"> <span><CheckCircleOutlined className="fw-bold" style={{fontSize:17}} /></span> </div> <span className="line"></span>
                                <div className="steps"> <span className="font-weight-bold">3</span> </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-6 border-right p-5">
                            <div className="text-center order-details">
                                <div className="d-flex justify-content-center mb-5 flex-column align-items-center"> <span className="check1"><CheckOutlined className="fw-bold" style={{fontSize:40}} /></span> <span className="font-weight-bold" style={{fontSize:20}}>Order Confirmed</span> <small className="mt-2">Your Order will delivery to you soon</small> <a href="#" className="text-decoration-none invoice-link">View Invoice</a> </div> <button onClick={()=> navigate('/')} className="btn btn-primary btn order-button">Go to Home Page</button>
                            </div>
                        </div>
                        <div className="col-md-6 background-muted">
                            <div className="p-3 border-bottom">
                                <div className="d-flex justify-content-between align-items-center"> <span><ClockCircleOutlined style={{fontSize:17}} /> 30 min delivery</span></div>
                                <div className="mt-3">
                                    <h6 className="mb-0">{userDetail?.name}</h6> 
                                    <span className="d-block mb-0">{userDetail?.address} </span> 
                                    <small>{userDetail?.city} - {userDetail?.pincode}</small>
                                    <span className="d-block mb-0"><PhoneOutlined style={{fontSize:17}} />{userDetail?.phone} </span>
                                    {/* <small>{userDetail?.phone}</small>  */}
                                    <div className="d-flex flex-column mt-3"> 
                                        <small><CheckSquareOutlined style={{fontSize:17}} /> Vector file</small> 
                                        <small><CheckSquareOutlined style={{fontSize:17}} /> Sources files</small> 
                                    </div>
                                </div>
                            </div>
                            <div className="row g-0 border-bottom">
                                <div className="col-md-6 border-right">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>x{userDetail?.qty}</span> </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>₹100 per nos</span> </div>
                                </div>
                            </div>
                            <div className="row g-0 border-bottom">
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>Subtotal</span> </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>₹{userDetail?.total}</span> </div>
                                </div>
                            </div>
                            <div className="row g-0 border-bottom">
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>Delivery fees</span> </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span>₹37</span> </div>
                                </div>
                            </div>
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">Total</span> </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">₹{userDetail?.total?userDetail.total+37:137}</span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div> </div>
                </div>
            </div>
        </div>
    </div>
    );
  }

  export default OrderDetails;