using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeBudget.Components.CurrencyRates.Models;
using HomeBudget.Components.CurrencyRates.Providers.Interfaces;
using HomeBudget.DataAccess.Interfaces;

namespace HomeBudget.Components.CurrencyRates.Providers
{
    public class CurrencyRatesReadProvider : ICurrencyRatesReadProvider
    {
        private readonly string _ratesAbbreviationPredicate;
        private readonly IBaseReadRepository _readRepository;

        public CurrencyRatesReadProvider(
            ConfigSettings configSettings,
            IBaseReadRepository readRepository)
        {
            var abbreviations = string.Join(',', configSettings.ActiveCurrencies.Select(abbr => $"'{abbr}'"));

            _readRepository = readRepository;
            _ratesAbbreviationPredicate = $"[Abbreviation] IN ({abbreviations})";
        }

        public Task<IReadOnlyCollection<CurrencyRate>> GetRatesAsync()
        {
            var query = "SELECT * " +
                        "FROM [CurrencyRates] " +
                        $"WHERE {_ratesAbbreviationPredicate};";

            return _readRepository.GetAsync<CurrencyRate>(
                query,
                new
                {
                    Today = DateTime.Now.ToShortDateString()
                });
        }

        public Task<IReadOnlyCollection<CurrencyRate>> GetTodayRatesAsync()
        {
            var query = "SELECT * " +
                        "FROM [CurrencyRates] " +
                        "WHERE [UpdateDate] = @Today " +
                        $"AND {_ratesAbbreviationPredicate};";

            return _readRepository.GetAsync<CurrencyRate>(
                query,
                new
                {
                    Today = DateTime.Now.ToShortDateString()
                });
        }
    }
}
