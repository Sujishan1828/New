import React, { Fragment, useEffect } from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productAction';
import Loader from '../Components/Navbar/Loader'
import { toast } from 'react-toastify';



// import { addToWishlist, removeFromWishlist } from '../slices/wishListsSlice';
import GoldHairWaxCarousel from './Navbar/GoldHairWaxCarousel ';
import { clearError } from '../slices/authSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [],loading ,error} = useSelector((state) => state.productsState);
  //const { wishlist = [] } = useSelector((state) => state.wishListsState);

  useEffect(() => {
    if(error){
      return toast.error(error,{
        position:'top-right',
        onOpen:()=>dispatch(clearError())
      })
    } 
    dispatch(getProducts(null));
  }, [dispatch,error]);

  // const isInWishlist = (productId) => {
  //   return wishlist.some(item => (item.product?._id || item._id) === productId);
  // };

  // const toggleWishlist = (e, product) => {
  //   e.stopPropagation();
  //   const inWishlist = isInWishlist(product._id);
  //   if (inWishlist) {
  //     dispatch(removeFromWishlist(product._id));
  //   } else {
  //     dispatch(addToWishlist(product));
  //   }
  // };

  const goToProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <Fragment>
      {loading? <Loader/>:
        <Fragment>
          <GoldHairWaxCarousel/>
          
          <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 px-6 py-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
              🛒 Search Products
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {products.map((product) => {
                // const inWishlist = isInWishlist(product._id);
                return (
                  <div
                    key={product._id}
                    onClick={() => goToProduct(product)}
                    className="relative cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-3 flex flex-col items-center"
                  >
                    {/* Wishlist Icon */}
                    <div
                      // onClick={(e) => toggleWishlist(e, product)}
                      className="absolute top-3 right-3 z-10 text-xl text-red-500 hover:scale-110 transition-transform"
                    >
                      {/* {inWishlist ? <AiFillHeart /> : <AiOutlineHeart />} */}
                      <AiOutlineHeart />
                    </div>

                    <img
                      src={product.images?.[0]?.url || product.images?.[0]?.image || product.images?.[0] || "/default.jpg"
                      }
                      alt={product.name}
                      className="w-full h-36 object-contain mb-3"
                    />

                    <h2 className="text-sm font-semibold text-center text-gray-700 mb-1">
                      {product.name}
                    </h2>

                    <p className="text-orange-600 text-sm font-bold">Rs.{product.price}</p>

                    <div className="flex items-center text-xs text-gray-600 space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const full = i < Math.floor(product.ratings);
                        const half =
                          i === Math.floor(product.ratings) && product.ratings % 1 >= 0.5;

                        return full ? (
                          <IoStar key={i} className="text-yellow-400" />
                        ) : half ? (
                          <IoStarHalf key={i} className="text-yellow-400" />
                        ) : (
                          <IoStarOutline key={i} className="text-gray-300" />
                        );
                      })}
                      <span className="ml-1">({product.numOfReviews})</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToProduct(product);
                      }}
                      className="mt-3 bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-orange-600 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default HomePage;
