import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button, TextField, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userOrders as userOrdersAction } from '../../actions/orderAction';

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userOrders } = useSelector(state => state.orderState);
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  useEffect(() => {
    if (!userOrders) return setFilteredOrders([]);

    const filtered = userOrders.filter(order => {
      const search = searchText.toLowerCase();
      const numOfItems = Array.isArray(order.orderItems)
        ? order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

      return (
        order._id.toLowerCase().includes(search) ||
        String(order.totalPrice).toLowerCase().includes(search) ||
        String(numOfItems).toLowerCase().includes(search) ||
        order.orderStatus.toLowerCase().includes(search)
      );
    });

    setFilteredOrders(filtered);
  }, [userOrders, searchText]);

  const getStatusColor = (status) => {
    if (status === 'Delivered') return 'success';
    if (status === 'Processing') return 'warning';
    if (status === 'Cancelled') return 'error';
    return 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          label="Search Orders"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Orders Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {filteredOrders.map(order => {
          const numOfItems = Array.isArray(order.orderItems)
            ? order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
            : 0;

          return (
            <Card key={order._id} sx={{ borderRadius: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  Order ID
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order._id}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  Number of Items
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {numOfItems}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  Amount (LKR)
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.totalPrice.toLocaleString()}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                  Status
                </Typography>
                <Chip
                  label={order.orderStatus}
                  color={getStatusColor(order.orderStatus)}
                  sx={{ fontWeight: 'bold' }}
                />
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default UserOrders;
