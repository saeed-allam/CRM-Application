namespace Server.ViewModel
{
    public class OrderItemViewModel
    {
        public int? OrderItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int OrderLine { get; set; }
        public decimal Price { get; set; }
        public decimal TaxAmount { get; set; }
    }
}
