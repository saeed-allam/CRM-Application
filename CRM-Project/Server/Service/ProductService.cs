using AutoMapper;
using Server.Data;
using Server.Model;
using Server.ViewModel;

namespace Server.Service
{
    public interface IProductService  : IBaseService<Product, ProductViewModel>
    {
        ProductViewModel? GetById(int id);
        bool Delete(int id);
        ProductViewModel? Edit(ProductViewModel model, out List<string> errorList);
     }
    public class ProductService : BaseService<Product, ProductViewModel>, IProductService
    {
        public ProductService(DataContext db, IMapper mapper) : base(db, mapper) { }
        public bool GetById(int id, out Product? data)
        {
            data = db.Products.FirstOrDefault(x=>x.ProductId ==(int)id);
            return data != null;
        }
        public virtual ProductViewModel? GetById(int id)
         => GetById(id, out Product? data) ? Mapper.Map<ProductViewModel>(data) : null;
        public virtual ProductViewModel? Edit(ProductViewModel model, out List<string> errorList)
        {
            errorList = new List<string>();
            try
            {
                int id = GetPKValue(model);
                if (!GetById(id, out Product? data)) return null;
                Product obj = Edit(model,data);
                return Mapper.Map<ProductViewModel>(obj);
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
                if (!GetById(id, out Product data)) return false;
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
