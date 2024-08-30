using AngularASPApp.Server.Models;

namespace AngularASPApp.Server.Services
{
    public interface IPlayerService
    {
        Task<IEnumerable<Models.Player>> GetPlayersList();
        Task<Models.Player> GetPlayerById(int id);
        Task<Models.Player> CreatePlayer(Models.Player player);
        Task UpdatePlayer(Models.Player player);
        Task DeletePlayer(Models.Player player);
    }
}