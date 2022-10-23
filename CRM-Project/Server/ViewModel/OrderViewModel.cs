namespace Server.ViewModel
{
    public class OrderViewModel
    {
        public int? OrderId { get; set; }
        public string Status { get; set; }
        public DateTime date { get; set; }
        public int CustomerId { get; set; }
        public ICollection<OrderItemViewModel>? OrderItem { get; set; }
        public ICollection<int>? OrderItem_Delete { get; set; }
    }
}
