/* eslint-disable @typescript-eslint/naming-convention */

import { parseMultipartFormData } from "./parse-multipart-form-data";
import { APIGatewayProxyEvent } from "aws-lambda";

const testFile =
  "Date/Time,Voucher Title,Amount Issued,Amount Redeemed,Recipient Email,Status,Ref 1,Loyalty Points\n" +
  '"10/27/22 10:07:56 pm","Preview Voucher","$3","$0","test.user+test@testing.com","Issued","-",\n';

describe("Parse Multipart Form Data", () => {
  it("Should properly parse a multipart form field request", () => {
    const event = getIncomingEvent();
    const parsedObject = parseMultipartFormData(event);

    expect(parsedObject.fields.programNickname).toEqual("preview_voucher");
  });

  it("Should properly parse a multipart form file request", () => {
    const event = getIncomingEvent();
    const parsedObject = parseMultipartFormData(event);

    expect(parsedObject.files[0].contentType).toEqual("text/csv");

    expect(parsedObject.files[0].filename).toEqual(
      "Activities_2023_06_14(1).csv"
    );

    expect(parsedObject.files[0].name).toEqual("file");

    expect(parsedObject.files[0].content).toEqual(Buffer.from(testFile.trim()));
  });

  it("Should properly parse a more complex form", () => {
    const event = getIncomingEvent();
    const programNickname = "preview_voucher";
    const testField1 = "test field value 1";
    const testField2 = "test field value 2";
    const testField3 = "test field value 3";

    event.body =
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="programNickname"\n' +
      "\n" +
      programNickname +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="testField1"\n' +
      "\n" +
      testField1 +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="testField2"\n' +
      "\n" +
      testField2 +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="testField3"\n' +
      "\n" +
      testField3 +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="file"; filename="Activities_2023_06_14(1).csv"\n' +
      "Content-Type: text/csv\n" +
      "\n" +
      testFile +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="file2"; filename="test1.csv"\n' +
      "Content-Type: text/csv\n" +
      "\n" +
      testFile +
      "\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="file3"; filename="test2.csv"\n' +
      "Content-Type: text/csv\n" +
      "\n" +
      testFile +
      "\n" +
      "----------------------------671327991362512939709883--\n";

    const parsedObject = parseMultipartFormData(event);

    expect(parsedObject.fields.programNickname).toEqual("preview_voucher");
    expect(parsedObject.fields.testField1).toEqual(testField1);
    expect(parsedObject.fields.testField2).toEqual(testField2);
    expect(parsedObject.fields.testField3).toEqual(testField3);

    expect(parsedObject.files[0].contentType).toEqual("text/csv");

    expect(parsedObject.files[0].filename).toEqual(
      "Activities_2023_06_14(1).csv"
    );

    expect(parsedObject.files[1].name).toEqual("file2");

    expect(parsedObject.files[1].content).toEqual(Buffer.from(testFile.trim()));
    expect(parsedObject.files[1].contentType).toEqual("text/csv");

    expect(parsedObject.files[1].filename).toEqual("test1.csv");

    expect(parsedObject.files[2].name).toEqual("file3");

    expect(parsedObject.files[2].content).toEqual(Buffer.from(testFile.trim()));
    expect(parsedObject.files[2].contentType).toEqual("text/csv");

    expect(parsedObject.files[2].filename).toEqual("test2.csv");

    expect(parsedObject.files[2].name).toEqual("file3");

    expect(parsedObject.files[2].content).toEqual(Buffer.from(testFile.trim()));
  });
});

/** Unit test helper function to create a mock event */
function getIncomingEvent(): APIGatewayProxyEvent {
  return {
    body:
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="programNickname"\n' +
      "\n" +
      "preview_voucher\n" +
      "----------------------------671327991362512939709883\n" +
      'Content-Disposition: form-data; name="file"; filename="Activities_2023_06_14(1).csv"\n' +
      "Content-Type: text/csv\n" +
      "\n" +
      testFile +
      "\n" +
      "----------------------------671327991362512939709883--\n",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Content-Length": "716",
      "Content-Type":
        "multipart/form-data; boundary=--------------------------671327991362512939709883",
      Host: "localhost:4004",
      "Postman-Token": "d354e908-503c-48c9-b585-7bb78e10ff0d",
      "User-Agent": "PostmanRuntime/7.32.3",
    },
    httpMethod: "POST",
    isBase64Encoded: false,
    knex: jest.fn(),
    multiValueHeaders: {
      Accept: ["*/*"],
      "Accept-Encoding": ["gzip, deflate, br"],
      Connection: ["keep-alive"],
      "Content-Length": ["716"],
      "Content-Type": [
        "multipart/form-data; boundary=--------------------------671327991362512939709883",
      ],
      Host: ["localhost:4004"],
      "Postman-Token": ["d354e908-503c-48c9-b585-7bb78e10ff0d"],
      "User-Agent": ["PostmanRuntime/7.32.3"],
    },
    multiValueQueryStringParameters: null,
    path: "/vouchers/bitches",
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
      accountId: "offlineContext_accountId",
      apiId: "offlineContext_apiId",
      authorizer: {
        account_id: "1",
        email: "test@testing.com",
        role: "administrator",
        wonder_id: "1",
      },
      domainName: "offlineContext_domainName",
      domainPrefix: "offlineContext_domainPrefix",
      extendedRequestId: "3ae196dc-c3b1-4430-a521-1d0249e07ee6",
      httpMethod: "POST",
      identity: {
        accessKey: null,
        accountId: "offlineContext_accountId",
        apiKey: "offlineContext_apiKey",
        apiKeyId: "offlineContext_apiKeyId",
        caller: "offlineContext_caller",
        principalOrgId: null,
        sourceIp: "::1",
        user: "offlineContext_user",
        userAgent: "PostmanRuntime/7.32.3",
        userArn: "offlineContext_userArn",
      },
      protocol: "HTTP/1.1",
      requestId: "3c475c59-9ed0-4d46-b62d-5d84ef4c89d5",
      requestTime: "31/Aug/2023:14:15:25 -0400",
      requestTimeEpoch: 1693505725898,
      resourceId: "offlineContext_resourceId",
      stage: "development",
    },
    resource: "/some/path",
    stageVariables: null,
  } as unknown as APIGatewayProxyEvent;
}
