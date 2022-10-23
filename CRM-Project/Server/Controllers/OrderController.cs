using Microsoft.AspNetCore.Mvc;
using Server.Model;
using Server.Service;
using Server.ViewModel;

namespace Server.Controllers
{
    public class OrderController : ApiBaseController<Order, OrderViewModel, IOrderService>
    {
        public OrderController(IOrderService service)
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
        public virtual IActionResult Edit(OrderViewModel model)
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