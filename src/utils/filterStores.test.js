import filterStores from "./filterStores";

describe("filterStores", () => {
  it("filter stores to remove invalid ones", () => {
    const stores = [
      {
        name: "valid store",
        stockAvailablility: true,
        latitude: "1",
        longitude: "2"
      },
      {
        name: "store without availability",
        stockAvailablility: false,
        latitude: "4.5",
        longitude: "5.4"
      },
      {
        name: "store with invalid longitude",
        stockAvailablility: true,
        latitude: "1.23",
        longitude: "01 45 73 48 29"
      }
    ];
    expect(filterStores(stores)).toMatchInlineSnapshot(`
Array [
  Object {
    "latitude": "1",
    "longitude": "2",
    "name": "valid store",
    "stockAvailablility": true,
  },
]
`);
  });
});
