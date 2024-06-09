using NBomber.CSharp;
using NBomber.Http;


public class Program
{
    public static void Main(string[] args)
    {
        using HttpClient httpClient = new();

        var scenario = Scenario.Create("NBomberLoadTester", async context =>
        {
            var response = await httpClient.GetAsync("https://localhost:7049/Listings/geoinfo");
            return response.IsSuccessStatusCode ? Response.Ok() : Response.Fail();
        })
            .WithoutWarmUp()
            .WithLoadSimulations(
                Simulation.RampingInject(
                    rate: 40,
                    interval: TimeSpan.FromSeconds(2),
                    during: TimeSpan.FromSeconds(30))
            );

        NBomberRunner
            .RegisterScenarios(scenario)
            .WithWorkerPlugins(new HttpMetricsPlugin(new[] { NBomber.Http.HttpVersion.Version1 }))
            .Run();
    }
}