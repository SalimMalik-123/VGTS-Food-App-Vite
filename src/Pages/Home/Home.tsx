import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import TextField from "../../Component/TextField";
import ItemCard from "../../Component/Card";
import axios from "axios";
import Logo from '../../logo.png'
import { Collapse, Divider, Input, InputRef, Modal } from "antd";
import banner from '../../Assets/banner2.jpg'
import { SearchOutlined } from "@ant-design/icons";
import { Meal, UserDetail, UserDetailErr } from "./IHome";
import ModalComponent from "../../Component/ModalComponent";
import { isValidPhoneNumber } from "../../Utilites/helperMethod";
import { useDispatch } from "react-redux";
import { addUserDetail } from "../../Store/Reducer/UserReducer";
import { addMeal } from "../../Store/Reducer/MealsReducer";
import QuantityCounter from "../../Component/QuantityHandler";
import './home.css'
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useMutation, useQuery,useQueryClient } from "react-query";


let intialUserDetails:UserDetail={
    name:'',
    address:'',
    city:'',
    pincode:'',
    phone:'',
    qty:1,
    total:100
}
const intialUserErr:UserDetailErr ={
    name:false,address:false,city:false,phone:false,pincode:false}
let meals:Meal[]=[];
const  fetchData = async () =>{
    try{
    
    let lmeals:Meal[]=[];
    let res1 = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
    if(res1.data.meals.length)
    {
        lmeals.push(...res1.data.meals.slice(0,8))
    }
    let res2 = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
    if(res2.data.meals.length)
    {
        lmeals.push(...res2.data.meals.slice(0,8))
    }
    meals = [...lmeals]
    return lmeals
    }
    catch{ throw new Error('Network response was not ok')}
}
const Home = ()=>{

    //const [filterMeals,setFilterMeals] = useState<Meal[]>([])
    const [sltdMeals,setSltdMeals] = useState<Meal>()
    const [search,setSearch] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [userDetails,setUserDetails] = useState<UserDetail>(intialUserDetails)
    const [UserErr,setUserErr] = useState<UserDetailErr>(intialUserErr)
    const [activeKey,setActiveKey] =useState(1)
    const [activeKey1,setActiveKey1] =useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[qty,setQty] = useState<number>(1)
    const items = useRef<HTMLDivElement>(null)
   
    const {isError,isLoading,data:filterMeals} = useQuery<Meal[]>('meals',fetchData)
    const queryClient = useQueryClient()
    
    useEffect(()=>{
        queryClient.fetchQuery('meals')
    },[])
   
  
    useEffect(()=>{
        setUserDetails({...userDetails,qty:qty,total:qty*100})
    },[qty])
    const fetch = async()=>{
        debugger
        
        let res1 = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
        if(res1.data.meals)
        {
            queryClient.setQueryData('meals',res1.data)
        }
    }
    const debounce = (func:()=> void,delay:number) =>{
        let timeoutId:any ;
        return () => {
             clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func();
            }, delay);
        }
    }
    const debounceHandleSearch = debounce(fetch,1500);
    const HandleSearch:ChangeEventHandler<HTMLInputElement>  = (event:any) => {
        const query = event.target.value.toLowerCase();
        setSearch(query);
        
        debounceHandleSearch()
        // const filtered = meals.filter((data) => data.strMeal.toLowerCase().includes(query));
        // queryClient.setQueryData('meals',filtered)
        
        items.current?.scrollIntoView()
      };
    const HandleItemClick = (id:string) =>{
        setActiveKey(1)
        setActiveKey1(1)
        setIsCheck(false)
        setSltdMeals(meals.filter(data => data.idMeal === id)[0])
        setShowModal(true)
        console.log(meals.filter(data => data.idMeal === id)[0])
    }
    const HandleCheckout =() =>{
        debugger
        if(!isCheck)
        {
            setIsCheck(true)
            setActiveKey(0)
            setActiveKey1(0)
        }
        else{
            HandlePlaceOrder()
        }
       
       
    }
    const HandleCancel =()=>{
        setUserDetails(intialUserDetails)
        setUserErr(intialUserErr)
        setShowModal(false)
        setIsCheck(false)          
    }
    const HandlePlaceOrder = () => {
        debugger
        try{
            let err:any ={} ;
            Object.entries(userDetails).map(([propertyName, propertyValue],ind) => { 
                if( propertyValue === "")
                {
                    const UserErrKey = propertyName as keyof typeof UserErr;
                    err[UserErrKey] = true                
                }
                else if(propertyValue !==""){
                    const UserErrKey = propertyName as keyof typeof UserErr;
                    err[UserErrKey] = false     
                }
             })
             setUserErr({...UserErr,...err})
            let isErr = false
            Object.entries({...UserErr,...err}).forEach(([propertyName, propertyValue]) => {
                if(propertyValue){               
                    isErr = true             
                }
             })              
             if(isErr)
             {
                return false            
             }
             dispatch(addUserDetail(userDetails))
             sltdMeals && dispatch(addMeal(sltdMeals))
             queryClient.setQueryData('user',userDetails)
             queryClient.setQueryData('orderMeal',sltdMeals)
             navigate('/Order')
             console.log(userDetails)
        }
        catch(err){
            console.log(err);
            
        }
      };

      const handlePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Use a regular expression to match only numbers
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        debugger
        setUserDetails({...userDetails,pincode:onlyNumbers});
        if(onlyNumbers !=="")
        {
        setUserErr({...UserErr,pincode:false})
        
        }
        
      }
      const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
       setUserErr({...UserErr,name:false})
       setUserDetails({...userDetails,name:e.target.value})
      }
      const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserErr({...UserErr,address:false})
        setUserDetails({...userDetails,address:e.target.value})
       }
       const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserErr({...UserErr,city:false})
        setUserDetails({...userDetails,city:e.target.value})
       }
       const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
        setUserDetails({...userDetails,phone:e.target.value})
        if(!isValidPhoneNumber(e.target.value))
        {            
            setUserErr({...UserErr,phone:true})
        }
        else{
            setUserErr({...UserErr,phone:false})
        }        
    }

    return(
        <div className="w-100 h-100">
            <ModalComponent 
                open={showModal}
                handleCancel={HandleCancel}
                handleOk={HandleCheckout}
                isCheck={isCheck} 
            >
                <div className=" h-100 ">
                    <h4 className="mb-3 border-2 border-bottom pb-2 ">Meals Details</h4>
                    <div  className=" h-100" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',overflowX:'hidden' }}>                    
                        <Collapse
                            bordered={false}
                            accordion
                            collapsible="header"
                            style={{fontFamily:'inherit',color:'inherit'}}
                            onChange={(key: string | string[]) => setActiveKey1(activeKey1 ===0 ?1:0)}
                            activeKey={activeKey1}   
                            items={[{ key: '1', label: 'Images', className:'fw-bold', children:
                            <div>
                                <div className="m-2 w-100 mb-4 "  >
                                    <img alt={sltdMeals?.strMeal}  style={{width:'300px',height:'250px'}} className='p-2  rounded-4' src={sltdMeals?.strMealThumb} />
                                    <h5 className="ms-2">{sltdMeals?.strMeal}</h5>
                                </div>
                                <div className="m-2 px-1  w-100  border-bottom border-2 pb-3 mb-3  ">
                                    <div>
                                    <h6 className="fw-bold me-3 my-1 ">Description </h6>
                                    <p className="fw-normal">{sltdMeals?.strInstructions.slice(0,200)}</p>
                                    </div>                             
                                </div> 
                            </div>
                        }]}  
                        >
                        </Collapse>
                                                                      
                        <div className="">                                 
                            <Collapse
                            bordered={false}
                            accordion
                            collapsible="header"
                            style={{fontFamily:'inherit',color:'inherit'}}
                            onChange={(key: string | string[]) => setActiveKey(activeKey ===0 ?1:0)}
                            activeKey={activeKey}                          
                            items={[{ key: '1', label: 'Ingredients', className:'fw-bold', children:
                                <div className="" style={{ display: 'inline-block',  }}>                             
                                {sltdMeals &&
                                    Object.entries(sltdMeals).map((data,ind)=>{                                           
                                        if(data[0].slice(0,13) === 'strIngredient'  && data[1])
                                        {
                                            return(
                                                <p key={ind} className=" fw-normal my-2 m-0 border  border-secondary rounded-pill ps-4 py-2 pe-2 text-secondary">{data[1]}</p>
                                            )
                                        }                                          
                                    }) }  
                                </div> 
                            
                            }]}
                            />                                  
                        </div> 
                        {isCheck &&
                        <div className="m-2 px-auto">
                            <h6 className="fw-bold me-3 my-1 ">Checkout </h6>
                            
                            <div  className=" my-3 col-sm-10 col-md-10 col-lg-10">
                                <TextField                                    
                                    label="Full Name"
                                    value={userDetails?.name}
                                    onChange={handleName}
                                    error={UserErr.name}
                                />
                                {UserErr.name && <span className="text-danger">Name field is required</span>}
                            </div>
                            
                            <div className="my-3 col-sm-10 col-md-10 col-lg-10">
                                <TextField 
                                    label="Address"
                                    value={userDetails?.address}
                                    onChange={handleAddress}
                                    error={UserErr.address}
                                />
                                {UserErr.address && <span className="text-danger">Address field is required</span>} 
                            </div>
                            <div className="my-3 col-sm-10 col-md-10 col-lg-10 d-flex">
                                <div className="w-100 mx-1">
                                    <TextField 
                                        label="City"
                                        value={userDetails?.city}
                                        onChange={handleCity}
                                        error={UserErr.city}
                                    />
                                    {UserErr.city && <span className="text-danger">City field is required</span>}
                                </div>
                                <div className="w-100 mx-1">
                                    <TextField 
                                        label="Postal code"
                                        value={userDetails?.pincode}
                                        onChange={handlePincode}
                                        error={UserErr.pincode}
                                    />
                                    {UserErr.pincode && <span className="text-danger">Postal Code field is required</span>}
                                </div>                                
                            </div>
                            <div className="my-3 col-sm-10 col-md-10 col-lg-10">
                                <TextField 
                                    label="Phone No"
                                    value={userDetails?.phone}
                                    onChange={handlePhone}
                                    error={UserErr.phone}
                                />
                                {UserErr.phone && <span className="text-danger">Phone field is required</span>}
                            </div>
                            <QuantityCounter qty={qty} setQty={setQty} />
                        </div>
                        }
                    </div>
                </div>
            </ModalComponent>
            <div className="w-100 h-100 bg-ancent ">
                <nav className="w-100" style={{height:70}}>
                    <div className="w-100 h-100 p-3 d-flex">
                        <div className=" ms-2 ng-info" style={{width:50}}>
                            <img  className='logo' src={Logo} alt="Logo" />
                        </div>
                        <div className="" style={{width:`calc(100% - 50px)`}}>
                            <div className="me-5 ">
                                <Input size="large" 

                                    className="custom-input "
                                    placeholder="Search Name"
                                    value={search} 
                                    onChange={HandleSearch}
                                    prefix={<SearchOutlined className="me-2 text-primary"/>}                           
                                />
                            </div>
                        </div>
                    </div>
                    
                </nav>
                <div className=" p-3 w-100 overflow-y" style={{height:`calc(100% - 70px)`}}>
                    <div className='w-100 px-4 banner' >
                    <img  className='w-100 banner '  src={banner} alt="banner" />
                    </div>
                    <div ref={items} className=" row w-100 content px-4" style={{height:'calc(100% - 300px)'}}>
                        {isLoading?
                        <div className="mt-5 mx-auto spinner-border"></div>
                        :
                        filterMeals?.length &&
                            filterMeals.map((item,ind) => (
                                <div key={ind} className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-2 p-3 hover-p"  >
                                    <ItemCard 
                                        id={item.idMeal}
                                        title={item.strMeal}
                                        imgUrl={item.strMealThumb}
                                        descp={item.strInstructions}
                                        onClick={HandleItemClick}
                                    />
                                </div>
                            ))
                        }                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Home);