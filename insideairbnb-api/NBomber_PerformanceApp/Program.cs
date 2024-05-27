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
                    // Simulation.Inject(
                    //     rate: 50, // Reduce the initial load rate
                    //     interval: TimeSpan.FromSeconds(1),
                    //     during: TimeSpan.FromSeconds(5)), // Shorten the duration
                    // Simulation.RampingInject(
                    //     rate: 500, // Increase gradually
                    //     interval: TimeSpan.FromSeconds(1),
                    //     during: TimeSpan.FromSeconds(30)),
                    Simulation.RampingInject(
                        rate: 22, // Increase gradually
                        interval: TimeSpan.FromSeconds(1),
                        during: TimeSpan.FromSeconds(30))
                );

            NBomberRunner
                .RegisterScenarios(scenario)
                .WithWorkerPlugins(new HttpMetricsPlugin(new[] { NBomber.Http.HttpVersion.Version1 }))
                .Run();
        }
}