using insideairbnb_api.Interfaces;

namespace insideairbnb_api.Factories
{
    public interface ISortStrategyFactory
    {
        ISortStrategy GetSortStrategy(string sortType);
    }
}
