import CheckIosMarketplaceModule from "./src/CheckIosMarketplaceModule";

export enum MarketplaceSource {
	AppStore = "App Store",
	TestFlight = "TestFlight",
	Marketplace = "Alternative marketplace",
	Web = "Website",
	Other = "Other",
	Unknown = "Unknown",
	Error = "Error",
	Unavailable = "Unavailable"
}

interface CheckIosMarketplaceModule {
	getCurrentMarketplaceAsync(): Promise<MarketplaceSource>;
}

export async function getCurrentMarketplaceAsync(): Promise<MarketplaceSource> {
	return (
		CheckIosMarketplaceModule as CheckIosMarketplaceModule
	).getCurrentMarketplaceAsync();
}
