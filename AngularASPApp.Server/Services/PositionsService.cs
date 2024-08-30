using AngularASPApp.Server.Data;
using AngularASPApp.Server.Models;
using AngularASPApp.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace AngularASPApp.Server.Services
{
    public class PositionsService : IPositionsService
    {
        private readonly TeamDbContext _context;

        public PositionsService(TeamDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsList()
        {
            return await _context.Positions
                .OrderBy(x => x.DisplayOrder)
                .ToListAsync();
        }
    }
}