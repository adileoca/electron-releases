import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const useOrders = () => {
  const auth0 = useAuth0();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const token = await auth0.getAccessTokenSilently();
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/orders/`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  }, [auth0]);

  return { orders, selectedOrder, setSelectedOrder, fetchOrders };
};

export default useOrders;
