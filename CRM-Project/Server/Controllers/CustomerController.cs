using Microsoft.AspNetCore.Mvc;
using Server.Model;
using Server.Service;
using Server.ViewModel;

namespace Server.Controllers
{
    public class CustomerController : ApiBaseController<Customer, CustomerViewModel, ICustomerService>
    {
        public CustomerController(ICustomerService service)
        {
            ser = service;
        }

        [HttpGet]
        public IActionResult GetAllActive()
                 => Ok(ser.GetAllActive());
        [HttpGet]
        [Route("{id}")]
        public virtual IActionResult GetById(int id)
        {
            var obj = ser.GetById(id);
            return obj == null ? BadRequest() : Ok(obj);
        }
        [HttpPut]
        public virtual IActionResult Edit(CustomerViewModel model)
        {
            var obj = ser.Edit(model, out List<string> errorList);
            if (obj == null) return BadRequest(errorList);
            return Ok(obj);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual IActionResult Delete(int id)
            => ser.Delete(id) ? Ok() : BadRequest();
        [HttpDelete]
        [Route("{id}")]
        public virtual IActionResult Deactivate(int id)
        => ser.Deactivate(id) ? Ok() : BadRequest();
      
    }
}
