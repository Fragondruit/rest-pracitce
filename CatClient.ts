class CatClient {
  private static readonly BASE_URL: string = "https://meowfacts.herokuapp.com";

  private static queryGet(numFetch?: number): Promise<Response> {
    return fetch(`${CatClient.BASE_URL}/?count=${numFetch ?? 1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  static getFact(): Promise<string> {
    return this.getBulkFacts(1).then((data) => data[0]);
  }

  static getBulkFacts(pageSize: number): Promise<string[]> {
    return this.queryGet(pageSize)
        .then((response) => response.json())
        .then((data) => data?.data ?? []);
  }
}

export default CatClient;
