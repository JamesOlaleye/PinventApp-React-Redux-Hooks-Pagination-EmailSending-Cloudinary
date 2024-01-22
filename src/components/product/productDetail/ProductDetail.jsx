import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import './ProductDetail.scss';
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from 'dompurify';

const ProductDetail = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  ); // this line of code brings 4 states at once from redux product state.

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className='--color-success'>In stock</span>;
    }
    return <span className='--color-danger'>Out of stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <div className='product-detail'>
        <h3 className='--mt'>Product Detail</h3>
        <Card cardClass='card'>
          {isLoading && <SpinnerImg />}
          {product && (
            <div className='detail'>
              <Card className='group'>
                {product?.image ? (
                  <img
                    src={product.image.filePath}
                    alt={product.image.fileName}
                  />
                ) : (
                  <p>No image set for this product</p>
                )}
              </Card>
              <h4>Product Availability: {stockStatus(product.quantity)}</h4>
              <hr />
              <h4>
                <span className='badge'>Name: </span> &nbsp; {product.name}
              </h4>
              <p>
                <b>&rarr; SKU: </b>
                {product.sku}
              </p>
              <p>
                <b>&rarr; Category: </b>
                {product.category}
              </p>
              <p>
                <b>&rarr; Price: </b>
                {'$'}
                {product.price}
              </p>
              <p>
                <b>&rarr; Quantity in stock: </b>
                {product.quantity}
              </p>
              <p>
                <b>&rarr; Total Value in stock: </b>
                {'$'}
                {product.price * product.quantity}
              </p>
              <hr />
              <p>
                <b>&rarr; Description: </b>
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></div>
              <hr />
              <code className='--color-dark'>
                Created on: {product.createdAt.toLocaleString('en-US')}
              </code>{' '}
              <br />
              <code className='--color-dark'>
                Last updated: {product.updatedAt.toLocaleString('en-US')}
              </code>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
