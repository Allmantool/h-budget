﻿using HomeBudget.Core.Services;
using HomeBudget.Core.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace HomeBudget.Core.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterCoreIoCDependency(this IServiceCollection services)
        {
            return services
                .AddScoped<IRedisCacheService, RedisCacheService>();
        }
    }
}