import { UnavailabilityError } from "expo-modules-core";

export default {
  isDevelopmentProvisioningProfile: () => {
    throw new UnavailabilityError(
      "CheckIosMarketplace",
      "getCurrentMarketplace",
    );
  },
};
