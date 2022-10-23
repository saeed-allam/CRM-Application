using AutoMapper;
using Server.Data;
using Server.Model;
using Server.ViewModel;

namespace Server.Service
{
    public interface ICustomerService:IBaseService<Customer, CustomerViewModel>
    {
        List<CustomerViewModel>? GetAllActive();
        CustomerViewModel? GetById(int id);
        bool Deactivate(int id);
        CustomerViewModel? Edit(CustomerViewModel model, out List<string> errorList);
        bool Delete(int id);
    }
    public class CustomerService: BaseService<Customer, CustomerViewModel>,ICustomerService
    {
        public CustomerService(DataContext db,IMapper mapper) : base(db, mapper) { }

        public virtual List<CustomerViewModel>? GetAllActive()
        {
            List<Customer>? data = db.Customers.Where(s => s.IsActive == true).ToList();
            if(data == null) return null;
            return Mapper.Map<List<CustomerViewModel>>(data);
        }
        public virtual bool Deactivate(int id)
        {
            var old = db.Customers.Where(s => s.CustomerId == id).FirstOrDefault();
            if (old == null) return false;
            if (old.IsActive) { old.IsActive = false; } else { old.IsActive = true; }
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool GetById(int id, out Customer? data)
        {
            data = db.Customers.FirstOrDefault(x => x.CustomerId == (int)id);
            return data != null;
        }
        public virtual CustomerViewModel? GetById(int id)
         => GetById(id, out Customer? data) ? Mapper.Map<CustomerViewModel>(data) : null;
        public virtual CustomerViewModel? Edit(CustomerViewModel model, out List<string> errorList)
        {
            errorList = new List<string>();
            try
            {
                int id = GetPKValue(model);
                if (!GetById(id, out Customer? data)) return null;
                Customer obj = Edit(model, data);
                return Mapper.Map<CustomerViewModel>(obj);
            }
            catch (Exception ex)
            {
                errorList.Add(ex.Message);
                return null;
            }
        }
        public virtual bool Delete(int id)
        {
            try
            {
                if (!GetById(id, out Customer data)) return false;
                dbSet.Remove(data);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
