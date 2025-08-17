import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Checkout = ({info, price, setInfo, setCount, setPrice}) => {

  const location = useLocation()

  // ---------- RHF Setup ----------
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    mode: "onChange"
  });

  // ---------- Submit Function ----------
  const onSubmit = (data) => {

    // Reset All infos
    setInfo([]);
    setCount(0);
    setPrice(0);
    localStorage.clear();
    reset(); // ريست لكل القيم

    alert("Checkout complete!");
    location.pathname = '/'
  };

  return (
    <>
      <div className='checkinfo'>
        {info.map(product => (
          <div key={product.id} className="checkout-item" style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
        <h2 className="text-xl font-semibold">Total: ${price.toFixed(2)}</h2>
      </div>

      <div className="checkform">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <input 
            {...register("FirstName", { required: "First Name is required" })} 
            placeholder="First Name" 
          />
          {errors.FirstName && <small>{errors.FirstName.message}</small>}

          <input 
            {...register("LastName", { required: "Last Name is required" })} 
            placeholder="Last Name" 
          />
          {errors.LastName && <small>{errors.LastName.message}</small>}

          <input 
            {...register("PhoneNumber", { 
              required: "Phone Number is required",
              pattern: {
                value: /^\+\d+$/,
                message: "Phone number must start with + and contain only digits"
              }
            })} 
            placeholder="Phone Number" 
          />
          {errors.PhoneNumber && <small>{errors.PhoneNumber.message}</small>}

          <input 
            {...register("City", { required: "City is required" })} 
            placeholder="City" 
          />
          {errors.City && <small>{errors.City.message}</small>}

          <input 
            {...register("Address", { required: "Address is required" })} 
            placeholder="Address" 
          />
          {errors.Address && <small>{errors.Address.message}</small>}

          <input 
            {...register("EmailAddress", { 
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })} 
            placeholder="Email Address" 
          />
          {errors.EmailAddress && <small>{errors.EmailAddress.message}</small>}

          <input 
            {...register("Password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })} 
            type="password" 
            placeholder="Password" 
          />
          {errors.Password && <small>{errors.Password.message}</small>}

          <br/><button type="submit">Check out</button>
          <Link to="/cart"><button className='back'>Back to cart</button></Link>
        </form>
      </div>
    </>
  );
}

export default Checkout;
