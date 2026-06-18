import { describe, expect, it } from "vitest";
import { readableFileSize } from "./readableFilesize";

describe("readableFileSize", () => {
  it("should return '0 kB' for a zero byte size", () => {
    expect(readableFileSize(0)).toBe("0 kB");
  });

  it("should format sub-kilobyte sizes in kB with two decimals", () => {
    expect(readableFileSize(512)).toBe("0.50 kB");
  });

  it("should format kilobyte sizes in kB", () => {
    expect(readableFileSize(1024)).toBe("1.00 kB");
  });

  it("should keep exactly 1024 kB in kB (boundary is exclusive)", () => {
    expect(readableFileSize(1024 * 1024)).toBe("1024.00 kB");
  });

  it("should format sizes above 1024 kB in MB", () => {
    expect(readableFileSize(1024 * 1024 * 1.5)).toBe("1.50 MB");
  });
});
