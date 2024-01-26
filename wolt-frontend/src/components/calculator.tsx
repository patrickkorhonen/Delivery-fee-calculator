import React, { useState } from 'react'

const Calculator = () => {

  const [cartValue, setCartValue] = useState<number>(0)
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
  const [itemAmount, setItemAmount] = useState<number>(0)
  const [date, setDate] = useState<string>(new Date().toLocaleDateString("pt-br").split( '/' ).reverse( ).join( '-' ))
  const [time, setTime] = useState<string>(new Date().toTimeString().slice(0, 5))
  const [deliveryFee, setDeliveryFee] = useState<number>()

  console.log(cartValue)
  //Checks if it is friday and rush hour
  const checkRushHour = () => {
    if (new Date(date).toString().slice(0, 3) == "Fri" && 1500 <= Number(time.replace(':', '')) && Number(time.replace(':', '')) <= 1900) {
      return 1.2
    } else {
      return 1
    }
  }

  //Checks if cart value is under 10 euros
  const smallOrderSurcharge = () => {
    if (cartValue < 10) {
      const surcharge = 10 - cartValue
      return Number(surcharge.toFixed(2))
    } else {
      return 0
    }
  }

  //Calculates distance fee
  const distanceCharge = () => {
    if (deliveryDistance <= 1000) {
      return 2
    } else {
    const sum = (deliveryDistance - 1000) / 500
    return Math.ceil(sum) + 2
    }
  }

  //Calculates item amount fee 
  const itemAmountCharge = () => {
    if (itemAmount < 5) {
      return 0
    } else if (itemAmount >= 12) {
      const sumBulk = (itemAmount - 4) * 0.5 + 1.2
      return sumBulk
    } else {
      const sum = (itemAmount - 4) * 0.5
      return sum
    }
  }

  const calculate = () => {
    if (cartValue >= 200) {
      setDeliveryFee(0)
    } else {
      const fee = Number(((smallOrderSurcharge() + distanceCharge() + itemAmountCharge()) * checkRushHour()).toFixed(2))
      if (fee >= 15) {
        setDeliveryFee(15)
      } else {
        setDeliveryFee(Number(((smallOrderSurcharge() + distanceCharge() + itemAmountCharge()) * checkRushHour()).toFixed(2)))
      }
    }
  }

  return (
    <div className="sm:text-2xl text-sm font-inter shadow-2xl text-white rounded-3xl bg-sky-500">
      <div className="grid grid-cols-6  items-center sm:h-24 h-16 mt-6">
            <label htmlFor="cartValue" className="ml-6 col-span-3 drop-shadow-lg">
              Cart value
            </label>
            <input
              type="number"
              data-test-id="cartValue"
              id="cartValue"
              min="0"
              onChange={event => setCartValue(Number(event.target.value))}
              className="sm:h-16 h-12 border-2 col-span-2 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
            />
            <p className="text-center">€</p>
      </div>
      <div className="grid grid-cols-6 items-center sm:h-24 h-16">
            <label htmlFor="deliveryDistance" className="ml-6 col-span-3 drop-shadow-lg ">
              Delivery distance
            </label>
            <input
              type="number"
              id="deliveryDistance"
              min="0"
              onChange={event => setDeliveryDistance(Number(event.target.value))}
              className="sm:h-16 h-12 border-2 col-span-2 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
            />
            <p className="text-center">m</p>
      </div>
      <div className="grid grid-cols-6 items-center sm:h-24 h-16">
            <label htmlFor="NumberOfItems" className="text-left col-span-3 ml-6 drop-shadow-lg ">
              Number of items
            </label>
            <input
              type="number"
              id="NumberOfItems"
              min="0"
              onChange={event => setItemAmount(Number(event.target.value))}
              className="sm:h-16 h-12 border-2 col-span-2 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
            />
      </div>
      <div className="grid grid-cols-6 items-center sm:h-24 h-16">
            <label htmlFor="date" className="text-left ml-6 col-span-3 drop-shadow-lg ">
              Order Date
            </label>
            <input onChange={event => setDate(event.target.value)} className="sm:h-16 h-12 border-2 col-span-2 px-1 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700" type="date" id="date" defaultValue={date} />
      </div>
      <div className="grid grid-cols-6 items-center sm:h-24 h-16">
            <label htmlFor="time" className="text-left ml-6 col-span-3 drop-shadow-lg ">
              Order Time
            </label>
            <input onChange={event => setTime(event.target.value)} className="sm:h-16 h-12 border-2 col-span-2 px-1 rounded-3xl shadow-md pl-6 text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700" type="time" id="time" defaultValue={time} min="00:00" max="24:00"/>
      </div>
      {cartValue > 0 && deliveryDistance > 0 && itemAmount > 0 && date ? (
        <div className="flex justify-center mt-4 mb-4">
        <button onClick={() => calculate()} className="rounded-full w-full mx-10 px-20 py-6 shadow-xl drop-shadow-lg bg-sky-600 hover:bg-sky-700">Calculate</button>
      </div>
      ) : (
        <div className="flex justify-center mt-4 mb-4">
        <button className="rounded-full w-full mx-10 px-20 py-6 shadow-xl drop-shadow-lg text-gray-400 bg-gray-300">Calculate</button>
      </div>
      )}
      
      <div className="grid grid-cols-6  items-center h-24 mb-4">
            <p className="ml-6 col-span-3 drop-shadow-lg">
              Delivery price
            </p>
            <p className="sm:h-16 h-12 flex justify-center items-center border-2 col-span-2 rounded-3xl shadow-md bg-sky-500">{deliveryFee}</p>
            <p className="text-center">€</p>
      </div>
    </div>
  )
}

export default Calculator