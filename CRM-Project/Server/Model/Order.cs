namespace Server.Model
{
    public class Order
    {
        public Order()
        {
            OrderItem = new HashSet<OrderItem>();
        }
        public int OrderId { get; set; }
        public string Status { get; set; }
        public DateTime date { get; set; }
        public int CustomerId { get; set; }
        public virtual ICollection<OrderItem> OrderItem { get; set; }
        public Customer? Customer { get; set; }
    }
}
