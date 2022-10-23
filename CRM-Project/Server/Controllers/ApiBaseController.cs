using Microsoft.AspNetCore.Mvc;
using Server.Service;

namespace Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ApiBaseController<T1,T2,T3> : ControllerBase

        where T1 : class
        where T2 : class
        where T3 : IBaseService<T1, T2>
    {
        public T3 ser;

        [HttpGet]
        public IActionResult GetAll()
               => Ok(ser.GetAll());
        [HttpPost]
        public virtual IActionResult Insert(T2 model)
        {
            var obj = ser.Insert(model, out List<string> errorList);
            if (obj == null) return BadRequest(errorList);
            return Ok(obj);
        }


    }
}
