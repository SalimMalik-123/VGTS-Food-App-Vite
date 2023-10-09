import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
interface Props{
  id:string
  title: string
  imgUrl: string
  descp : string
  onClick: (id:string) => void
}
const ItemCard  = (props:Props) => {
  const {id,title,imgUrl,descp,onClick} = props
  return(
  <Card
    hoverable
    className='w-100 bg-light hover-box-shadow'
    
    style={{height:'300px',fontFamily:'inherit',color:'inherit'}}
    cover={<img alt={title}  style={{height:'200px'}} className='p-2 w-100 rounded-4' src={imgUrl} />}
    onClick={() => onClick(id)}
  >
    <Meta       
      title={title} 
      description={`${descp.slice(0,20)}...`}  />
  </Card>
);
  }
export default ItemCard;