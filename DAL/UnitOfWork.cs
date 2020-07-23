using Ecommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.DAL
{
    public class UnitOfWork : IDisposable
    {
        private DatabaseContext context;
        private GenericRepository<User> customerRepository;
        private GenericRepository<Product> productRepository;
        private GenericRepository<Order> orderRepository;
        private GenericRepository<OrderProduct> orderProductRepository;
   
        public UnitOfWork(DatabaseContext databaseContext)
        {
            context = databaseContext;

            
        }
        public GenericRepository<User> CustomertRepoitory
        {
            get
            {

                if (this.customerRepository == null)
                {
                    this.customerRepository = new GenericRepository<User>(context);
                }
                return customerRepository;
            }
        }

        public GenericRepository<Product> ProductRepository
        {
            get
            {

                if (this.productRepository == null)
                {
                    this.productRepository = new GenericRepository<Product>(context);
                }
                return productRepository;
            }
        }

        public GenericRepository<Order> OrderRepository
        {
            get
            {

                if (this.orderRepository == null)
                {
                    this.orderRepository = new GenericRepository<Order>(context);
                }
                return orderRepository;
            }
        }

        public GenericRepository<OrderProduct> OrderProductRepository
        {
            get
            {

                if (this.orderProductRepository == null)
                {
                    this.orderProductRepository = new GenericRepository<OrderProduct>(context);
                }
                return orderProductRepository;
            }
        }


        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
