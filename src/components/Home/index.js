import { Component } from "react";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import RestaurantCard from "../RestaurantCard";

class Home extends Component{

    constructor(){
        super()
        this.state={isLoading:true , restaurantsList:[] , totalPages:0  , sortOrder: 'Lowest'}
    }

componentDidMount(){
    this.fetchRestaurants()
}

fetchRestaurants = async ()=>{
    const {sortOrder} = this.state
    const token = JSON.parse(Cookies.get('auth_token'))
   console.log(`came to fetch ${sortOrder}`)
    const url=`https://apis.ccbp.in/restaurants-list?offset=${0}&limit=${9}&sort_by_rating=${sortOrder}`
    const options = {
        method:'get',
        headers:{
            
            'Authorization':`Bearer ${token}`
        },
        
    }


    try{
    const response = await fetch(url , options)
    const parsedData = await response.json()
    let restaurantsList = parsedData['restaurants']
        restaurantsList = restaurantsList.map((item)=>({
            costForTwo          :   item.cost_for_two,
            cuisine             :   item.cuisine,
            groupByTime         :   item.group_by_time,
            hasOnlineDelivery   :   item.has_online_delivery,
            hasTableBooking     :   item.has_table_booking,
            id                  :   item.id,
            imageUrl            :   item.image_url,
            isDeliveringNow     :   item.is_delivering_now,
            location            :   item.location,
            menyType            :   item.men_type,
            name                :   item.name,
            opensAt             :   item.opens_at,
            userRating          :   {

                    rating      :item.user_rating.rating,
                    ratingColor : item.user_rating.rating_color,
                    totalReviews : item.user_rating.total_reviews 
            }
        }))
    this.setState({isLoading:false , restaurantsList})
   
    }
    catch(e){
        console.log('error in geting Restaurants list')
        console.log(e)
    }
}

changeSortOrder =async (e)=>{
    await this.setState({sortOrder:e.target.value})
    this.fetchRestaurants()
    
}

    render(){
        const {isLoading , restaurantsList , sortOrder} = this.state
        
        if(isLoading){
            return <TailSpin color={'blue'} />
         }
            return <div>
                <h1>Offers</h1>
                <div>
                    <h2>Popular Restaurants</h2>
                    <p>Select your favourite restaurant special dish and make your day happy...</p>

                    <p>Sort by </p>
                    <select value={sortOrder} onChange={this.changeSortOrder}>
                        <option value={'Highest'}>Highest</option>
                        <option value={'Lowest'}>Lowest</option>
                    </select>
                    <hr/>
                    <ul>
                        {
                            restaurantsList.map((item)=><RestaurantCard key={item.id}  details={item} />)
                        }
                    </ul>
                    <div>
                        <button type='buuton'>{'<'}</button>
                        {1} of {20}
                        <button type='button'>{'>'}</button>
                    </div>
                </div>
            </div>
    }

}

export default Home

