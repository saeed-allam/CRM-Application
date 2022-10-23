using Microsoft.EntityFrameworkCore;
using Server.Model;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            this.ChangeTracker.LazyLoadingEnabled = false;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().HasMany(u => u.OrderItem).WithOne(u => u.Order).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Order>().HasIndex(p => new { p.CustomerId }).IsUnique();
            modelBuilder.Entity<OrderItem>().HasIndex(p => new { p.ProductId }).IsUnique();
        }
        public DbSet<Customer> Customers { get; set; }
        public  DbSet<Product> Products { get; set; }
        public  DbSet<Order> Orders { get; set; }
        public  DbSet<OrderItem> OrderItems { get; set; }

    }
}
