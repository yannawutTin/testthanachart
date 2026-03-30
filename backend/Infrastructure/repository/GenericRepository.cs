using System;
using System.Linq.Expressions;
using Domain.interfaces.repository;
using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.repository;

public class GenericRepository<T> : IgenericRepository<T> where T : class
{

  private readonly StockContext _context;
  private readonly DbSet<T> _dbSet;

  public GenericRepository(StockContext context)
  {
    _context = context;
    _dbSet = context.Set<T>();
  }


  public async Task<int> CountAsync()
  {
    return await _dbSet.CountAsync();
  }

  public async Task<int> DeleteAsync(T entity)
  {
    _dbSet.Remove(entity);
    return await _context.SaveChangesAsync();
  }

  public async Task<int> DeleteAsync(int id)
  {
    var entity = await _dbSet.FindAsync(id);
    if (entity != null)
    {
      _dbSet.Remove(entity);
      return await _context.SaveChangesAsync();
    }
    return 0;
  }

  public async Task<bool> ExistAsync(int id)
  {
    return await _dbSet.FindAsync(id) != null;
  }


  public virtual async Task<List<T>> GetAllAsync(bool tracked = true)
  {
    IQueryable<T> query = _dbSet;

    if (!tracked)
    {
      query = query.AsNoTracking();
    }

    return await query.ToListAsync();
  }


  public async Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> predicate)
  {
    return await _dbSet.Where(predicate).ToListAsync();
  }

  public async Task<T> GetByIdAsync(int id)
  {
    return await _dbSet.FindAsync(id);
  }

  public async Task<int> InsertAsync(T entity)
  {
    await _dbSet.AddAsync(entity);
    return await _context.SaveChangesAsync();
  }

  public async Task<int> UpdateAsync(T entity)
  {
    _dbSet.Update(entity);
    return await _context.SaveChangesAsync();
  }

}
