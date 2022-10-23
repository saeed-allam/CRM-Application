namespace Server.ViewModel
{
    public class CustomerViewModel
    {
        public int? CustomerId { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public bool IsActive { get; set; }
    }
}
