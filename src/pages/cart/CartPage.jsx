import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {  Button, TableHead } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../features/slices/cartSlice';
import './CartPage.css'




const CartPage = () => {
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  let sum = items.reduce((prev, item) => prev + item.price * item.quantity, 0)

  return (
    <>
    <TableContainer component={Paper}>
      <Table className='table' aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>Фото</TableCell>
            <TableCell align="right">Название</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Рейтинг</TableCell>
            <TableCell align="right">Количество</TableCell>
          </TableRow>
        </TableHead>
       
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="item">
                {item.title}
              </TableCell> */}
              

              <img src={item.image} alt="error" style={{width: '40px', marginLeft: '15px'}} />
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.rating.rate}</TableCell>
              <TableCell align="right">

                <div>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                  <span>  {item.quantity}  </span>
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                </div>
               
              </TableCell>
              <TableCell align="right"><DeleteIcon color= 'error' 
              style={{cursor: 'pointer'}} 
              onClick={() => dispatch(removeFromCart(item.id))}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {
      items.length > 0 && 
      <div className='table__deleteCart'>
        <p> Общая сумма: 
          <span>{Math.ceil(sum)} </span>сом
        </p>
      <Button variant="outlined" 
      color='error' 
      startIcon={<DeleteIcon color='error'/>} 
      onClick={() => dispatch(clearCart())}>
         Очистить корзину
      </Button>
    </div>
    }
    </>
  )
}

export default CartPage