using System.Threading.Tasks;

namespace HomeBudget.DataAccess.Interfaces
{
    public interface IBaseWriteRepository
    {
        Task<int> SaveAsync<T>(string sqlQuery, T parameters);
    }
}
