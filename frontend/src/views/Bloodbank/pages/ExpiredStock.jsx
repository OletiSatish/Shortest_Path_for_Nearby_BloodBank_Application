import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ExpiredStock = () => {
  const expiredStock = [
    { type: "A+", units: 5, expiryDate: "2024-10-01" },
    { type: "O-", units: 3, expiryDate: "2024-09-20" },
  ];

  const theme = useTheme();

  // Function to check if the stock is expired
  const isExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Expired Blood Stock
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default }}>
        <Table sx={{ minWidth: 650 }} aria-label="expired blood stock table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Blood Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Units</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Expiry Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expiredStock.map((stock, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: isExpired(stock.expiryDate)
                    ? theme.palette.error.light  // Light red for expired items
                    : theme.palette.background.paper,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell sx={{ color: theme.palette.text.primary }}>{stock.type}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{stock.units}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{stock.expiryDate}</TableCell>
                <TableCell>
                  <Chip
                    label={isExpired(stock.expiryDate) ? "Expired" : "Valid"}
                    color={isExpired(stock.expiryDate) ? "error" : "success"}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.getContrastText(isExpired(stock.expiryDate) ? theme.palette.error.main : theme.palette.success.main),
                      borderColor: isExpired(stock.expiryDate) ? theme.palette.error.main : theme.palette.success.main,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExpiredStock;
