import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString("pt-br").split("/").reverse().join("-")
  );
  const [time, setTime] = useState<string>(
    new Date().toTimeString().slice(0, 5)
  );
  const [deliveryFee, setDeliveryFee] = useState<number>();

  //When any input changes, previous delivery price is not shown anymore
  useEffect(() => {
    setDeliveryFee(undefined);
  }, [cartValue, deliveryDistance, itemAmount, date, time]);

  //Checks if it is friday and rush hour
  const checkRushHour = () => {
    if (
      new Date(date).toString().slice(0, 3) === "Fri" &&
      1500 <= Number(time.replace(":", "")) &&
      Number(time.replace(":", "")) <= 1900
    ) {
      return 1.2;
    } else {
      return 1;
    }
  };

  //Checks if cart value is under 10 euros
  const smallOrderSurcharge = () => {
    if (cartValue < 10) {
      const surcharge = 10 - cartValue;
      return Number(surcharge.toFixed(2));
    } else {
      return 0;
    }
  };

  //Calculates distance fee
  const distanceCharge = () => {
    if (deliveryDistance <= 1000) {
      return 2;
    } else {
      const sum = (deliveryDistance - 1000) / 500;
      return Math.ceil(sum) + 2;
    }
  };

  //Calculates item amount fee
  const itemAmountCharge = () => {
    if (itemAmount < 5) {
      return 0;
    } else if (itemAmount >= 12) {
      const sumBulk = (itemAmount - 4) * 0.5 + 1.2;
      return sumBulk;
    } else {
      const sum = (itemAmount - 4) * 0.5;
      return sum;
    }
  };

  //This handles the fee calculation and returns the final price
  const calculate = () => {
    if (cartValue >= 200) {
      setDeliveryFee(0);
    } else {
      const fee = Number(
        (
          (smallOrderSurcharge() + distanceCharge() + itemAmountCharge()) *
          checkRushHour()
        ).toFixed(2)
      );
      if (fee >= 15) {
        setDeliveryFee(15);
      } else {
        setDeliveryFee(
          Number(
            (
              (smallOrderSurcharge() + distanceCharge() + itemAmountCharge()) *
              checkRushHour()
            ).toFixed(2)
          )
        );
      }
    }
  };

  //I made responsive design with tailwind
  return (
    <div className="sm:text-xl 2xl:text-2xl text-sm font-inter shadow-2xl text-white rounded-3xl mb-8 xl:mb-0 bg-sky-500">
      <div className="grid grid-cols-8  items-center 2xl:h-24 h-16 mt-6">
        <label htmlFor="cartValue" className="ml-6 col-span-4 drop-shadow-lg">
          Cart value
        </label>
        <input
          type="number"
          step="0.01"
          data-test-id="cartValue"
          id="cartValue"
          min="0"
          onChange={(event) => setCartValue(Number(event.target.value))}
          className="2xl:h-16 h-12 border-2 col-span-3 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
        />
        <p className="text-center">€</p>
      </div>
      <div className="grid grid-cols-8 items-center 2xl:h-24 h-16">
        <label
          htmlFor="deliveryDistance"
          className="ml-6 col-span-4 drop-shadow-lg "
        >
          Delivery distance
        </label>
        <input
          type="number"
          data-test-id="deliveryDistance"
          id="deliveryDistance"
          min="0"
          onChange={(event) => setDeliveryDistance(Number(event.target.value))}
          className="2xl:h-16 h-12 border-2 col-span-3 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
        />
        <p className="text-center">m</p>
      </div>
      <div className="grid grid-cols-8 items-center 2xl:h-24 h-16">
        <label
          htmlFor="numberOfItems"
          className="text-left col-span-4 ml-6 drop-shadow-lg "
        >
          Number of items
        </label>
        <input
          type="number"
          data-test-id="numberOfItems"
          id="numberOfItems"
          min="0"
          onChange={(event) => setItemAmount(Number(event.target.value))}
          className="2xl:h-16 h-12 border-2 col-span-3 rounded-3xl shadow-md text-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
        />
      </div>
      <div className="grid grid-cols-8 items-center 2xl:h-24 h-16">
        <label
          htmlFor="orderTime"
          className="text-left ml-6 col-span-4 drop-shadow-lg "
        >
          Order Date & Time
        </label>
        <input
          onChange={(event) => {
            setDate(event.target.value.split("T")[0]);
            setTime(event.target.value.split("T")[1]);
          }}
          className="2xl:h-16 h-12 min-w-[8.3rem] text-xs sm:text-base min-[1800px]:text-2xl border-2 col-span-3 px-1 rounded-3xl shadow-md text-center flex items-center justify-center bg-sky-500 hover:bg-sky-400 invalid:border-red-700 invalid:text-red-700"
          type="datetime-local"
          data-test-id="orderTime"
          id="orderTime"
          defaultValue={date + "T" + time}
        />
      </div>
      {cartValue > 0 &&
      deliveryDistance > 0 &&
      deliveryDistance % 1 === 0 &&
      itemAmount > 0 &&
      itemAmount % 1 === 0 &&
      date ? (
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => calculate()}
            className="rounded-full w-full mx-10 px-20 py-4 2xl:py-6 shadow-xl drop-shadow-lg bg-sky-600 hover:bg-sky-700"
          >
            Calculate
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-4 mb-4">
          <button className="rounded-full w-full mx-10 px-20 py-4 2xl:py-6 shadow-xl drop-shadow-lg text-gray-400 bg-gray-300">
            Calculate
          </button>
        </div>
      )}
      <div className="grid grid-cols-8  items-center 2xl:h-24 mb-4">
        <p className="ml-6 col-span-4 drop-shadow-lg">Delivery price</p>
        <p
          data-test-id="fee"
          data-testid="fee"
          className="2xl:h-16 h-12 flex justify-center items-center border-2 col-span-3 rounded-3xl shadow-md bg-sky-500"
        >
          {deliveryFee}
        </p>
        <p className="text-center">€</p>
      </div>
    </div>
  );
};

export default Calculator;
