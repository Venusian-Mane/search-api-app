import APIFetch from "./Fetch";
// ive included the module that fetches data to test its functionality
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

// this test is to make sure somthing is fetched from the iTunes site
it("makes sure data is fetched", () => {
  fetch.mockResponseOnce(JSON.stringify({ wrapperType: "track" }));
  APIFetch().then((res) => {
    expect(res).toBe("track");
  });
});
