import Geo from "./Geo";

// Mockup GoogleMaps LatLngBounds
class LatLngBounds {
  extend() {}

  getNorthEast() {
    return {
      lat: () => 3,
      lng: () => 3
    };
  }

  getSouthWest() {
    return {
      lat: () => 1,
      lng: () => 1
    };
  }
}
window.google = { maps: { LatLngBounds } };

describe("Geo", () => {
  describe("getBounds", () => {
    it("getBounds", () => {
      const locations = [
        { latitude: 2, longitude: 2 },
        { latitude: 3, longitude: 3 }
      ];
      const bounds = Geo.getBounds(locations);
      expect(bounds).toEqual({
        center: { lat: 2.000304779914541, lng: 2 },
        zoom: 9
      });
    });
  });
  
  describe("calculateDistance", () => {
    it("calculate distance", () => {
      const distance = Geo.calculateDistance(1, 1, 2, 2, "K");
      expect(distance).toBe(157.2178677858709);
    });
  });

  describe("getClosestLocation", () => {
    it("get closest location", () => {
      const locations = [
        { latitude: 2, longitude: 2 },
        { latitude: 3, longitude: 3 }
      ];
      const position = { lat: 1, lng: 1 };
      const closest = Geo.getClosestLocation(position, locations);
      expect(closest).toEqual({
        distance: 157.2178677858709,
        latitude: 2,
        longitude: 2
      });
    });
  });
});
