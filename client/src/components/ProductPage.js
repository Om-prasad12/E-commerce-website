import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}prod/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
     
  }, [id]);

  useEffect(() => {
    console.log("Product data:", product);
  }, [product]);

  return (
    <div className="p-4">
      {product ? (
        <>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2">{product.description}</p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductPage;
