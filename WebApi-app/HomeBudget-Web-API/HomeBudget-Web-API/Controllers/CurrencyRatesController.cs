﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HomeBudget.Components.CurrencyRates.Services.Interfaces;
using HomeBudget_Web_API.Models;
using Microsoft.AspNetCore.Mvc;
using CurrencyRate = HomeBudget.Components.CurrencyRates.Models.CurrencyRate;

namespace HomeBudget_Web_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyRatesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICurrencyRatesService _currencyRatesService;

        public CurrencyRatesController(
            IMapper mapper,
            ICurrencyRatesService currencyRatesService)
        {
            _mapper = mapper;
            _currencyRatesService = currencyRatesService;
        }

        [HttpPost]
        public async Task<int> SaveRatesAsync([FromBody] CurrencySaveRatesRequest saveRatesRequest)
        {
            var unifiedCurrencyRates = _mapper
                .Map<IReadOnlyCollection<CurrencyRate>>(saveRatesRequest.CurrencyRates);

            return await _currencyRatesService.SaveTodayRatesIfNotExistAsync(unifiedCurrencyRates);
        }

        [HttpGet]
        public async Task<IEnumerable<CurrencyRate>> GetRatesAsync()
        {
            var result = await _currencyRatesService.GetRatesAsync();
            return result;
        }
    }
}
