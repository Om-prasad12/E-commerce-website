import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TbTruck, TbRotateClockwise2 } from "react-icons/tb";
import { toast } from "react-toastify";
import Stars from "./HomePage/Stars";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hasColor, setHasColor] = useState(false);
  const [hasSize, setHasSize] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}prod/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data);
        setHasColor(data.hasColor ?? true);
        setHasSize(data.hasSize ?? false);
        setQuantity(data.minOrderQuantity || 1); // ✅ Set quantity to min
      })
      .catch((err) => console.error(err));
  }, [id]);

  const colors = [
    { name: "Black", color: "#000000" },
    { name: "Red", color: "#ef4444" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  // ✅ Respect min & max from model
  const incrementQuantity = () => {
    if (product && quantity < product.maxOrderQty) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.info("Maximum quantity reached");
    }
  };

  const decrementQuantity = () => {
    if (product && quantity > product.minOrderQty) {
      setQuantity((prev) => prev - 1);
    } else {
      toast.info("Minimum quantity is required");
    }
  };

  const handleWishlist = async (_id, userId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/wishlist`,
        {
          productId: _id,
          vendorId: userId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Product added to wishlist");
        setIsWishlisted((prev) => !prev);
      } else {
        toast.error(res.data.message || "Failed to add to wishlist");
      }
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg === "Product already in wishlist") {
        setIsWishlisted(true); // 🔴 Force red heart
      }
      toast.error(msg || "Failed to add to wishlist");
    }
  };

  const handleAddToCart = async (productId, vendorId) => {
    try {
       await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/cart`,
        {
          productId,
          vendorId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to cart");
      navigate("/cart");
    } catch (error) {
      // console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to add cart item");
    }
  };

  if (!product) {
    return (
      <div className="bg-[#f9f6f2] min-h-screen">
        <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
          <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 pt-10">
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f6f2]">
      <div className="max-w-[1530px] mx-auto bg-white xl:shadow-lg mt-28 px-4 sm:px-6">
        <div className="w-full sm:w-[90%] md:w-[95%] mx-auto py-4 pt-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Home</span>
            <span>/</span>
            <span>Product</span>
            <span>/</span>
            <span className="text-gray-800 truncate max-w-xs block">{product.title}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-4 m-auto">
              <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    <Stars ratings={product.ratings} />
                  </div>
                  <span className="text-sm text-gray-500">({product.numReviews})</span>
                  <span className="text-sm text-green-600 ml-2">In Stock</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {hasColor && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Colours:
                  </h3>
                  <div className="flex gap-3">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === index
                            ? "border-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color.color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {hasSize && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Size:</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                          selectedSize === size
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100"
                  >
                    <AiOutlineMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100"
                  >
                    <AiOutlinePlus className="w-4 h-4" />
                  </button>
                </div>

                <button className="flex-1 bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition-colors"
                  onClick={() => handleAddToCart(product._id, product.userId)}>
                  Buy Now
                </button>

                <button
                  onClick={() => handleWishlist(product._id, product.userId)}
                  className={`p-3 border rounded-md ${
                    isWishlisted
                      ? "text-red-500 border-red-500"
                      : "text-gray-400 border-gray-300"
                  } hover:text-red-500 hover:border-red-500 transition-colors`}
                >
                  {isWishlisted ? (
                    <AiFillHeart className="w-5 h-5" />
                  ) : (
                    <AiOutlineHeart className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Delivery Info */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <TbTruck className="w-6 h-6 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TbRotateClockwise2 className="w-6 h-6 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Return Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
