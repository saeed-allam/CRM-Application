using Microsoft.AspNetCore.Mvc;
using Server.Model;
using Server.Service;
using Server.ViewModel;

namespace Server.Controllers
{
    public class ProductController : ApiBaseController<Product, ProductViewModel, IProductService>
    {
        public ProductController(IProductService service)
        {
            ser = service;
        }
        [HttpGet]
        [Route("{id}")]
        public virtual IActionResult GetById(int id)
        {
            var obj = ser.GetById(id);
            return obj == null ? BadRequest() : Ok(obj);
        }
        [HttpPut]
        public virtual IActionResult Edit(ProductViewModel model)
        {
            var obj = ser.Edit(model, out List<string> errorList);
            if (obj == null) return BadRequest(errorList);
            return Ok(obj);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual IActionResult Delete(int id)
            => ser.Delete(id) ? Ok() : BadRequest();
    }
}
