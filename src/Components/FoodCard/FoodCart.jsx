const FoodCart = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p className='absolute right-0 mr-2 mt-4 px-4 py-2 bg-slate-900 text-white rounded-l'>
        ${price}
      </p>
      <div className='card-body flex flex-col items-center'>
        <h2 className='card-title'>{name}</h2>
        <p>{recipe}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-outline border-0 border-b-4 mt-4 bg-slate-50 border-yellow-600 text-yellow-600'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
