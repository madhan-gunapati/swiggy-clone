const RestaurantCard = (props)=>{
    const {imageUrl , name , cuisine , userRating} = props.details
    const {rating , totalReviews} = userRating
    return <li>
        <img width={50} height={50} src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{cuisine}</p>
        <p>{rating}</p>
        <p>({totalReviews} ratings)</p>
    </li>
}

export default RestaurantCard