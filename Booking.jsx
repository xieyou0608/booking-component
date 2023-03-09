import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SeatService from "../../services/seat.service";
import { bookTickets, clearAPI } from "../../store/user-actions";

import { Button, CircularProgress, styled } from "@mui/material";
import PriceSigns from "./PriceSigns";
import Auditorium from "./Auditorium";
import BookingInfo from "./BookingInfo";

const BookingLayout = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5vh 0;
`;

const ConfirmBox = styled("div")`
  margin-top: 5vh;
  display: flex;
  column-gap: 3vw;
`;

const ConfirmButton = styled(Button)`
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;

const Booking = () => {
  const bookingApi = useSelector((state) => state.user.bookingApi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);

  const loadSeatsData = async () => {
    try {
      const res = await SeatService.getAllSeats();
      setSeatsData([...res.data]);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearChosenHandler = () => {
    setChosenSeats([]);
  };

  const submitHandler = () => {
    if (window.confirm("確定劃位")) {
      dispatch(bookTickets(chosenSeats));
    }
  };

  useEffect(() => {
    loadSeatsData();
  }, []);

  useEffect(() => {
    if (bookingApi.success) {
      window.alert("劃位成功!");
      dispatch(clearAPI("bookingApi"));
      navigate("/pay");
    }
    if (bookingApi.fail) {
      window.alert(bookingApi.errorMsg);
      setChosenSeats([]);
      loadSeatsData();
    }
  }, [bookingApi]);

  return (
    <BookingLayout>
      <h1>座位區</h1>
      <PriceSigns />

      {!seatsData && <CircularProgress size={100} sx={{ my: 10 }} />}
      {seatsData && (
        <Auditorium
          seatsData={seatsData}
          setSeatsData={setSeatsData}
          chosenSeats={chosenSeats}
          setChosenSeats={setChosenSeats}
        />
      )}

      <BookingInfo
        chosenSeats={chosenSeats}
        clearChosenHandler={clearChosenHandler}
      />

      {chosenSeats.length ? (
        <ConfirmBox>
          <ConfirmButton
            variant="contained"
            size="large"
            color="error"
            onClick={submitHandler}
          >
            確定劃位
          </ConfirmButton>
          <ConfirmButton
            variant="contained"
            size="large"
            onClick={clearChosenHandler}
          >
            清空座位
          </ConfirmButton>
        </ConfirmBox>
      ) : (
        <ConfirmBox>
          <p>請選擇至少一個位子</p>
        </ConfirmBox>
      )}
    </BookingLayout>
  );
};

export { BookingLayout };

export default Booking;
