import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

const ADMIN_SESSION_NAME = "mch-admin-session";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;
const DEMO_ADMIN_EMAIL = "admin@mustafacoffee.test";
const DEMO_ADMIN_USERNAME = "mustafa-admin";
const DEMO_ADMIN_PASSWORD = "MustafaAdmin#2026";
const DEMO_SESSION_SECRET =
  "mustafa-coffee-house-demo-session-secret-change-before-production-2026";

type AdminSessionData = {
  role?: "admin";
  identifier?: string;
  authenticatedAt?: number;
};

const credentialsSchema = z.object({
  identifier: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(256),
});

function getAdminConfiguration() {
  const email = (process.env.ADMIN_EMAIL || DEMO_ADMIN_EMAIL)
    .trim()
    .toLowerCase();
  const username = (process.env.ADMIN_USERNAME || DEMO_ADMIN_USERNAME)
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD || DEMO_ADMIN_PASSWORD;
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() || DEMO_SESSION_SECRET;

  return {
    email,
    username,
    password,
    secret,
  };
}

function getSessionConfig(secret: string) {
  return {
    name: ADMIN_SESSION_NAME,
    password: secret,
    maxAge: ADMIN_SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure:
        process.env.NODE_ENV === "production" &&
        process.env.ADMIN_COOKIE_SECURE !== "false",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    },
  };
}

async function constantTimeEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftDigest);
  const rightBytes = new Uint8Array(rightDigest);
  let mismatch = 0;

  for (let index = 0; index < leftBytes.length; index += 1) {
    mismatch |= leftBytes[index] ^ rightBytes[index];
  }

  return mismatch === 0;
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const configuration = getAdminConfiguration();

    const session = await useSession<AdminSessionData>(
      getSessionConfig(configuration.secret),
    );
    const authenticated = session.data.role === "admin";

    return {
      authenticated,
      configured: true as const,
      identifier: authenticated
        ? (session.data.identifier ?? "Administrator")
        : null,
    };
  },
);

export const adminLogin = createServerFn({ method: "POST" })
  .validator(credentialsSchema)
  .handler(async ({ data }) => {
    const configuration = getAdminConfiguration();
    const normalizedIdentifier = data.identifier.trim().toLowerCase();
    const [emailMatches, usernameMatches] = await Promise.all([
      constantTimeEqual(normalizedIdentifier, configuration.email),
      constantTimeEqual(normalizedIdentifier, configuration.username),
    ]);
    const identifierMatches = emailMatches || usernameMatches;
    const passwordMatches = await constantTimeEqual(
      data.password,
      configuration.password,
    );

    if (!identifierMatches || !passwordMatches) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return {
        success: false as const,
        code: "INVALID_CREDENTIALS" as const,
        message: "The username or password is incorrect.",
      };
    }

    const session = await useSession<AdminSessionData>(
      getSessionConfig(configuration.secret),
    );
    await session.update({
      role: "admin",
      identifier: normalizedIdentifier,
      authenticatedAt: Date.now(),
    });

    return { success: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(
  async () => {
    const configuration = getAdminConfiguration();
    const session = await useSession<AdminSessionData>(
      getSessionConfig(configuration.secret),
    );
    await session.clear();

    return { success: true as const };
  },
);
