import { APIGatewayProxyEvent } from "aws-lambda";

export interface IFileInfo {
  byteLength: number;
  content: Buffer;
  contentType: string;
  filename: string;
  name: string;
}

export interface IParsedObject {
  fields: { [key: string]: string };
  files: IFileInfo[];
}

/** Parses a multipart form data request */
class ParseMFDClass {
  private static _getBoundary(event: APIGatewayProxyEvent): string {
    // boundaries are found in event header - under content type, after the =
    // we should probably make key names case insensitive here. Let's go...
    const boundaryKey = Object.keys(event.headers).find((currentKey) => {
      return currentKey.toUpperCase() === "CONTENT-TYPE";
    });

    if (!boundaryKey) {
      throw new Error("No boundary found");
    }

    const boundaryValue = event.headers[boundaryKey]?.split("=")?.[1];

    if (!boundaryValue) {
      throw new Error("No multipart boundary found");
    }

    // Last key is the boundary we need
    return boundaryValue;
  }

  private static _getBody(event: APIGatewayProxyEvent): string {
    if (!event.body) {
      throw new Error("No body found");
    }

    if (event.isBase64Encoded) {
      return Buffer.from(event.body, "base64").toString("binary");
    }

    return event.body;
  }

  private static _parseFileData(item: string, name: string): IFileInfo {
    // Assume it is all ASCII.
    const content = Buffer.from(
      item
        .slice(
          // Ok - find the content type - we need the first occurrence follow by whitespace and data
          item.search(/Content-Type:\s.+/g) +
            // Now lets get the matched data and calculate the length of the data
            // @ts-expect-error In a valid multipart form, this will always be a number
            item.match(/Content-Type:\s.+/g)[0].length,
          -2
        )
        .trim()
    ); // Get rid of preceding or trailing whitespace and Buffer it for binary data

    // Extract the content type
    const contentType = item.match(/Content-Type:\s.+/g)?.[0].slice(14);

    // And get the original filename
    const filename = item.match(/filename=".+"/g)?.[0].slice(10, -1);

    // If we don't have this data, something is wrong. Should never happen, but I am tidying up the typescript
    if (!filename || !contentType) {
      throw new Error("Invalid MultiPart Form File Data");
    }

    // Return the data
    return {
      byteLength: content.byteLength,
      content,
      contentType,
      filename,
      name,
    };
  }

  private static _parseParamName(item: string, file: boolean): string {
    const paramName = file
      ? // Get the key name. Match on name="{whatever}"; and grab the whatever
        item.match(/name=".+";/g)?.[0].slice(6, -2)
      : // Slightly different regex - non file data doesn't have a trailing ;
        item.match(/name=".+"/g)?.[0].slice(6, -1);

    if (!paramName) {
      throw new Error("Invalid MultiPart Form Parameter Name");
    }

    return paramName;
  }

  public static parse(event: APIGatewayProxyEvent): IParsedObject {
    const result: IParsedObject = { fields: {}, files: [] };

    // get the boundary
    const boundary = ParseMFDClass._getBoundary(event);

    // Get the body from the event
    const body = ParseMFDClass._getBody(event);

    // Split everything by the boundary + '--';
    const bodyOmittingTheEnd = body.split(boundary + "--")[0]; // First part only
    // Split everything by the boundary

    const formParts = bodyOmittingTheEnd.split(boundary);

    formParts.forEach((item) => {
      // If we have a file, we need to parse it as a file
      if (/filename=".+"/g.test(item)) {
        const paramName = ParseMFDClass._parseParamName(item, true);

        // Add the files to the array
        result.files.push(ParseMFDClass._parseFileData(item, paramName));
      } else if (/name=".+"/g.test(item)) {
        const paramName = ParseMFDClass._parseParamName(item, false);

        result.fields[paramName] = item
          .slice(
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            item.search(/name=".+"/g) +
              // @ts-expect-error In a valid multipart form, this will always be a number
              item.match(/name=".+"/g)?.[0].length +
              2, // Field is 2 shorter than the match
            -2 // And we want to slice the ending two characters
          )
          .trim(); // Get rid of the whitespace
      }
    });

    return result;
  }
}

export const parseMultipartFormData = ParseMFDClass.parse;
