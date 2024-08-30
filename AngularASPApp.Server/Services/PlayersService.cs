using AngularASPApp.Server.Data;
using AngularASPApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularASPApp.Server.Services
{
    public class PlayerService(TeamDbContext context) : IPlayerService
    {
        private readonly TeamDbContext _context = context;

        public async Task<IEnumerable<Player>> GetPlayersList()
        {
            return await _context.Players
                .Include(x => x.Position)
                .ToListAsync();
        }

        public async Task<Player> GetPlayerById(int id)
        {
            return await _context.Players
                .Include(x => x.Position)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Player> CreatePlayer(Player player)
        {
            var lastPlayer = _context.Players.OrderByDescending(p => p.Id).FirstOrDefault();
            int newId = (lastPlayer != null) ? lastPlayer.Id + 1 : 1;

            var newPlayer = new Player
            {
                Id = newId,
                ShirtNo = player.ShirtNo,
                Name = player.Name,
                PositionId = player.PositionId,
                Appearances = player.Appearances,
                Goals = player.Goals,
                Position = player.Position,
            };

            _context.Players.Add(newPlayer);
            await _context.SaveChangesAsync();
            return newPlayer;
        }

        public async Task UpdatePlayer(Player player)
        {
            _context.Players.Update(player);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayer(Player player)
        {
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
        }
    }
}