using AngularASPApp.Server.Models;
using AngularASPApp.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularASPApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionsController(IPositionsService _positionsService) : ControllerBase
    {
        // GET: api/Positions
        [HttpGet]
        public async Task<IEnumerable<Position>> GetAll()
        {
            return await _positionsService.GetPositionsList();
        }
    }
}
