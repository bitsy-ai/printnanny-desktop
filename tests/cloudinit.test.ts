import { beforeAll, expect, test, describe, vitest } from "vitest";
import { mockIPC } from "@tauri-apps/api/mocks";

import { CloudInitGenerator } from "../src/utils/cloudInit";
import type { CloudInitForm } from "../src/utils/cloudInit";

describe("CloudInitGenerator", () => {
  const baseFormData = {
    disableSSHPassword: false,
    enableSSH: true,
    enableTelemetry: true,
    hostname: "pn-test",
    keyboardLayout: "us",
    password: "testing1234",
    saveSettings: false,
    timezone: "America/Los_Angeles",
    username: "testuser",
    wifiCountry: "US",
    wifiPassword: "testing3456",
    wifiSSID: "test-ssid",
    wifiSSIDHidden: false,
  } as CloudInitForm;

  beforeAll(() => {
    mockIPC((cmd, args) => {
      if (cmd === "hash_password") {
        return args.password + "fakehashed";
      }
      if (cmd === "compare_password") {
        return args.hash == args.password + "fakehashed";
      }
    });
  });
  test("should generate user-data", () => {
    const generator = new CloudInitGenerator(baseFormData);
    const yamlData = generator.generateUserData();

    expect(yamlData).toMatchSnapshot();
  });

  test("should hash password", async () => {
    const hashed = await CloudInitGenerator.hashPassword(baseFormData.password);
    const spy = vitest.spyOn(window, "__TAURI_IPC__");
    expect(
      await CloudInitGenerator.comparePassword(baseFormData.password, hashed)
    ).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  test("should generate network-data", () => {
    const generator = new CloudInitGenerator(baseFormData);
    const yamlData = generator.generateNetworkData();
    expect(yamlData).toMatchSnapshot();
  });

  test("should generate meta-data", () => {
    const generator = new CloudInitGenerator(baseFormData);
    const yamlData = generator.generateMetaData();
    expect(yamlData).toMatchSnapshot();
  });
  test("should generate vendor-data", () => {
    const generator = new CloudInitGenerator(baseFormData);
    const yamlData = generator.generateVendorData();
    expect(yamlData).toMatchSnapshot();
  });

  test("should encrypt all sensitive fields", async () => {
    const spy = vitest.spyOn(window, "__TAURI_IPC__");
    const encrypted = await CloudInitGenerator.encryptSensitive(baseFormData);
    expect(encrypted.password).not.toEqual(baseFormData.password);
    expect(encrypted.wifiPassword).not.toEqual(baseFormData.wifiPassword);
    expect(spy).toHaveBeenCalled();
    expect(
      await CloudInitGenerator.comparePassword(
        baseFormData.password,
        encrypted.password
      )
    ).toBe(true);
    expect(
      await CloudInitGenerator.comparePassword(
        baseFormData.wifiPassword,
        encrypted.wifiPassword
      )
    ).toBe(true);
  });
});
