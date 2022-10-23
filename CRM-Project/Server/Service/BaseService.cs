using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Linq.Expressions;

namespace Server.Service
{
    public interface IBaseService<T1,T2>
    {
        List<T2> GetAll();
        T2? Insert(T2 model, out List<string> errorList);
    }
    public class BaseService<T1,T2>: IBaseService<T1,T2> where T1 : class where T2 : class
    {
        public readonly DataContext db;
        public readonly IMapper Mapper;

        public DbSet<T1> dbSet;
        public string pk;
        public List<string> skipedProperty;
        public BaseService(DataContext context, IMapper mapper)
          {
           db = context;
           Mapper = mapper;
            dbSet = db.Set<T1>();
            pk = typeof(T1).Name + "Id";
            skipedProperty = new List<string> { pk};
        }

        public int GetPKValue(T2 model)
            => int.Parse(BaseService<T1, T2>.GetPropertyValue(model, pk)?.ToString());

        public static object? GetPropertyValue(T2 model, string name)
            => model.GetType()?.GetProperty(name)?.GetValue(model);

        public virtual List<T2> GetAll()
            => Mapper.Map<List<T2>>(dbSet.ToList());

        public virtual T2? Insert(T2 model, out List<string> errorList)
        {
            errorList = new List<string>();
            try
            {
                T1 data = Mapper.Map<T1>(model);
                dbSet.Add(data);
                db.SaveChanges();
                model = Mapper.Map<T2>(data);
                return model;
            }
            catch (Exception ex)
            {
                errorList.Add(ex.Message);
                return null;
            }
        }

        public virtual T1? Edit(T2 model,T1 data)
        {
            var properties = model.GetType().GetProperties();
            foreach (var item in properties)
            {
                string propertyName = item.Name;
                var newValue = model.GetType()?.GetProperty(propertyName)?.GetValue(model);
                data.GetType()?.GetProperty(propertyName)?.SetValue(data, newValue);
            }
            db.SaveChanges();
            return data;
        }

    }
}
