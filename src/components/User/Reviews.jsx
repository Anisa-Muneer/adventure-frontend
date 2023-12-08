import { Avatar, Button, Card, Rating, Spinner, Typography } from '@material-tailwind/react'
import Review from './Review'
import { useQuery } from '@tanstack/react-query'
import { getReview } from '../../api/userApi'
import dp from '../../assets/images/dp.png'



const Reviews = ({id}) => {
    const {isLoading,error,data} = useQuery({
        queryKey :["review"],
        queryFn : () => getReview(id).then((res) => res.data)
    })
console.log(data,'review data is here');
    if(isLoading){ 
       return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
       return <Typography>soththing went wrong</Typography>
    }
  
    return (
        <>
           
                <div className="    rounded-md    p-2 h-[450px] ">
                <Card className='p-3 rounded-md h-96 '>
                    <Typography variant='h4' className=' m-3'>Reviews</Typography>
                    <div className="grid grid-cols-3 my-3">
                        <div className='flex justify-center mx-3'>
                            <div className='flex items-baseline'>
                                <Typography variant='h2'className='text-[#023E8A] me-2'> {data.count}</Typography>
                                <Typography className=''>Reviews </Typography>
                            </div>
                        </div>
                        <div className='flex justify-center mx-3'>
                            <div className='flex items-baseline'>
                                <Typography variant='h2' className='me-2 '>{data.avgRating}</Typography>
                                <Rating value={Math.round(data.avgRating)}  readonly />
                            </div>
                        </div>
                        
                        <div className='flex justify-center mx-3'>
                            <div className='flex flex-col items-center'>
                                <Typography variant=''>write a review here</Typography>
                                
                                
                                <Review id={id}/>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-scroll">
                   
                    {data.data ? 
                        data.data.map((review,index) => (
                   
                        <div className="flex flex-col justify-between  " key={index}>

                        <div className="grid grid-cols-[2fr,3fr] my-3 mx-16">
                            <div className=" flex items-center ">
                                <Avatar src={review.user.image ? review.user.image : dp} alt="avatar" />
                                <Typography className='ms-3'>{review.user.name}</Typography>
                            </div>
                            <div className="">
                            <Rating value={review.rating} readonly className='h-3'/>
                                <Typography className='italic'> {review.reviewText} </Typography>
                            </div>
                        </div>
                        <hr/>
                    </div> 
                     )):(
                        <Typography>ddddd</Typography>
                     )
                    }
                    
</div>
                </Card>
            </div>
            
        
        </>
    )
}

export default Reviews
