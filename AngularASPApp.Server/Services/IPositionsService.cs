using AngularASPApp.Server.Models;

namespace AngularASPApp.Server.Services
{
    public interface IPositionsService
    {
        Task<IEnumerable<Models.Position>> GetPositionsList();
    }
}