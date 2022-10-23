using AutoMapper;
using Server.Data;
using Server.Model;
using Server.ViewModel;

namespace Server.Service
{
    public interface IOrderService : IBaseService<Order, OrderViewModel>
    {
        OrderViewModel? GetById(int id);
        OrderViewModel? Insert(OrderViewModel model, out List<string> errorList);
        OrderViewModel? Edit(OrderViewModel model, out List<string> errorList);
        bool Delete(int id);
    }
    public class OrderService : BaseService<Order, OrderViewModel>, IOrderService
    {

        public OrderService(DataContext db, IMapper mapper) : base(db, mapper) { }
        private bool GetById(int id, out Order? data)
        {
            data = db.Orders.FirstOrDefault(x => x.OrderId == (int)id);
            return data != null;
        }
        public virtual OrderViewModel? GetById(int id)
        {
            try
            {
                OrderViewModel doc = Mapper.Map<OrderViewModel>(db.Orders.FirstOrDefault(s => s.OrderId == id));
                if (doc == null) return null;
                doc.OrderItem = Mapper.Map<List<OrderItemViewModel>>(db.OrderItems.Where(s => s.OrderId == doc.OrderId).ToList());
                return doc;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public override OrderViewModel? Insert(OrderViewModel model, out List<string> errorList)
        {
            errorList = new();
            using var transaction = db.Database.BeginTransaction();
            try
            {
                Order order = Mapper.Map<Order>(model);
                if (model.OrderItem != null && model.OrderItem.Count > 0)
                    foreach (var item in model.OrderItem)
                    {
                        var obi = Mapper.Map<OrderItem>(item);
                        obi.OrderId = order.OrderId;
                        order.OrderItem.Add(obi);
                    }
                db.Orders.Add(order);
                db.SaveChanges();
                transaction.Commit();
                transaction.Dispose();
                return model;
            }
            catch (Exception ex)
            {
                errorList.Add(ex.Message);
                transaction.Rollback();
                transaction.Dispose();
                return null;
            }
        }

       public virtual OrderViewModel? Edit(OrderViewModel model, out List<string> errorList)
        {
            errorList = new();
            using var transaction = db.Database.BeginTransaction();
            try
            {
                int id = GetPKValue(model);
                if (!GetById(id, out Order? data)) return null;
                skipedProperty.AddRange(new List<string>() { "OrderItem", "OrderItem_Delete" });
                var order = base.Edit(model,data);
                if (model.OrderItem != null && model.OrderItem.Count > 0)
                    foreach (var item in model.OrderItem)
                    {
                        var obj = db.OrderItems
                            .FirstOrDefault(s => s.OrderId == order.OrderId && s.OrderItemId == item.OrderItemId);
                        if (obj == null)
                        {
                            obj = Mapper.Map<OrderItem>(item);
                            obj.OrderId = order.OrderId;
                            db.OrderItems.Add(obj);
                            db.SaveChanges();
                        }
                        else
                        {
                            obj.ProductId = item.ProductId;
                            obj.Quantity = item.Quantity;
                        }
                    }
                if (model.OrderItem_Delete != null && model.OrderItem_Delete.Count > 0)
                    foreach (var item in model.OrderItem_Delete)
                    {
                        var obj = db.OrderItems.FirstOrDefault(s => s.OrderId == order.OrderId && s.OrderItemId == item);
                        db.OrderItems.Remove(obj);
                    }

                db.SaveChanges();
                transaction.Commit();
                transaction.Dispose();
                return model;
            }
            catch (Exception ex)
            {
                errorList.Add(ex.Message);
                transaction.Rollback();
                transaction.Dispose();
                return null;
            }
        }

        public virtual bool Delete(int id)
        {
            using var transaction = db.Database.BeginTransaction();
            try
            {
                if (!GetById(id, out Order? data) || data == null) return false;

                var list = db.OrderItems.Where(s =>s.OrderId == id).ToList();
                db.OrderItems.RemoveRange(list);

                db.Orders.Remove(data);
                db.SaveChanges();
                transaction.Commit();
                transaction.Dispose();
                return true;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                transaction.Dispose();
                return false;
            }
        }
    }
}

