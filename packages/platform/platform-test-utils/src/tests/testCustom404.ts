import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import {PlatformTestOptions} from "../interfaces";

export function testCustom404(options: PlatformTestOptions) {
  class CustomServer extends options.server {}

  let request: SuperTest.SuperTest<SuperTest.Test>;
  beforeAll(
    PlatformTest.bootstrap(CustomServer, {
      ...options,
      mount: {
        "/rest": []
      }
    })
  );

  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  it("Scenario 1: GET /", async () => {
    const response: any = await request.get("/").expect(404);

    expect(response.body).toEqual({
      name: "NOT_FOUND",
      message: 'Resource "/" not found',
      status: 404,
      errors: []
    });
  });
}
