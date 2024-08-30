using AngularASPApp.Server.Models;
using AngularASPApp.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularASPApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayersController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<IEnumerable<Player>> GetAll()
        {
            return await _playerService.GetPlayersList();
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetById(int id)
        {
            var player = await _playerService.GetPlayerById(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // POST: api/Players
        [HttpPost]
        public async Task<ActionResult<Player>> Create(Player player)
        {
            await _playerService.CreatePlayer(player);

            return CreatedAtAction(nameof(GetById), new { id = player.Id}, player);
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest("Not a valid Player Id");
            }

            await _playerService.UpdatePlayer(player);

            return Ok(player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Not a valid Player Id");
            }

            var player = await _playerService.GetPlayerById(id);
            if (player == null)
            {
                return NotFound();
            }

            await _playerService.DeletePlayer(player);
            return Ok();
        }
    }
}
