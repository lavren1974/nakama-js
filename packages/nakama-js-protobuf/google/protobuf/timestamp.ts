/* eslint-disable */
// @ts-ignore
import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';


/**
 *  A Timestamp represents a point in time independent of any time zone or local
 *  calendar, encoded as a count of seconds and fractions of seconds at
 *  nanosecond resolution. The count is relative to an epoch at UTC midnight on
 *  January 1, 1970, in the proleptic Gregorian calendar which extends the
 *  Gregorian calendar backwards to year one.
 *
 *  All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap
 *  second table is needed for interpretation, using a [24-hour linear
 *  smear](https://developers.google.com/time/smear).
 *
 *  The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
 *  restricting to that range, we ensure that we can convert to and from [RFC
 *  3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.
 *
 *  # Examples
 *
 *  Example 1: Compute Timestamp from POSIX `time()`.
 *
 *      Timestamp timestamp;
 *      timestamp.set_seconds(time(NULL));
 *      timestamp.set_nanos(0);
 *
 *  Example 2: Compute Timestamp from POSIX `gettimeofday()`.
 *
 *      struct timeval tv;
 *      gettimeofday(&tv, NULL);
 *
 *      Timestamp timestamp;
 *      timestamp.set_seconds(tv.tv_sec);
 *      timestamp.set_nanos(tv.tv_usec * 1000);
 *
 *  Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.
 *
 *      FILETIME ft;
 *      GetSystemTimeAsFileTime(&ft);
 *      UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;
 *
 *      // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
 *      // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
 *      Timestamp timestamp;
 *      timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
 *      timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));
 *
 *  Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.
 *
 *      long millis = System.currentTimeMillis();
 *
 *      Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
 *          .setNanos((int) ((millis % 1000) * 1000000)).build();
 *
 *
 *  Example 5: Compute Timestamp from current time in Python.
 *
 *      timestamp = Timestamp()
 *      timestamp.GetCurrentTime()
 *
 *  # JSON Mapping
 *
 *  In JSON format, the Timestamp type is encoded as a string in the
 *  [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
 *  format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"
 *  where {year} is always expressed using four digits while {month}, {day},
 *  {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
 *  seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
 *  are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone
 *  is required. A proto3 JSON serializer should always use UTC (as indicated by
 *  "Z") when printing the Timestamp type and a proto3 JSON parser should be
 *  able to accept both UTC and other timezones (as indicated by an offset).
 *
 *  For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past
 *  01:30 UTC on January 15, 2017.
 *
 *  In JavaScript, one can convert a Date object to this format using the
 *  standard
 *  [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 *  method. In Python, a standard `datetime.datetime` object can be converted
 *  to this format using
 *  [`strftime`](https://docs.python.org/2/library/time.html#time.strftime) with
 *  the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
 *  the Joda Time's [`ISODateTimeFormat.dateTime()`](
 *  http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime%2D%2D
 *  ) to obtain a formatter capable of generating timestamps in this format.
 *
 *
 */
export interface Timestamp {
  /**
   *  Represents seconds of UTC time since Unix epoch
   *  1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *  9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   *  Non-negative fractions of a second at nanosecond resolution. Negative
   *  second values with fractions must still have non-negative nanos values
   *  that count forward in time. Must be from 0 to 999,999,999
   *  inclusive.
   */
  nanos: number;
}

const baseTimestamp: object = {
  seconds: 0,
  nanos: 0,
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const protobufPackage = 'google.protobuf'

export const Timestamp = {
  encode(message: Timestamp, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.seconds);
    writer.uint32(16).int32(message.nanos);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Timestamp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTimestamp } as Timestamp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Timestamp {
    const message = { ...baseTimestamp } as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Timestamp>): Timestamp {
    const message = { ...baseTimestamp } as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = object.seconds;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = object.nanos;
    }
    return message;
  },
  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = message.seconds);
    message.nanos !== undefined && (obj.nanos = message.nanos);
    return obj;
  },
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;