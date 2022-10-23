namespace Server.Model
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int OrderLine { get; set; }
        public decimal Price { get; set; }
        public decimal TaxAmount { get; set; }
        public Order? Order { get; set; }
        public Product? Product { get; set; }   
    }
}
