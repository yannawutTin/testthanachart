using System;
using System.Linq.Expressions;

namespace Domain.interfaces.repository;

public interface IgenericRepository<T> where T : class
{


  Task<List<T>> GetAllAsync(bool tracked = true);

  Task<T> GetByIdAsync(int id);
  Task<int> InsertAsync(T entity);
  Task<int> UpdateAsync(T entity);
  Task<int> DeleteAsync(T entity);
  Task<int> DeleteAsync(int id);
  Task<int> CountAsync();
  Task<bool> ExistAsync(int id);
  Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> predicate);

}

