import GradeIcon from '@mui/icons-material/Grade';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../features/slices/productSlice';
import './DetailsProduct.css';
import { addCart } from '../../features/slices/cartSlice';

const DetailsProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { productById, loading, error } = useSelector((state) => state.products)
    const { items } = useSelector((state) => state.cart)
    console.log(items)
    

    useEffect(() => {
      dispatch(getProductById(id))
    }, [id])

    if (error) return <div>Продукты по ID не найдены!</div>
    

  return (
    <div className='details'>
        <img src={productById.image} alt='error'/>
       <div className='details__card'>

        <h2>{productById.title}</h2>
        <h3>Цена: <span >{productById.price}</span> сом</h3>
        <p>{productById.description}</p>
        <p>Категория: {productById.category} </p>

        <p className='rating'>
          <GradeIcon color= 'warning'/>
          {productById.rating?.rate}
        </p>
        <Button className='details__btn' variant="contained" endIcon={<ShoppingCartIcon />} 
        onClick={() => dispatch(addCart(productById))} >
          Добавить в корзину
        </Button>
       </div>
    </div>
  )
}

export default DetailsProduct