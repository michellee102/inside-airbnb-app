namespace insideairbnb_api.Interfaces
{
    public interface ISortStrategyFactory
    {
        ISortStrategy GetSortStrategy(string sortType);
    }
}
