-- stored_procedures.sql
CREATE OR REPLACE FUNCTION calculate_total_sales(start_date DATE, end_date DATE)
RETURNS NUMERIC AS $$
DECLARE
  total_sales NUMERIC;
BEGIN
  SELECT SUM(total_amount) INTO total_sales
  FROM orders
  WHERE order_date BETWEEN start_date AND end_date;
  
  RETURN total_sales;
END;
$$ LANGUAGE plpgsql;
